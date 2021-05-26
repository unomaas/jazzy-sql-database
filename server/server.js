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

// ⬇ GET & POST /song route to DB:
let song = require( './routes/song' );
app.use( '/song', song );
//#endregion ⬆⬆ All GET & POST routes above. 
