const express = require('express')
const envelopesRouter = express.Router()
const {
    getAllEnvelopes,
    getEnvelopeById,
    addNewEnvelope,
    updateEnvelope,
    updateEnvelopeBalance,
    deleteEnvelope
} = require('./utils/utils.js')


envelopesRouter.get('/', (req, res) => {
    const envelopes = getAllEnvelopes()
    res.status(200).json(envelopes)
})

envelopesRouter.get('/:id', (req, res) => {
    try {
        const envelope = getEnvelopeById(req.params.id)
        res.status(200).json(envelope)
    } catch (error) {
        res.status(404).send()
    }
})
module.exports = envelopesRouter