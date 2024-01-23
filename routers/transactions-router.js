const express = require('express')
const transactionsRouter = express.Router()
const {
    getAllTransactions,
    getTransactionById,
    addNewTransaction,
    deleteTransaction,
} = require('../db/transactions-queries')

transactionsRouter.get('/',getAllTransactions)
transactionsRouter.get('/:id', getTransactionById)
transactionsRouter.post('/', addNewTransaction)
transactionsRouter.delete('/:id', deleteTransaction)

module.exports = transactionsRouter;