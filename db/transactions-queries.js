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
        'SELECT * FROM transactions ORDER BY id;',
        (error, results) => {
            if(error) {
                res.status(500).send(error)
            }else{
                res.status(200).json(results.rows)
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

const addNewTransaction = (req, res) => {
    const {amount, envelope_id, reciepient} = req.query
    if(!amount || !envelope_id){
        res.status(403).send('Required query parameters not provided!')
    }else{
        pool.query(
            'SELECT balance::numeric::int FROM envelopes WHERE id=$1;',
            [envelope_id],
            (error, results) => {
                if(error){
                    res.status(400).send()
                }
                if(results.rows[0].balance < amount){
                    res.status(403).send('No enough balance in this envelope!!!')
                }else{
                    pool.query(
                        'UPDATE envelopes SET balance = balance - $2 WHERE id = $1 RETURNING *;',
                        [envelope_id, amount],
                        (error, results) => {
                            if(error){
                                res.status(400).send(error)
                            }else{
                                pool.query(
                                    'INSERT INTO  transactions(amount, envelope_id, reciepient) VALUES($1, $2, $3) RETURNING *;',
                                    [amount, envelope_id, reciepient],
                                    (error, results) => {
                                        if(error){
                                            res.status(500).send(error)
                                        }else{
                                            res.status(201).json(results.rows)
                        
                                        }
                                    }
                                )
                            }
                        }
                    )
                }
            }
        )
    }
    
}
module.exports = {
    getAllTransactions,
    getTransactionById,
    addNewTransaction,
}