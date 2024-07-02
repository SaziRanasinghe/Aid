const express = require('express');
const cors = require('cors');
const app = express();
const mysqlConnection = require('./aid_nexus.js'); // Ensure this path is correct

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/api/user', (req, res) => {
  const sql = 'SELECT * FROM user'; // Modify this query as per your table structure
  mysqlConnection.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/events', (req, res) => {
  const { Eid, fname, description, datetime, active } = req.body;

  const query = 'INSERT INTO events (Eid, fname, description, datetime, active) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [Eid, fname, description, datetime, active], (err, result) => {
    if (err) {
      console.error('Error inserting event:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).send('Event added successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
