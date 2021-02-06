const app = require('./app');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const port = 8000 || process.env.PORT;

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




//run the app on local server 8000
app.listen(port, () => {
    console.log(`Server started on port:${port}`);
});