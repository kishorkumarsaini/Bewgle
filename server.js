const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const processRouter = require('./routes/route');

const JsonModel = require('./models/reqdata');
const port = 8080 || process.env.PORT;
const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb database

mongoose.connect(`mongodb://localhost:27017/bewgle`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Database Connected Successfully');
    })
    .catch((err) => {
        console.log(`Something went wrong please check:${err}`);
    });

app.use('', processRouter);




//run the app on local server 8080
app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});