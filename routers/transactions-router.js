const express = require('express')
const transactionsRouter = express.Router()
const {
    getAllTransactions,
    getTransactionById,
    addNewTransaction,
    deleteTransaction,
    getTransactionByEnvelopeId,
} = require('../db/transactions-queries')

transactionsRouter.get('/',getAllTransactions)
transactionsRouter.get('/:id', getTransactionById)
transactionsRouter.post('/', addNewTransaction)
transactionsRouter.delete('/:id', deleteTransaction)
transactionsRouter.get('/:envelope_id', getTransactionByEnvelopeId)

module.exports = transactionsRouter;