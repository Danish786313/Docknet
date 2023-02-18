const { availability, slottime } = require("../models")

exports.CreateAvailability = async (req, res) => {
    let available = await availability.findOne({where: { id: req.profile.id }})
    if (available) {
        return res.status(400).send({
            message: "You have already created availability"
        })
    }
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

exports.getAvailability = async (req, res) => {
    await availability.findOne({ where: {docter_id: req.profile.id}}).then((data) => {
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
        if (data[0] != 0) {
            res.status(200).json({
                message: "Slot updated successfully",
                result: data
            })
        } else {
            return Promise.reject("Please Provide atleast one field to update")
        }
    }).catch(err => {
        res.status(200).json({
            success: false,
            Error: err
        })
    })
}

exports.deleteAvailability = async (req, res) => {
    await availability.destroy({where: {docter_id: req.profile.id}}).then(() => {
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