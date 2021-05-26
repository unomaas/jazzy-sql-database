//#region ⬇⬇ All file setup below:
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
//#endregion ⬆⬆ All file setup above.


//#region ⬇⬇ All GET & POST routes below: 
// ⬇ GET /song route to DB: 
router.get('/', (req, res) => {
  console.log(`In /song GET`);
  // ⬇ Declare variable for SQL queries:
  const queryText = `SELECT * FROM "song" ORDER BY "title" ASC;`;
  // ⬇ Setup pool.query to communicate:
  pool.query( queryText )
  .then( result => {
    console.log( result.rows ); // Data from get will always be result.rows. 
    res.send(  result.rows );
  }).catch( error => { // If pool.query fails:
    console.log( error );
    res.sendStatus( 500 ); // Server error, not client error. 
  }); // End pool.query call. 
}); // End GET /song route. 

// ⬇ POST /song route to DB:
router.post('/', (req, res) => {
  console.log('In /song POST');
  // ⬇ Declare variable for SQL queries:
  let queryText = `INSERT INTO "song" ("title", "length", "released")
  VALUES ($1, $2, $3);`;
  // ⬇ Sanitize your inputs:
  let values = [req.body.title, req.body.length, req.body.released];
  // ⬇ Setup pool.query to communicate:
  pool.query( queryText, values )
  .then( result => {
    console.log( result.rows );
    res.sendStatus( 201 ); // CREATED. 
  }).catch( error => {
    console.log( error );
    res.sendStatus( 500 ); // SERVER ERROR. 
  }); // End pool.query call.
}); // End POST /song route. 
//#endregion ⬆⬆ All GET & POST routes above. 


module.exports = router;