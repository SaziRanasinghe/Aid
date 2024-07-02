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

module.exports = aid_nexus;
