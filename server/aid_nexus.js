

const mysql = require('mysql2');

// Database connection setup
const aid_nexus = mysql.createConnection({

  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'aid_nexus'
});

aid_nexus.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Function for POST requests
function createPostEndpoint(app, endpoint, sqlQuery, params,successMessage) {
  app.post(endpoint, (req, res) => {
    const values = params.map(param => req.body[param]);

    aid_nexus.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
        return;
      }
      res.status(200).send(successMessage);
    });
  });
}

// Function for GET requests
function createGetEndpoint(app, endpoint, sqlQuery, params = []) {
  app.get(endpoint, (req, res) => {
    const values = params.map(param => req.query[param]);

    aid_nexus.query(sqlQuery, values, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
        return;
      }
      res.status(200).json(results);
    });
  });
}


module.exports = { aid_nexus,createPostEndpoint, createGetEndpoint };