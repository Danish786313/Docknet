const { appointment, sequelize, docter_patient_appointment, patient, docter, availability, payment } = require("../models");
const moment = require("moment")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.createApointment = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let reqDay = moment(req.body.date).format('dddd'); // Wednesday
        let isavailable = await availability.findOne({where: {docter_id: req.body.docter_id}, attributes: [reqDay]})
        if (!Object.values(isavailable.dataValues)[0]) {
            return Response.errorResponseWithoutData(
                res,
                SUCCESS,
                "Docter is not available on this day.",
                req
            )
        } 
       
        let gettime = moment(req.body.time, ['h:m', 'H:m'])

        let isCreated = await appointment.findAll({where: {date: req.body.date},
                include: [{model: docter, where: {id: req.body.docter_id}}]
            })

            isCreated.forEach(element => {
            if (moment(element.time, ['h:m', 'H:m']).isSame(gettime)) {
                throw new Error("Apointment already exists in this Time.")
            }
        });

        let aptmnt = await appointment.create(req.body, {transaction : t })
        let post = {
            docter_id: req.body.docter_id,
            patient_id: req.profile.id,
            apointment_id: aptmnt.id,
        }
        let data = await docter_patient_appointment.create(post, {transaction : t})
        if (aptmnt && data) {
            await t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Apointment request successfully send to docter."
            )
        } else {
            await t.rollback()
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Apointment request failed to send to docter."
            )
        }
    } catch (err) {
        await t.rollback()
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            err.message ? err.message : "Apointment request failed to send to docter.",
            req
        )
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
    try {
        await docter_patient_appointment.findAll({
            where: {docter_id: req.profile.id}, 
            include: [
                {model: appointment,
                where: {status: req.query.status},
                },
                {model:patient}
            ]}).then(data => {
            res.json(data)
        })
    } catch (err) {

    }
    return
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

exports.acceptApointments = async (req, res) => {
    try {
        let result = await appointment.update({status:"Upcoming"})
    } catch(err) {

    }
}