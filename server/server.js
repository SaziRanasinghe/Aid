const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const { aid_nexus,createPostEndpoint, createGetEndpoint } = require('./aid_nexus'); // Adjust the path as needed

const app = express();
const router = express.Router();
app.use(express.json());


app.use(cors({
    origin: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
    allowedHeaders:['content-type', 'Authorization']
}));


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
 //Register New User
/app.post('api/register', async (req, res) => {
    const {username, email, password, role,address,telephone,additionalInfo,employmentStatus,
        vehicleType, vehicleNo, monthlyIncome, monthlyExpenses, homeOwnership, extraInfo} = req.body;
    try{
        const [results] = await aid_nexus.query('SELECT * FROM Users')
    });

})

 // POST endpoint for adding a donation
createPostEndpoint(
    app,
    '/api/donations',
    'INSERT INTO donations (category, title, description, location, condition, image, donor_name, telephone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    ['category', 'title', 'description', 'location', 'condition', 'image', 'name', 'telephone'],
    "Donation successfully registered"
);

 
app.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO user (name, username, email, password) VALUES (?, ?, ?, ?)";
        aid_nexus.query(sql, [name, username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: "Error in node" + err });
            }
            return res.status(200).json({ message: "User registered successfully" });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
 



// GET endpoint for retrieving events
createGetEndpoint(
    app,
    '/api/user',
    'SELECT * FROM user'
);











const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
