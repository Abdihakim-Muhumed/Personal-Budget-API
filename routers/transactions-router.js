const express = require('express')
const transactionsRouter = express.Router()
const {
    getAllTransactions,
} = require('../db/transactions-queries')

transactionsRouter.get('/',getAllTransactions)


module.exports = transactionsRouter;