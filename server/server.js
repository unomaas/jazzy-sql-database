//#region ⬇⬇ Server functionality setup below:
// ⬇ Express & bodyParser setup:
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static( 'server/public' ));
app.listen(PORT, () => {
    console.log( 'Server running on port:', PORT )
});
// ⬇ PG setup:
const pool = require( './modules/pool' );
//#endregion ⬆⬆ Server functionality setup setup above. 


//#region ⬇⬇ All GET & POST routes below: 
// ⬇ GET & POST /artist route to DB:
let artist = require( './routes/artist' );
app.use( '/artist', artist );


// ⬇ GET /song route to DB: 
app.get('/song', (req, res) => {
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
});

// ⬇ POST /song route to DB:
app.post('/song', (req, res) => {
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
});
//#endregion ⬆⬆ All GET & POST routes above. 
