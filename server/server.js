const express = require('express');
const bcrypt = require('bcrypt');
const { aid_nexus,createPostEndpoint, createGetEndpoint } = require('./aid_nexus'); // Adjust the path as needed

const app = express();
const router = express.Router();
app.use(express.json());

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
//*******************************************************User*******************************************************************************
// Register New User
/*app.post('api/register', async (req, res) => {
    const {username, email, password, role} = req.body;

    try {
        const [existingUser] = await pool.query('SELECT * FROM user WHERE email =?',[email])
    }
})*/

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
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ message: "Error in hashing password" });
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
