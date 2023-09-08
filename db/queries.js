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
                res.status(404).send()
            }
            if(!results.rows[0]){
                res.status(403).send('Nothing to delete. Envelope with specified ID does not exist!')
            }
            res.status(200).send('Envelope deleted deleted with ID: '+id)
        }
    )
}
const updateEnvelope = (req, res,) => {
    const id = req.params.id
    const {title, allocated_budget} = req.query
    if(title && allocated_budget){
        pool.query(
            'UPDATE envelopes SET title = $2 WHERE id=$1 RETURNING *;',
            [id, title],
            (error, results) => {
                if(error){
                    throw error
                }
                console.log(results.rows[0])
                pool.query(
                    'SELECT * FROM envelopes WHERE id=$1; ',
                    [id],
                    (error, results) => {
                        if(error){
                            throw error
                        }
                        if((results.rows[0].allocated_budget) < allocated_budget){
                            let difference = allocated_budget - results.rows[0].allocated_budget
                            const addToBudget = addToBudget(difference, id, res)
                        }
                        if((results.rows[0].allocated_budget) > allocated_budget){
                            let difference = results.rows[0].allocated_budget -allocated_budget
                            const addToBudget = substractFromBudget(difference, id, res)
                        }
                    }
                )
            }
        )    }
    if(title && !allocated_budget){
        pool.query(
            'UPDATE envelopes SET title = $2 WHERE id=$1 RETURNING *;',
            [id, title],
            (error, results) => {
                if(error){
                    throw error
                }
                console.log(results.rows[0])
                res.status(200).send(results.rows[0])
            }
        )
    }
    if(allocated_budget && !title){
        pool.query(
            'SELECT * FROM envelopes WHERE id=$1;',
            [id],
            (error, results) => {
                if(error){
                    throw error
                }
                if((results.rows[0].allocated_budget) < allocated_budget){
                    let difference = allocated_budget - results.rows[0].allocated_budget
                    const addToBudget = addToBudget(difference, id, res)
                }
                if((results.rows[0].allocated_budget) > allocated_budget){
                    let difference = results.rows[0].allocated_budget -allocated_budget
                    const addToBudget = substractFromBudget(difference, id, res)
                }
            }
        )
    }
}

const spendFromEnvelope = (req, res) => {
    if(amount){
        pool.query(
            'SELECT balance FROM envelopes WHERE id=$1;',
            [id],
            (error, results) => {
                if(error){
                    throw error
                }
                if(results.rows.length < 1){
                    res.status(404).send('Invalid ID!')
                }else{
                    if((results.rows[0].balance - amount) < 0){
                        res.status(403).send('Not enough balance in this envelope!')
                    }
                    else{
                        pool.query(
                            'UPDATE envelopes SET balance = balance - $2 WHERE id = $1 RETURNING *;',
                            [id, amount],
                            (error, results) => {
                                if(error){
                                    throw error
                                }
                                console.log(results.rows[0])
                                next()
                            }
                        )
                    }
                }
            }

        )
    }
}

module.exports = {
    getAllEnvelopes,
    getEnvelopeById,
    addNewEnvelope,
    deleteEnvelope, 
    updateEnvelope,
}