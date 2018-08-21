const pg = require('pg');
const settings = require("./settings");

const config = {
  user: 'vagrant', //env var: PGUSER
  database: 'db_test', //env var: PGDATABASE
  password: 'secret', //env var: PGPASSWORD
  host: 'localhost',
  port: 5432 //env var: PGPORT
};

var firstname = process.argv[2];

module.exports = (function() {

  const db = new pg.Client(config);
  db.connect((err) => { // Open DB connection
    if (err) throw err;
  })

const getFamousPeople = (firstName, callback) => {
  let query =
  `select first_name, birthdate
  from famous_people
  WHERE firstname = 'paul'
  `;

  db.query(query, [firstName], (err, result) => {
    if(err) {
      console.log("Something went wrong: ", err);
      callback([]);
    }
    else {
      callback(result.rows);
    }
  });
}

return {
  getFamousPeople: getFamousPeople,
  closeEverything: function() {
    db.end();
  }
}

})()

// CREATE TABLE famous_people (
//   id BIGSERIAL PRIMARY KEY,
//   first_name VARCHAR(50),
//   last_name VARCHAR(50),
//   birthdate DATE
// );

// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Abraham', 'Lincoln', '1809-02-12');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Mahatma', 'Gandhi', '1869-10-02');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Paul', 'Rudd', '1969-04-06');
// INSERT INTO famous_people (first_name, last_name, birthdate)
//   VALUES ('Paul', 'Giamatti', '1967-06-06');
