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

const getAllTransactions = (req, res) => {
    pool.query(
        'SELECT * FROM transactions;',
        (error, results) => {
            if(error) {
                res.status(500).send(error)
            }else{
                res.status(200).send(results.rows)
            }

        }
    )
}

module.exports = {
    getAllTransactions,
}