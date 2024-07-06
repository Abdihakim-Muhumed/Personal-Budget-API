const Pool = require('pg').Pool
const DB_CONFIG = require('../config.js').DB_CONFIG;


const pool = new Pool(DB_CONFIG);

/*
const sampleQuery = () => {
    pool.query(
        'SELECT * FROM envelopes;',
        (error, results) => {
            if(error){
                throw error
            }
            console.log(results.rows)
        }
    )
}
sampleQuery()
*/
const getAllEnvelopes = (req, res) =>{
    pool.query(
        'SELECT * FROM envelopes ORDER BY id',
        (error, results) => {
            if(error){
                res.status(500).send()
            }else{
                res.status(200).json(results.rows)
            } 
        }
    )
}

const getEnvelopeById = (req, res) => {
    const id = req.params.id
    console.log(id)
    pool.query(
        'SELECT * FROM envelopes WHERE id = $1',
        [id],
        (error, results) => {
            if(error){
                res.status(400).send()
            }
            else if(results.rows.length < 1){
                res.status(404).send()
            }else{
                res.status(200).json(results.rows)
            }
        }
    )
}

const addNewEnvelope = (req, res) => {
    const {title, balance, description} = req.query
    pool.query(
        'INSERT INTO envelopes(title, balance, description) VALUES( $1, $2, $3) RETURNING *',
        [title, balance, description],
        (error, results) => {
            if(error){
                res.status(400).send(error.message)
            }else{
                res.status(201).json(results.rows)
            }
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
                res.status(400).send()
            }
            else if(!results.rows[0]){
                res.status(404).send('Envelope not found!')
            }else{
                res.status(200).send('Envelope deleted')
            }
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
                res.status(400).send()
            }else{
                res.status(200).json(results.rows[0])
            }
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
                res.status(400).send()
            }
            if(results.rows[0].balance < amount){
                res.status(403).send('No enough balance in this envelope!!!')
            }else{
                pool.query(
                    'UPDATE envelopes SET balance = balance - $2 WHERE id = $1 RETURNING *;',
                    [id, amount],
                    (error, results) => {
                        if(error){
                            res.status(400).send()
                        }else{
                            res.status(200).json(results.rows[0])
                        }
                    }
                )
            }
        }
    )
}

const transferBudget = (req, res)=>{
    const {from, to} = req.params
    const {amount} = req.query
    pool.query(
        'SELECT balance::numeric::int FROM envelopes WHERE id=$1;',
        [from],
        (error, results) => {
            if(error){
                res.status(400).send()
            }
            if(results.rows[0].balance < amount){
                res.status(403).send('No enough enough balance to transfer the specified amount!')
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
                        res.status(500).send()
                    }else{
                        res.status(200).send('Budget transfered successfully!')
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