const express = require('express')
//const order = require('./routes/order.router')
const app = express()
const PORT = 4000//require('./config/server.config')
const connectDB = require('./connections/db.connections')
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get('/', (req, res) => {
    res.send('This is the home!')
})
app.get('/order', (req, res) => {
    res.send('this is Order Page!')
})
app.listen(PORT, () => {
    console.log("Server is connected to port no. ${PORT}")
})
