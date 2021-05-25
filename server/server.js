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
//#endregion ⬆⬆ Server functionality setup setup above. 

// TODO - Replace static content with a database tables


//#region ⬇⬇ All GET & POST routes below: 
app.get('/artist', (req, res) => {
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

app.post('/artist', (req, res) => {
    artistList.push(req.body);
    res.sendStatus(201);
});

app.get('/song', (req, res) => {
    console.log(`In /songs GET`);
    res.send(songList);
});

app.post('/song', (req, res) => {
    songList.push(req.body);
    res.sendStatus(201);
});
//#endregion ⬆⬆ All GET & POST routes above. 


//#region ⬇⬇ Old code below: 
// const artistList = [ 
//     {
//         name: 'Ella Fitzgerald',
//         birthdate: '04-25-1917'
//     },
//     {
//         name: 'Dave Brubeck',
//         birthdate: '12-06-1920'
//     },       
//     {
//         name: 'Miles Davis',
//         birthdate: '05-26-1926'
//     },
//     {
//         name: 'Esperanza Spalding',
//         birthdate: '10-18-1984'
//     },
// ]
// const songList = [
//     {
//         title: 'Take Five',
//         length: '5:24',
//         released: '1959-09-29'
//     },
//     {
//         title: 'So What',
//         length: '9:22',
//         released: '1959-08-17'
//     },
//     {
//         title: 'Black Gold',
//         length: '5:17',
//         released: '2012-02-01'
//     }
// ];
//#endregion ⬆⬆ Old code above. 