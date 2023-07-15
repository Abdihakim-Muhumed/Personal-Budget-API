let {totalBudget} = require('./data.js')
const {envelopes} = require('./data.js')

const getAllEnvelopes = () => {
    return envelopes
}

const getEnvelopeById = (id) => {
    const envelope = envelopes.find(envelope => envelope.id === Number(id))
    if(!envelope){
        throw new Error('Invalid envelope ID')
    }
    return envelope
}

const addNewEnvelope = (envelope) => {
    const envelopeIndex = envelopes.findIndex(envelopeInArray => envelopeInArray.title == envelope.title)
    if(envelopeIndex > -1){
        throw new Error('Envelope title already exists!')
    }
    envelope.id = envelopes.length
    envelopes.push(envelope)
    envelope.balance = envelope.budget
    totalBudget += envelope.budget
    return envelope

}

const updateEnvelopeBalance = (id, amountSpent) => {
    const envelopeIndex = envelopes.findIndex( envelope => envelope.id === Number(id))
    if(envelopes[envelopeIndex].balance < amountSpent){
        throw new Error('Not enough balance in the envelope. Current balance is: ' + envelopes[envelopeIndex].balance)
    }
    envelopes[envelopeIndex].balance = balance - amountSpent
    return envelopes[envelopeIndex]
}

const updateEnvelope = (id, envelope) => {
    const envelopeIndex = envelopes.findIndex(envelopeFound => envelopeFound.id = Number(id))
    if(envelopeIndex === -1){
        throw new Error('Envelope not found!')
    }
    if (envelope.id) {
        envelope.id === Number(envelope.id);
      }
    Object.assign(envelopes[envelopeIndex], envelope);
    return envelopes[envelopeIndex];
}

const deleteEnvelope = id => {
    const index = envelopes.findIndex(envelope => envelope.id === Number(id))
    if(index > -1){
        const deletedEnvelope = envelopes.splice(index, 1)
        return deletedEnvelope
    }
   
    throw new Error('Invalid envelope ID!')

}

module.exports = {
    getAllEnvelopes,
    getEnvelopeById,
    addNewEnvelope,
    updateEnvelope,
    updateEnvelopeBalance,
    deleteEnvelope
}