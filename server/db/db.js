//import Pool from 'pg'
const Pool = require("pg").Pool;
//const =new pg.Pool();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbAppTest',
  password: '1234',
  port: 5432,
})

// const connectionString = 'postgresql://postgres:1234@localhost:5432/dbAppTest';
 
// // pools will use environment variables
// // for connection information
// const pool = new Pool({
//     connectionString
// });

module.exports = pool;
