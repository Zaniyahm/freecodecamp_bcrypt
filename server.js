'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();
const bcrypt      = require('bcrypt');

fccTesting(app);
const saltRounds = 13;
const myPlaintextPassword = 'passw0rd!';
const someOtherPlaintextPassword = 'pass123';



//START_ASYNC 

// Hash the password
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    return console.error('Error hashing password:', err);
  }

  console.log('Hashed password:', hash);

  // Now compare the hashed password with the plain text
  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    if (err) {
      return console.error('Error comparing passwords:', err);
    }

    console.log('Password match?', res); // Should print: true
  });
});



//END_ASYNC

//START_SYNC


// Hashing synchronously
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log('Sync hashed password:', hash);

// Comparing synchronously
const result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log('Password match (sync)?', result); // Should print: true


//END_SYNC









const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
