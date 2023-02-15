const { appointment, sequelize, docter_patient_appointment, patient, docter } = require("../models");

exports.createApointment = async (req, res) => {
    await sequelize.transaction(async (t) => {
        await appointment.create(req.body, {transaction : t }).then(async (appointment) => {
            post = {
                docter_id: req.body.docter_id,
                patient_id: req.profile.id,
                apointment_id: appointment.id,
            }
            console.log(post)
            await docter_patient_appointment.create(post, {transaction : t}).catch(err => console.log(err))
            res.status(200).json({ 
                message: "Appointment created successfully" 
            })
        }).catch(err => {
            res.status(500).json({ 
                message: "Appointment creation failed" 
            })
        });
    })
}

exports.apointments = async (req, res) => {
    await appointment.findAll({
        include: [{
            model: patient,
            where: {id: req.profile.id},
        }],
        where: {status: req.query.status}
    }).then(result => {
        res.status(200).json({
            message: "All applications fetched successfully",
            result: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Failed to fetch applications"
        })
    })
}

exports.cancelApointment = async (req, res) => {
    await sequelize.transaction(async (t) => {
        await appointment.update({status: "Cancelled"}, {where: {id: req.params.id}}, {transaction : t}).then(async (appointment) => {
            res.status(200).json({ 
                message: "Appointment cancelled successfully" 
            })
        }).catch(err => {
            res.status(500).json({ 
                message: "Appointment cancellation failed"
            })
        });
    })
}

/* =========================== Docter ================================ */
exports.resheduleApointment = async (req, res) => {
    await sequelize.transaction(async (t) => {
        await appointment.update({
            status: "Reshedule",
            date: req.body.date,
            time: req.body.time
        }, {where: {id: req.params.id}, transaction : t}).then(async (appointment) => {
            res.status(200).json({ 
                message: "Appointment rescheduled successfully" 
            })
        }).catch(err => {
            res.status(500).json({ 
                message: "Appointment reschedule failed" 
            })
        });
    })
}

exports.approveApointment = async (req, res) => {
    await sequelize.transaction(async (t) => {
        await appointment.update({
            status: "Upcoming"
        }, {where: {id: req.params.id}, transaction : t}).then(async (appointment) => {
            res.status(200).json({ 
                message: "Appointment approved successfully" 
            })
        }).catch(err => {
            res.status(500).json({ 
                message: "Appointment approval failed" 
            })
        });
    })
}

exports.myApointments = async (req, res) => {
    await appointment.findAll({
        include: [{
            model: docter,
            where: {id: req.profile.id},
        }],
        where: {status: req.query.status}
    }).then(result => {
        res.status(200).json({
            message: "All applications fetched successfully",
            result: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Failed to fetch applications"
        })
    })
}