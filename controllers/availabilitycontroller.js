const { availability } = require("../models")
const moment = require("moment")

exports.CreateAvailability = async (req, res) => {
    let start = moment(req.body.start, ['h:m a', 'H:m'])
    let end = moment(req.body.end, ['h:m a', 'H:m'])
    let slots = []
    while (true) { 
        if (start.isBefore(end)) {
            slots.push(start.format('HH:mm'))
            start.add(parseInt(req.body.slot_duration), 'm')
        } else {
            break
        }
    }
     
    post = {
        docter_id: req.body.docter_id,
        start: moment(req.body.start, ['h:m', 'H:m']).format(),
        end: moment(req.body.end, ['h:m', 'H:m']).format(),
        slots: slots,
        emergency: req.body.emergency,
        available: req.body.available
    }

    await availability.create(post).then(() => {
        res.status(200).json({
            message: "Availability created successfully"
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    });
}

exports.getAvailability = async (req, res) => {
    await availability.findAll({where: {docter_id: req.params.id}}).then((data) => {
        res.status(200).json(data)
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
}

exports.deleteAvailability = async (req, res) => {
    await availability.destroy({where: {docter_id: req.params.id}}).then(() => {
        res.status(200).json({
            message: "Availability deleted successfully"
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    });
};


