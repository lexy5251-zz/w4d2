var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});

// how to use the argv slice
var firstName = process.argv.slice(2)[0];


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query(
    "SELECT * FROM famous_people WHERE first_name = $1::text",
    [firstName],
    (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }

      function countPeople (arr) {
        for (var i = 0; i < arr.length; i++) {

        }
        return i;
      }

       console.log(`Searching ...\nFound ${countPeople(result.rows)} person(s) by the name '${firstName}':`);


      for (var i = 0; i < result.rows.length; i++) {
        let a = result.rows[i];
        var date = new Date(a.birthdate);
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var year = date.getUTCFullYear();

        newdate = year + "-" + month + "-" + day;
      console.log(
        `- ${i+1}: ${firstName} ${a.last_name}, born ${newdate}`);
      }

      client.end();
    }


  );
});
