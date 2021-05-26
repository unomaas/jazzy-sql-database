// ⬇ File setup: 
const express = require('express');
const router = express.Router();
const pg = require( 'pg' );
const Pool = pg.Pool;
const pool = new Pool({
  database: 'jazzy_sql', // Needs to match whatever it's named as in Postico. 
  host: 'localhost',
  port: 5432, // Where the database is running, not our server on 5000. 
});
pool.on( 'connect', () => {
  console.log( 'Connected to POSTGRES' );
});
pool.on( 'error', error => {
  console.log( 'Error to POSTGRES:', error );
});


//#region ⬇⬇ All GET & POST routes below: 
// ⬇ GET /artist route to DB:
router.get('/', (req, res) => {
  console.log(`In /artist GET`);
  // ⬇ Declare variable for SQL queries:
  const queryText = `SELECT * FROM "artist" ORDER BY "birthdate" DESC;`;
  // ⬇ Setup pool.query to communicate:
  pool.query( queryText )
  .then( result => {
    console.log( result.rows ); // Have to narrow down our data? 
    res.send(  result.rows );
  }).catch( error => { // If pool.query fails:
    console.log( error );
    res.sendStatus( 500 ); // Server error, not client error. 
  }); // End pool.query call. 
}); // End GET /artist route. 

// ⬇ POST /artist route to DB: 
router.post('/', (req, res) => {
  console.log('In /artist POST');
  // ⬇ Declare variable for SQL queries:
  let queryText = `INSERT INTO "artist" ("name", "birthdate")
  VALUES ($1, $2);`;
  // ⬇ Sanitize your inputs:
  let values = [req.body.name, req.body.birthdate];
  // ⬇ Setup pool.query to communicate:
  pool.query( queryText, values )
  .then( result => {
    console.log( result.rows );
    res.sendStatus( 201 ); // CREATED. 
  }).catch( error => {
    console.log( error );
    res.sendStatus( 500 ); // SERVER ERROR. 
  }); // End pool.query call.
}); // End POST /artist route. 
//#endregion ⬆⬆ All GET & POST routes above. 


module.exports = router;