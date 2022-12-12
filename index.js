const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect("/mongoDB//localhost/demoDB45", { family: 4 }, (err) => {
    if (err) {
        console.log('Error occurred')
    } else {
        console.log('Connected to Db')
        app.listen(port, () => {
            console.log(`App listening at //localhost:-${port}`)
        })

    }
})