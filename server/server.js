const express = require('express');
const cors = require('cors');
const app = express();
const mysqlConnection = require('./aid_nexus.js'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitializes: false,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24
  }
}));

const PORT = process.env.PORT || 5000;

app.get('/api/user', (req, res) => {
  const sql = 'SELECT * FROM user'; 
  mysqlConnection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });
});
 
 

app.post('/signup', (req, res) => {
  const { name, username, email, password } = req.body;
  const sql = "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)";
  mysqlConnection.query(sql, [name, username, email, password], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: "Error in node" });
    }
    return res.status(200).json({ message: "User registered successfully" });
  });
});

// app.post('/login', (req,res) => {
//   const sql = "SELECT * FROM users WHERE email = ? and password = password = ?";
//   server.query(sql, [req.body.email, req.body.password], (err, result) => {
//     if(err) return res.json({Message: "Error inside server"});
//     if(result.length > 0) {
//       req.session.username = result[0].username;
//       return res.json({Login: true, username: req.session.username})
//     }else{
//     return res.json({Login: false})
//     }
//   })
// })

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  mysqlConnection.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error inserting event:', err);
      res.status(500).send('Server error'+err);
      return;
    }
    return res.status(200).json({ message: "User registered successfully" });
  });
});

// app.post('/login', (req,res) => {
//   const sql = "SELECT * FROM users WHERE email = ? and password = password = ?";
//   server.query(sql, [req.body.email, req.body.password], (err, result) => {
//     if(err) return res.json({Message: "Error inside server"});
//     if(result.length > 0) {
//       req.session.username = result[0].username;
//       return res.json({Login: true, username: req.session.username})
//     }else{
//     return res.json({Login: false})
//     }
//   })
// })

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
//   mysqlConnection.query(sql, [email, password], (err, result) => {
//     if (err) {
//       console.error('Error during login:', err);
//       return res.status(500).json({ message: "Error inside server" });
//     }
//     if (result.length > 0) {
//       req.session.username = result[0].username;
//       return res.json({ login: true, username: req.session.username });
//     } else {
//       return res.json({ login: false });
//     }
//   });
// });

// app.post('/api/events', (req, res) => {
//   const { Eid, fname, description, datetime, active } = req.body;

//   const query = 'INSERT INTO events (Eid, fname, description, datetime, active) VALUES (?, ?, ?, ?, ?)';
//   db.query(query, [Eid, fname, description, datetime, active], (err, result) => {
//     if (err) {
//       console.error('Error inserting event:', err);
//       res.status(500).send('Server error');
//       return;
//     }
//     res.status(200).send('Event added successfully');
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
