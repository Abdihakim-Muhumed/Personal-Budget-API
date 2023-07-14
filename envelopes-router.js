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
module.exports = envelopesRouter