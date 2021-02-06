const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
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

/*
let start_time = new Date().getMilliseconds();
app.post('/process', async(req, res) => {

    let reqData = {
        date: (new Date()).toISOString(),
        method: req.method,
        path: req.path,
        body: req.body,
        duration: new Date().getMilliseconds() - start_time
    };
    console.log(reqData);
    try {
        const createObj = await JsonModel.create(reqData);
        res.setTimeout(reqData.duration, () => {
            res.status(200).json({
                message: 'data successfully save',
                data: {
                    createObj
                }
            })

        })

    } catch (err) {
        res.status(500).json({
            message: err
        })
    }

});
*/



//run the app on local server 8000
app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});