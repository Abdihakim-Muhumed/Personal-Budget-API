const express = require('express')
const transactionsRouter = express.Router()
const {
    getAllTransactions,
    getTransactionById
} = require('../db/transactions-queries')

transactionsRouter.get('/',getAllTransactions)
transactionsRouter.get('/:id', getTransactionById)


module.exports = transactionsRouter;