const express = require('express')
const app  =  express()
const PORT  = 3000
const envelopesRouter = require('./envelopes-router.js')
const bodyParser = require('body-parser')

app.use('/envelopes', envelopesRouter)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.use(bodyParser.json())
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/`)
})