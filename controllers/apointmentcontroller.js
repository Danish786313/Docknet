const { appointment, sequelize, docter_patient_appointment, patient, docter, availability, payment } = require("../models");
const moment = require("moment")

exports.createApointment = async (req, res) => {
    try {
        let reqDay = moment(req.body.date).format('dddd'); // Wednesday
        let isavailable = await availability.findOne({where: {docter_id: req.body.docter_id}})
        let days = JSON.parse(isavailable.days)
        for (let i = 0; i <= days.length; i++) {
            if (days[i] == reqDay) {
                break;
            }
            return res.status(400).json({
                message: "This date Docter is not available"
            })
        }
        
        let gettime = moment(req.body.time, ['h:m a', 'H:m'])
        let isCreated = await appointment.findAll({ where: {date: req.body.date}, 
                include: [{model: docter, where: {id: req.body.docter_id}}]})

        isCreated.forEach(element => {
            if (moment(element.time, ['h:m a', 'H:m']).isSame(gettime)){
                throw new Error("Apointment already exists in this Time")
            }
        });

            // const t = await sequelize.transaction();
            await appointment.create(req.body, /* {transaction : t } */).then(async (appointment) => {
                post = {
                    docter_id: req.body.docter_id,
                    patient_id: req.profile.id,
                    apointment_id: appointment.id,
                    payment_id: req.body.payment_id
                }
                await docter_patient_appointment.create(post, /* {transaction : t} */).catch(err => {
                    // t.rollback()
                    console.log(err)
                })
                // t.commit()
                return res.status(200).json({ 
                    message: "Appointment created successfully" 
                })
            }).catch(err => {
                // t.rollback()
                return res.status(500).json({ 
                    message: "Appointment creation failed" 
                })
            });
        
    } catch (err) {
        return res.status(400).send({
            Error: err.message
        })
    } 
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