const Pool = require('pg').Pool
const DB_CONFIG = require('../config.js').DB_CONFIG;


const pool = new Pool(DB_CONFIG);

const sampleQuery = () => {
    pool.query(
        'SELECT * FROM transactions;',
        (error, results) => {
            if(error){
                throw error
            }
            console.log(results.rows)
        }
    )
}
sampleQuery()