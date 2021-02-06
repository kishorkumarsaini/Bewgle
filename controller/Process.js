const JsonModel = require('../models/reqdata');

let start_time = new Date().getMilliseconds();

exports.processEndPoint = async(req, res) => {

    var obj = {
        date: (new Date()).toISOString(),
        method: req.method,
        path: req.path,
        body: req.body,
        duration: new Date().getMilliseconds() - start_time
    };

    var reqData = JSON.stringify(obj);
    var ParseData = JSON.parse(reqData);
    console.log(ParseData);


    try {
        const createObj = await JsonModel.create(ParseData);
        res.setTimeout(ParseData.duration, () => {
            res.status(200).json({
                message: 'data successfully save',
                data: {
                    createObj
                }
            })

        })

    } catch (err) {
        res.status(500).json({
            message: err,
            status: 'fail'
        })
    }

};

exports.getProcess = async(req, res) => {

    let obj = {
        date: (new Date()).toISOString(),
        method: req.method,
        path: req.path,
        query: req.query,
        duration: new Date().getMilliseconds() - start_time
    };
    let reqData = JSON.stringify(obj);
    let ParseData = JSON.parse(reqData);

    try {
        await JsonModel.create(ParseData);
        console.log(ParseData);
        var getJson = await JsonModel.find();
        console.log(getJson);
        res.setTimeout(ParseData.duration, () => {
            res.status(201).json({
                message: 'data successfully save',
                data: {
                    getJson
                }
            })

        })

    } catch (err) {
        res.status(500).json({
            message: err,
            staus: 'fail'
        })
    }

};