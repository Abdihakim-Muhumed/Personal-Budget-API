const express = require('express')
const app  =  express()
const PORT  = 3000
const envelopesRouter = require('./envelopes-router.js')


app.use('/envelopes', envelopesRouter)

app.get('/', (req, res) => {
    res.send('Hello world!')
})

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}/`)
})