const { slottime } = require("../models")
const moment = require("moment")

exports.getSlots = async (req, res, next, id) => {
    await slottime.findByPk(id).then(slots => {
        if(slots){
            req.slots = slots;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "slot does not exists."
        })
    })
}

exports.createslots = async (req, res) => {
    let start = moment(req.body.start, ['h:m a', 'H:m'])
    let end = moment(req.body.end, ['h:m a', 'H:m'])
    let slots = []
    while (true) { 
        if (start.isBefore(end)) {
            slots.push(start.format('HH:mm'))
            start.add(parseInt(req.body.period), 'm')
        } else {
            slots.push(start.format('HH:mm'))
            break
        }
    }
    console.log(slots)
    post = {
        docter_id : req.profile.id,
        start: moment(req.body.start, ['h:m', 'H:m']).format(),
        end: moment(req.body.end, ['h:m', 'H:m']).format(),
        slots: slots,
    }
    await slottime.create(post).then(data => {
        res.status(200).json({
            message: "Slot created successfully",
            result: data
        })
    }).catch(err => {
        res.status(400).json({
            message: "Slot creation failed",
            error: err.message
        })
    })
}

exports.findOne = async (req, res) => {
    await slottime.findAll({ where: {docter_id: req.profile.id}}).then((data) => {
        res.status(200).json({
            message: "Slots fetched successfully",
            result: data
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
}

exports.updateSlots = async (req, res) => {
    await slottime.update(req.body, {where: {id: req.params.id}}).then(data => {
        res.status(200).json({
            message: "slots updated successfully",
            result: data
        });
    }).catch(err => {
        res.status(500).json({
            message: "Errore while updating slots",
            Error: err.message
        })
    })
};


exports.deleteSlots = async (req, res) => {
    await slottime.destroy({where: {id: req.params.slotId}}).then(data => {
        res.status(200).json({
            message: "Slots deleted successfully"
        })
    }).catch(err => {
        res.status(400).json({
            message: "Error while deleting slots"
        })
    })
}