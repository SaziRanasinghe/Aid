const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const { aid_nexus,createPostEndpoint, createGetEndpoint } = require('./aid_nexus'); // Adjust the path as needed

const app = express();
const router = express.Router();
app.use(express.json());


app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders:['content-type', 'Authorization']
}));

// File Uploading
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

//****************************************Authentication Middleware*************************************************************//
const authMiddleware = (req, res, next) => {
    const token = req.headers('Authorization')?.replace('Bearer ','');

    if (!token){
        return res.status(500).send({message:"No token,authorization denied"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user={id:decoded.userId};
        next();
    }catch(error){
        res.status(500).send({message:"Token is not valid",error});
    }
};
// ***************************************************Event***************************************************************

// POST endpoint for adding an event
createPostEndpoint(
    app,
    '/api/events',
    'INSERT INTO event (event_name, event_description, event_datetime, is_event_active) VALUES (?, ?, ?, ?)',
    ['event_name', 'event_description', 'event_datetime', 'active'],
    "Event Is Successfully Registered",
);

// GET endpoint for retrieving events
createGetEndpoint(
    app,
    '/api/events',
    'SELECT * FROM event'
);

// GET endpoint for retrieving a specific event
createGetEndpoint(
    app,
    '/api/events/:id',
    'SELECT * FROM event WHERE event_id = ?',
    ['id']
);

// POST endpoint for adding a donation
createPostEndpoint(
    app,
    '/api/donations',
    'INSERT INTO donations (category, title, description, location, condition, image, donor_name, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    ['category', 'title', 'description', 'location', 'condition', 'image', 'name', 'telephone'],
    "Donation successfully registered"
);


//*******************************************************User*******************************************************************************
// Register New Suer
app.post('/api/register',async (req,res) => {
    const{ name,username,email_address,password,telephone_number,user_role,address,unique_questions}= req.body;

    try{
        // Hash Password
        const hashedPassword = await bcrypt.hash(password,10);

        //Insert user
        const [userResult] = await aid_nexus.promise().query(
            "INSERT INTO user(name,username,email,hashed_password,telephone_number) VALUES (?,?,?,?,?)",
            [name, username, email_address, hashedPassword, telephone_number]
        );

        const userId = userResult.insertId;

        //Insert Address

        const [addressResult] = await aid_nexus.promise().query(
            'INSERT INTO user_address (user_id,user_address) VALUES (?, ?)',
            [userId,address ]
        );
        const userAddressId = addressResult.insertId;

        // Insert uniques question based on user_role
        switch (user_role) {
            case 'donor':
                await aid_nexus.promise().query(
                    "INSERT INTO doner(user_id,address_id) VALUES(?,?)",
                    [userId,userAddressId]
                );
                break;
            case 'receiver':
                await aid_nexus.promise().query(
                    "INSERT INTO receiver(user_id,employment_status,monthly_income,monthly_expenses,house_ownership,address_id) VALUES(?,?,?,?,?,?)",
                    [userId,unique_questions.question1,unique_questions.question2,unique_questions.question3,unique_questions.question4,userAddressId]
                );
                break;
            case 'distributor':
                await aid_nexus.promise().query(
                    "INSERT INTO volunteer(user_id,address_id,employment_status,vehicle_type,vehicle_number,is_active) VALUES(?,?,?,?,?,?) ",
                    [userId,userAddressId,unique_questions.question1,unique_questions.question2,unique_questions.question3,true]
                );
                break;
            default:
                throw new Error('Unknown user_role');

        }
        res.status(200).json({message:"User registered successfully"});
        }catch (error){
        console.error('Error executing query:', error);
        res.status(500).send({message:"Error executing query:", error:error.message});
    }
});

// Login to the system
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user
        const [result] = await aid_nexus.promise().query(
            "SELECT * FROM user WHERE email = ?",
            [email]
        );
        // Check if result has rows
        if (!result || !result.length || result.length === 0) {
            console.log('No user found for email:', email);
            return res.status(401).json({ message: "Invalid username or password" });
        }
        const user = result[0];
        // Check Password
        const isPasswordValid = await bcrypt.compare(password, user.hashed_password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ message: "Successfully logged in", token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});
// Get Request for Categories
createGetEndpoint(
    app,
    '/api/category',
    'SELECT * FROM category'
);



//**********************************************Donate Items *********************************************************//
app.post('/api/donate-items',authMiddleware,upload.single('image'),async(req,res) =>{
    const{category_id,title,description,location,condition}=req.body;
    const user_id = req.user.id;
    const image = req.file? req.file.filename : null;

    try {
        const [result] = await aid_nexus.promise().query(
            'INSERT INTO donate_items(category_id,title,description,location,condition,image,user_id) VALUES(?,?,?,?,?,?)',
            [category_id,title,description,location,condition,image,user_id]
        );
        res.status(200).json({
            message:"Donation item created successfully",
            id: result.insertId,
            image_link:image?`/uploads/${image}`:null
        });
    }catch (error){
        console.error('Error creating donation item',error);
        res.status(500).json({message:"Internal Server Error:",error});

    }
})





// GET endpoint for retrieving events
createGetEndpoint(
    app,
    '/api/user',
    'SELECT * FROM user'
);











const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
