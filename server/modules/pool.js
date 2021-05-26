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

module.exports = pool;