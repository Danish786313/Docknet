const { availability, slottime } = require("../models")
const moment = require("moment")

exports.CreateAvailability = async (req, res) => {
    req.body.docter_id = req.profile.id
    await availability.create(req.body).then(async (availability) => {
        res.status(200).json({
            message: "Availability created successfully",
            Availability: availability,
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    });
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
            break
        }
    }
    post = {
        availability_id: req.params.id,
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

exports.getAvailability = async (req, res) => {
    await availability.findOne({ where: {docter_id: req.profile.id}, include: [{model: slottime}] }).then((data) => {
        res.status(200).json({
            message: "Availability updated successfully",
            result: data
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
}

exports.updateAvailability = async (req, res) => {
    await availability.update(req.body, {where: {docter_id: req.profile.id}}).then(data => {
        res.status(200).json({
            message: "Slot updated successfully",
            result: data
        })
    }).catch(err => {
        res.status(200).json({
            message: "Errore while updating slot",
            result: err.message
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


