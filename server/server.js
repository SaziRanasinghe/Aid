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
// Register New User
app.post('/api/register', async (req, res) => {
    const { name, username, email, password, telephone_number, user_role, address, unique_questions } = req.body;

    try {
        // Check for existing user
        const [existingUsers] = await aid_nexus.promise().query(
            "SELECT * FROM user WHERE username = ? OR email = ?",
            [username, email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const [userResult] = await aid_nexus.promise().query(
            "INSERT INTO user(name, username, email, hashed_password, telephone_number) VALUES (?, ?, ?, ?, ?)",
            [name, username, email, hashedPassword, telephone_number]
        );

        const userId = userResult.insertId;

        // Insert Address
        try {
            const [addressResult] = await aid_nexus.promise().query(
                'INSERT INTO user_address (user_id, user_address) VALUES (?, ?)',
                [userId, address]
            );
            const userAddressId = addressResult.insertId;

            // Insert unique questions based on user_role
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
        } catch (addressError) {
            if (addressError.code === 'ER_DUP_ENTRY') {
                // Delete the user if address insertion fails
                await aid_nexus.promise().query("DELETE FROM user WHERE id = ?", [userId]);
                return res.status(400).json({ message: 'Duplicate address added' });
            }
            throw addressError;
        }
    } catch (error) {
        console.error('Error executing query:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'An error occurred due to duplicate information' });
        } else {
            res.status(500).json({ message: "Error executing query:", error: error.message });
        }
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

        // Determine user role
        let userRole = '';
        const [donorResult] = await aid_nexus.promise().query("SELECT * FROM doner WHERE user_id = ?", [user.id]);
        const [recipientResult] = await aid_nexus.promise().query("SELECT * FROM receiver WHERE user_id = ?", [user.id]);
        const [volunteerResult] = await aid_nexus.promise().query("SELECT * FROM volunteer WHERE user_id = ?", [user.id]);

        if (donorResult && donorResult.length > 0) {
            userRole = 'donor';
        } else if (recipientResult && recipientResult.length > 0) {
            userRole = 'recipient';
        } else if (volunteerResult && volunteerResult.length > 0) {
            userRole = 'distributor';
        } else {
            return res.status(401).json({ message: "User role not found" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, role: userRole }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(200).json({ message: "Successfully logged in", token, role: userRole , userId: user.id });
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
app.post('/api/donate_items', upload.single('image'), (req, res) => {
    console.log('Received donation request:', req.body);
    console.log('File:', req.file);

    const { category, title, description, location, condition, goods, user_id } = req.body;
    const image = req.file ? req.file.filename : null;

    // Use backticks for `condition` as it's a reserved keyword in MySQL
    const sqlQuery = `INSERT INTO donate_items (category_id, title, description, location, \`condition\`, image, user_id) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [category, title, description, location, condition, image, user_id];

    console.log('Executing SQL query:', sqlQuery);
    console.log('With values:', values);

    aid_nexus.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Server error', details: err.message });
            return;
        }
        console.log('Query result:', result);
        res.status(200).json({ message: "Donation successfully registered" });
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/api/items', (req, res) => {
    const { category, search, sort } = req.query;

    let whereClause = 'WHERE di.is_active = 1';
    let orderClause = '';
    const params = [];

    if (category) {
        whereClause += ' AND di.category_id = ?';
        params.push(category);
    }

    if (search) {
        whereClause += ' AND (di.title LIKE ? OR di.description LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
    }

    switch (sort) {
        case 'newest':
            orderClause = 'ORDER BY di.id DESC';
            break;
        case 'oldest':
            orderClause = 'ORDER BY di.id ASC';
            break;
        default:
            orderClause = 'ORDER BY di.id DESC'; // Default to newest
    }

    const query = `
        SELECT di.id, di.title, di.description, di.location, di.condition, 
               CONCAT('/uploads/', di.image) as image_url,
               di.category_id, u.name as donor_name
        FROM donate_items di
        JOIN user u ON di.user_id = u.id
        ${whereClause}
        ${orderClause}
        LIMIT 20
    `;

    aid_nexus.query(query, params, (err, results) => {
        if (err) {
            console.error('Error fetching items:', err);
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});


app.post('/api/claim', (req, res) => {
    const { itemId, userId } = req.body;

    if (!itemId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const getReceiverIdQuery = `
        SELECT receiver_id FROM receiver WHERE user_id = ?
    `;

    const claimQuery = `
        INSERT INTO receiving_item_table (item_id, receiver_id)
        VALUES (?, ?)
    `;

    const updateItemQuery = `
        UPDATE donate_items
        SET is_active = 0
        WHERE id = ?
    `;

    aid_nexus.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // First, get the receiver_id
        aid_nexus.query(getReceiverIdQuery, [userId], (err, receiverResult) => {
            if (err) {
                console.error('Error getting receiver_id:', err);
                return aid_nexus.rollback(() => {
                    res.status(500).json({ error: 'Database error' });
                });
            }

            if (receiverResult.length === 0) {
                return aid_nexus.rollback(() => {
                    res.status(404).json({ error: 'Receiver not found for this user' });
                });
            }

            const receiverId = receiverResult[0].receiver_id;

            // Now proceed with the claim
            aid_nexus.query(claimQuery, [itemId, receiverId], (err, result) => {
                if (err) {
                    console.error('Error inserting claim:', err);
                    return aid_nexus.rollback(() => {
                        res.status(500).json({ error: 'Database error' });
                    });
                }

                aid_nexus.query(updateItemQuery, [itemId], (err, result) => {
                    if (err) {
                        console.error('Error updating item status:', err);
                        return aid_nexus.rollback(() => {
                            res.status(500).json({ error: 'Database error' });
                        });
                    }

                    aid_nexus.commit((err) => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            return aid_nexus.rollback(() => {
                                res.status(500).json({ error: 'Database error' });
                            });
                        }
                        res.json({ message: 'Item claimed successfully' });
                    });
                });
            });
        });
    });
});

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

// endpoint for distributor page
app.get('/api/distribution/available-items', (req, res) => {
    const query = `
        SELECT di.id, di.title, di.description, di.location, c.category_name
        FROM donate_items di
        JOIN category c ON di.category_id = c.category_id
        WHERE di.distributor_id IS NULL AND di.is_active = 0
    `;

    aid_nexus.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching available items:', err);
            res.status(500).json({ error: 'An error occurred while fetching items' });
        } else {
            res.json(results);
        }
    });
});

// POST endpoint to update distributor_id
app.post('/api/distribution/assign', (req, res) => {
    const { itemId, userId } = req.body;

    if (!itemId || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const getVolunteerIdQuery = `
        SELECT volunteer_id FROM volunteer WHERE user_id = ?
    `;

    const updateItemQuery = `
        UPDATE donate_items
        SET distributor_id = ?
        WHERE id = ? AND distributor_id IS NULL AND is_active = 0
    `;

    aid_nexus.beginTransaction((err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // First, get the volunteer_id
        aid_nexus.query(getVolunteerIdQuery, [userId], (err, volunteerResult) => {
            if (err) {
                console.error('Error getting volunteer_id:', err);
                return aid_nexus.rollback(() => {
                    res.status(500).json({ error: 'Database error' });
                });
            }

            if (volunteerResult.length === 0) {
                return aid_nexus.rollback(() => {
                    res.status(404).json({ error: 'Volunteer not found for this user' });
                });
            }

            const volunteerId = volunteerResult[0].volunteer_id;

            // Now update the donate_items table
            aid_nexus.query(updateItemQuery, [volunteerId, itemId], (err, result) => {
                if (err) {
                    console.error('Error updating item:', err);
                    return aid_nexus.rollback(() => {
                        res.status(500).json({ error: 'Database error' });
                    });
                }

                if (result.affectedRows === 0) {
                    return aid_nexus.rollback(() => {
                        res.status(400).json({ error: 'Item not available for pickup' });
                    });
                }

                aid_nexus.commit((err) => {
                    if (err) {
                        console.error('Error committing transaction:', err);
                        return aid_nexus.rollback(() => {
                            res.status(500).json({ error: 'Database error' });
                        });
                    }
                    res.json({ message: 'Item assigned successfully' });
                });
            });
        });
    });
});

app.post('/api/record-donation', async (req, res) => {
    console.log('Received donation recording request:', req.body);
    const { donationAmount, userId, transactionId } = req.body;

    if (!donationAmount || !userId || !transactionId) {
        console.error('Missing required fields:', { donationAmount, userId, transactionId });
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const findDonerQuery = `
        SELECT d.doner_id 
        FROM doner d 
        JOIN user u ON d.user_id = u.id 
        WHERE u.id = ?
    `;

    const insertDonationQuery = `
        INSERT INTO money_donation (donation_date, donation_amount, doner_id, transaction_id)
        VALUES (NOW(), ?, ?, ?)
    `;

    try {
        // First, find the doner_id
        const [donerResult] = await new Promise((resolve, reject) => {
            aid_nexus.query(findDonerQuery, [userId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        console.log('Doner query result:', donerResult);

        if (!donerResult || !donerResult.doner_id) {
            console.error('Doner not found for user:', userId);
            return res.status(404).json({ success: false, error: 'Doner not found for this user' });
        }

        const donerId = donerResult.doner_id;

        // Now, insert the donation record
        const insertResult = await new Promise((resolve, reject) => {
            aid_nexus.query(insertDonationQuery, [donationAmount, donerId, transactionId], (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        console.log('Donation insert result:', insertResult);

        res.json({ success: true, message: 'Donation recorded successfully' });
    } catch (error) {
        console.error('Error recording donation:', error);
        res.status(500).json({ success: false, error: 'Failed to record donation' });
    }
});

app.get('/api/monthly-donations', async (req, res) => {
    const query = `
    SELECT 
      DATE_FORMAT(donation_date, '%Y-%m') AS month,
      SUM(donation_amount) AS total_amount
    FROM money_donation
    WHERE donation_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(donation_date, '%Y-%m')
    ORDER BY month ASC
  `;

    try {
        const results = await new Promise((resolve, reject) => {
            aid_nexus.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching monthly donations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/user/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const query = `
        SELECT u.id, u.username, u.email, u.name, u.telephone_number, ua.user_address
        FROM user u
        LEFT JOIN user_address ua ON u.id = ua.user_id
        WHERE u.id = ?
    `;

    try {
        const results = await new Promise((resolve, reject) => {
            aid_nexus.query(query, [userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update user profile
app.put('/api/user/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { name, email, telephone_number, user_address } = req.body;

    const userQuery = `
        UPDATE user
        SET name = ?, email = ?, telephone_number = ?
        WHERE id = ?
    `;

    const addressQuery = `
        INSERT INTO user_address (user_address, user_id)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE user_address = ?
    `;

    try {
        await new Promise((resolve, reject) => {
            aid_nexus.query(userQuery, [name, email, telephone_number, userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        await new Promise((resolve, reject) => {
            aid_nexus.query(addressQuery, [user_address, userId, user_address], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Change password
app.put('/api/user/change-password/:userId', async (req, res) => {
    const userId = req.params.userId;
    const { currentPassword, newPassword } = req.body;

    const getUserQuery = 'SELECT hashed_password FROM user WHERE id = ?';
    const updatePasswordQuery = 'UPDATE user SET hashed_password = ? WHERE id = ?';

    try {
        const userResults = await new Promise((resolve, reject) => {
            aid_nexus.query(getUserQuery, [userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        if (userResults.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userResults[0];
        const isMatch = await bcrypt.compare(currentPassword, user.hashed_password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await new Promise((resolve, reject) => {
            aid_nexus.query(updatePasswordQuery, [hashedNewPassword, userId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
