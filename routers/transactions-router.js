const express = require('express')
const transactionsRouter = express.Router()
const {
    getAllTransactions,
    getTransactionById,
    addNewTransaction,
} = require('../db/transactions-queries')

transactionsRouter.get('/',getAllTransactions)
transactionsRouter.get('/:id', getTransactionById)
transactionsRouter.post('/', addNewTransaction)


module.exports = transactionsRouter;