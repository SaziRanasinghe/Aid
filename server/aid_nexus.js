const mysql = require('mysql2');

const aid_nexus = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sasi@19991120',
  database: 'aid_nexus'
});

aid_nexus.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Function for POST requests
function createPostEndpoints(app,endpoint,sqlQuery,params,successMessage){
  app.post(endpoint,(req, res) => {
    const values = params.map(param =>req.body[param]);
    aid_nexus.query(sqlQuery,values,(err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error'+err);
        return;
      }
      res.status(200).send(successMessage);
    })
  })
}


// Function for GET requests
function createGetEndpoints(app,endpoint,sqlQuery,params=[],successMessage){
  app.get(endpoint,(req, res) => {
    const values = params.map(param=>req.query[param]);
    aid_nexus.query(sqlQuery,values,(err, result) => {
      if (err){
        console.error('Error executing query:', err);
        res.status(500).send('Server error'+err);
        return
      }
      res.status(200).json(result);
    })
  })
}

module.exports = aid_nexus;
