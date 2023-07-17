const Pool = require('pg').Pool
const DB_CONFIG = require('../config.js').DB_CONFIG;

const pool = new Pool(DB_CONFIG);


const addToBudget = (amount, id) => {
    pool.query(
        'UPDATE envelopes SET allocated_budget = allocated_budget + $1, balance = balance + $1 WHERE id = $2 RETURNING *;',
        [amount, id],
        (error, results) => {
            if(error){
                throw error
            }
            console.log(results.rows[0].allocated_budget)
        }
    )
}

const substractFromBudget = (amount, id) => {
    pool.query(
        'UPDATE envelopes SET allocated_budget = allocated_budget - $1, balance = balance - $1 WHERE id = $2 RETURNING *;',
        [amount, id],
        (error, results) => {
            if(error){
                throw error
            }
            console.log(results.rows[0])
            return results.rows[0]
        }
    )
}

const addToBalance = (amount, id) => {
    pool.query(
        'UPDATE envelopes SET balance = balance + $1 WHERE id = $2 RETURNING *;',
        [amount, id],
        (error, results) => {
            if(error){
                throw error
            }
            console.log(results.rows[0])
        }
    )
}

const substractFromBalance = (amount, id) => {
    pool.query(
        'UPDATE envelopes SET balance = balance - $1 WHERE id = $2 RETURNING *;',
        [amount, id],
        (error, results) => {
            if(error){
                throw error
            }
            console.log(results.rows[0])
        }
    )
}

module.exports = {
    addToBalance,
    substractFromBalance,
    addToBudget,
    substractFromBudget
}