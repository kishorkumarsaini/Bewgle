const JsonModel = require('../models/reqdata');


exports.processEndPoint = (req, res) => {

    let start_time = new Date().getMilliseconds();
    var obj = {
        date: (new Date()).toISOString(),
        method: req.method,
        path: req.path,
        body: req.body
    }

    try {

        res.setTimeout(15000, async() => {

            obj.duration = new Date().getMilliseconds() - start_time;
            var reqData = JSON.stringify(obj);

            var ParseData = JSON.parse(reqData);

            const createObj = await JsonModel.create(ParseData);

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
        query: req.query
    };

    try {
        res.setTimeout(15000, async() => {

            let start_time = new Date().getMilliseconds();

            obj.duration = new Date().getMilliseconds() - start_time;

            let reqData = JSON.stringify(obj);

            let ParseData = JSON.parse(reqData);

            //save the data 
            await JsonModel.create(ParseData);

            //get the data
            var getJson = await JsonModel.find();

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


exports.statsEndPoint = async(req, res) => {


    const stats = await JsonModel.aggregate([{
        $group: {
            _id: '$method',
            totalRequest: { $sum: 1 },
            avgDuration: { $avg: '$duration' }
        }
    }])


    res.status(200).json({
        message: 'all the request',
        data: {
            stats
        }
    })
}

exports.fromDateFilter = async(req, res) => {

    const stats = await JsonModel.aggregate([{
        $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalRequest: { $sum: 1 },
            avgDuration: { $avg: '$duration' },

        }

    }]);

    res.status(200).json({
        message: 'all the request',
        data: {
            stats
        }
    });

}