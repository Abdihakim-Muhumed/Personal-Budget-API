const express = require('express')
const envelopesRouter = express.Router()
const {
    getAllEnvelopes,
    getEnvelopeById,
    addNewEnvelope,
    deleteEnvelope,
    updateEnvelope,
    updateEnvelopeBalance,
    transferBudget
} = require('./db/queries.js')

const { envelopes } = require('./utils/data.js')


envelopesRouter.get('/', getAllEnvelopes)

envelopesRouter.get('/:id', getEnvelopeById)

envelopesRouter.post('/', addNewEnvelope)

envelopesRouter.put('/:id', updateEnvelope)

envelopesRouter.put('/:id/spend/', updateEnvelopeBalance)

envelopesRouter.post('/transfer/:from/:to', (req, res) => {
    try {
        const transfer = transferBudget(req.params.from, req.params.to, req.query.amount)
        res.status(200).send('Budget transfer sucessful!')
    } catch (error) {
        res.status(403).send(error.message)
    }
})

envelopesRouter.delete('/:id', deleteEnvelope)


module.exports = envelopesRouter