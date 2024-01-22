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

const getTransactionById = (req, res) => {
    const id = req.params.id
    pool.query(
        'SELECT * FROM transactions WHERE id = $1;'
        [id],
        (error, results) => {
            if(error){
                console.log(error)
                res.status(400).send(error)
            }
            else if(results.rows.length < 1){
                res.status(404).send()
            }else{
                res.status(200).json(results.rows)
                console.log(results.rows)
            }
        }
     )
}
module.exports = {
    getAllTransactions,
    getTransactionById,
}