const express = require('express');
const { HOST, PORT, ENV } = require('./config/server');
const { dbConnect } = require('./helpers');
const masterRouter = require('./routers');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(masterRouter);

app.listen(PORT, () => {
    process.stdout.write(`Server started at ${HOST}:${PORT} (${ENV})\n`);
    dbConnect().then(msg => { console.log(msg) }).catch(err => { console.log(err) });
});

module.exports = {
    app
};