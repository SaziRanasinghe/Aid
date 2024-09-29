const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const Stripe = require("stripe");
require('dotenv').config();
const jwt = require('jsonwebtoken')
const { aid_nexus,createPostEndpoint, createGetEndpoint } = require('./aid_nexus');
const {response} = require("express"); // Adjust the path as needed
const { verifyToken, validateLoginInput, loginLimiter, loginLogger } = require('./middleware');


const app = express();
const router = express.Router();
app.use(express.json());

const stripe = Stripe('sk_test_51PRB5KITJDLyY2z92ew4fs8ZRXoYNmg99mVGfHi0WfvkFAi7g9CfKtGvTpYmY6UBBvfyxxmIU6DsuXKisUbgTn0500ipxYIvW8');

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

// POST endpoint for adding phone numbers to contributers_contact
createPostEndpoint(
    app,
    '/api/contributors_contact',
    'INSERT INTO contributors_contact (phone_number) VALUES (?)',
    ['phone_number'],
    "Phone number successfully added"
);

// POST endpoint for adding phone numbers to contributers_contact
createPostEndpoint(
    app,
    '/api/contributors_contact',
    'INSERT INTO contributors_contact (phone_number) VALUES (?)',
    ['phone_number'],
    "Phone number successfully added"
);


//*******************************************************User*******************************************************************************
// Register New Suer
app.post('/api/register', async (req, res) => {
    const { name, username, email, password, telephone_number, user_role, address, unique_questions } = req.body;

    try {
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [userResult] = await aid_nexus.promise().query(
            "INSERT INTO user(name, username, email, hashed_password, telephone_number) VALUES (?, ?, ?, ?, ?)",
            [name, username, email, hashedPassword, telephone_number]
        );

        const userId = userResult.insertId;

        // Insert Address
        const [addressResult] = await aid_nexus.promise().query(
            'INSERT INTO user_address (user_id, user_address) VALUES (?, ?)',
            [userId, address]
        );
        const userAddressId = addressResult.insertId;

        // Insert uniques question based on user_role
        switch (user_role) {
            case 'donor':
                await aid_nexus.promise().query(
                    "INSERT INTO doner(user_id, address_id) VALUES(?, ?)",
                    [userId, userAddressId]
                );
                break;
            case 'recipient':
                await aid_nexus.promise().query(
                    "INSERT INTO receiver(user_id, employment_status, monthly_income, monthly_expenses, house_ownership, address_id) VALUES(?, ?, ?, ?, ?, ?)",
                    [userId, unique_questions.employmentStatus, unique_questions.monthlyIncome, unique_questions.monthlyExpenses, unique_questions.houseStatus, userAddressId]
                );
                break;
            case 'distributor':
                await aid_nexus.promise().query(
                    "INSERT INTO volunteer(user_id, address_id, employment_status, vehicle_type, vehicle_number, is_active) VALUES(?, ?, ?, ?, ?, ?)",
                    [userId, userAddressId, unique_questions.employmentStatus, unique_questions.vehicleType, unique_questions.vehicleNo, true]
                );
                break;
            default:
                throw new Error('Unknown user_role');
        }

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error executing query:', error);
        res.status(500).send({ message: "Error executing query:", error: error.message });
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

// Trend Analyzer Routes

app.get('/api/recipient-trends', (req, res) => {
    const query = `SELECT recipient, SUM(amount) as total_aid, COUNT(DISTINCT year) as year_count
                 FROM aid_projects
                 GROUP BY recipient
                 ORDER BY total_aid DESC
                 LIMIT 5`;

    aid_nexus.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/api/time-trends', (req, res) => {
    const query = `SELECT year, SUM(amount) as total_aid
                 FROM aid_projects
                 GROUP BY year
                 ORDER BY year`;

    aid_nexus.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

////////////////////////////////////////Create Payment Key /////////////////////////////////////////////
app.post('/api/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // amount in cents
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
        });
    }
});

//// Get endpoint for dashboard
createGetEndpoint(app, '/api/total-users', 'SELECT COUNT(*) as count FROM user');
createGetEndpoint(app, '/api/fund-balance', 'SELECT SUM(donation_amount) as balance FROM money_donation');
createGetEndpoint(app, '/api/donors', 'SELECT COUNT(*) as count FROM doner');
createGetEndpoint(app, '/api/volunteers', 'SELECT COUNT(*) as count FROM volunteer');


// Get endpoint for payment page

const paymentsQuery = `
  SELECT 
    md.donation_id,
    md.donation_date,
    md.donation_amount,
    u.name AS donor_name,
    md.transaction_id
  FROM 
    money_donation md
  JOIN 
    doner d ON md.doner_id = d.doner_id
  JOIN 
    user u ON d.user_id = u.id
  ORDER BY 
    md.donation_date DESC
  LIMIT 50
`;

createGetEndpoint(app, '/api/payments-information', paymentsQuery);

// Get endpoint for notification page


// GET endpoint for retrieving donors
createGetEndpoint(
    app,
    '/api/donors-information',
    `SELECT 
    u.id, 
    u.username, 
    u.email, 
    u.telephone_number, 
    u.registration_date, 
    u.last_login, 
    u.is_active,
    u.name,
    d.doner_id,
    ua.user_address
  FROM 
    user u
  JOIN 
    doner d ON u.id = d.user_id
  LEFT JOIN 
    user_address ua ON d.address_id = ua.id
  ORDER BY 
    u.registration_date DESC`
);


// GET endpoint for retrieving volunteers
createGetEndpoint(
    app,
    '/api/volunteer-information',
    `SELECT 
    u.id, 
    u.username, 
    u.email, 
    u.telephone_number, 
    u.registration_date, 
    u.last_login, 
    u.is_active,
    u.name,
    v.volunteer_id,
    v.employment_status,
    v.vehicle_type,
    v.vehicle_number,
    v.is_active AS volunteer_active,
    ua.user_address
  FROM 
    user u
  JOIN 
    volunteer v ON u.id = v.user_id
  LEFT JOIN 
    user_address ua ON v.address_id = ua.id
  ORDER BY 
    u.registration_date DESC`
);





const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
