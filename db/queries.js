const Pool = require('pg').Pool
const DB_CONFIG = require('../config.js').DB_CONFIG;
const {
    substractFromBudget,
    addToBudget
} = require('./utility-queries.js')


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

const getAllEnvelopes = (req, res) =>{
    pool.query(
        'SELECT * FROM envelopes ORDER BY id',
        (error, results) => {
            if(error){
                throw error
            }
            res.status(200).json(results.rows)
        }
    )
}

const getEnvelopeById = (req, res) => {
    const id = req.params.id
    pool.query(
        'SELECT * FROM envelopes WHERE id = $1',
        [id],
        (error, results) => {
            if(error){
                throw error
            }
            if(results.rows.length < 1){
                res.status(404).send('Invalid ID!')
            }else{
                res.status(200).json(results.rows)
            }
        }
    )
}

const addNewEnvelope = (req, res) => {
    const {title, balance} = req.query
    pool.query(
        'INSERT INTO envelopes(title, balance) VALUES( $1, $2) RETURNING *',
        [title, balance],
        (error, results) => {
            if(error){
                res.status(403).send(error.message)
            }
            res.status(201).send(results.rows)
        }
    )
}

const deleteEnvelope = (req, res) => {
    const id = req.params.id
    pool.query(
        'DELETE FROM envelopes WHERE id = $1 RETURNING *;',
        [id],
        (error, results) => {
            if(error){
                throw error
            }
            if(!results.rows[0]){
                res.status(403).send('Nothing to delete. Envelope with specified ID does not exist!')
            }
            res.status(200).send('Envelope deleted deleted with ID: '+id)
        }
    )
}

const updateEnvelope = (req, res) => {
    const id = req.params.id
    const {title, description, balance} = req.query
    const updateQuery = `
    UPDATE envelopes SET
    title = COALESCE($2, title),
    description = COALESCE($3, description),
    balance = COALESCE($4, balance)
    WHERE id = $1 
    RETURNING *;
    `
    pool.query(
        updateQuery,
        [id, title, description, balance],
        (error, results) => {
            if(error){
                throw error
            }
            res.status(200).send({
                updatedEnvelope: results.rows[0]
            })           
        }
    )

}

const updateEnvelopeBalance = (req, res) => {
    const id =req.params.id
    const{amount} = req.query
    if(!amount){
        res.status(403).send('No amount specified!')
    }
    pool.query(
        'SELECT balance::numeric::int FROM envelopes WHERE id=$1;',
        [id],
        (error, results) => {
            if(error){
                throw error
            }
            console.log(results.rows)
            if(results.rows[0].balance < amount){
                res.status(403).send('No enough balance in this envelope!!!')
            }else{
                pool.query(
                    'UPDATE envelopes SET balance = balance - $2 WHERE id = $1 RETURNING *;',
                    [id, amount],
                    (error, results) => {
                        if(error){
                            throw error
                        }
                        res.status(200).send({
                            updatedEnvelope: results.rows[0]
                        })
                    }
                )
            }
        }
    )
}

const transferBudget = (from, to, amount)=>{
    pool.query(
        'SELECT balance::numeric::int FROM envelopes WHERE id=$1;',
        [from],
        (error, results) => {
            if(error){
                throw error
            }
            if(results.rows[0].balance < amount){
                return 'No enough enough balance to transfer the specified amount!'
            }
            const transferQuery = `
            UPDATE envelopes SET balance = CASE
                WHEN id = $1 THEN balance + $2
                WHEN id = $3 THEN balance - $2
            END
            WHERE id IN ($1,$3);
            `
            pool.query(
                transferQuery,
                [to, amount, from],
                (error, results) => {
                    if(error){
                        throw error
                    }
                }
            )
        }
    )
}
module.exports = {
    getAllEnvelopes,
    getEnvelopeById,
    addNewEnvelope,
    deleteEnvelope, 
    updateEnvelope,
    updateEnvelopeBalance,
    transferBudget
}