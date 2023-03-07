const { appointment, sequelize, docter_patient_appointment, patient, docter, availability, payment } = require("../models");
const moment = require("moment")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")
const Helper = require("../helper/helper")
const { Op } = require("sequelize")

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
    try {
        const { _page, _limit, status, searchText } = req.query;
        const { limit, offset } = Helper.getPagination(_page, _limit);

        let where = {}
        if (searchText) {
            where = {
                [Op.or]: [
                    { name: { [Op.like]: "%" + searchText + "%" } },
                    { phone: { [Op.like]: "%" + searchText + "%" } },
                    { email: { [Op.like]: "%" + searchText + "%" } },
                ],
            };
        }

        let data = await docter_patient_appointment.findAndCountAll({
            limit,
            offset,
            where: {docter_id: req.profile.id}, 
            include: [
                {model: appointment,
                    where: {status: status},
                },
                {model:docter, where}
            ]})
        const response = Helper.getPagingData(data, _page, limit);
        if (response.items.length) {
            Response.successResponseData(
                res,
                response,
                SUCCESS,
                `${status} apointments fetched successfully.`
            )
        } else {
            Response.errorResponseWithoutData(
                res,
                FAIL,
                `${status} apointments does not exist.`,
                req
            )
        }
    } catch (err) {
        console.log(err)
        Response.errorResponseWithoutData(
            res,
            FAIL,
            `Something went wrong while fetching apointment details.`,
            req
        )
    }
}



/* =========================== Docter ================================ */
exports.myApointments = async (req, res) => {
    try {
        const { _page, _limit, status, searchText } = req.query;
        const { limit, offset } = Helper.getPagination(_page, _limit);

        let where = {}
        if (searchText) {
            where = {
                [Op.or]: [
                    { name: { [Op.like]: "%" + searchText + "%" } },
                    { phone: { [Op.like]: "%" + searchText + "%" } },
                    { email: { [Op.like]: "%" + searchText + "%" } },
                ],
            };
        }
        
        let data = await docter_patient_appointment.findAndCountAll({
            limit,
            offset,
            where: {docter_id: req.profile.id}, 
            include: [
                {model: appointment,
                    where: {status: status},
                },
                {model:patient, where}
            ]})
        const response = Helper.getPagingData(data, _page, limit);
        if (response.items.length) {
            Response.successResponseData(
                res,
                response,
                SUCCESS,
                `${status} apointments fetched successfully.`
            )
        } else {
            Response.errorResponseWithoutData(
                res,
                FAIL,
                `${status} apointments does not exist.`,
                req
            )
        }
    } catch (err) {
        console.log(err)
        Response.errorResponseWithoutData(
            res,
            FAIL,
            `Something went wrong while fetching apointment details.`,
            req
        )
    }
}

exports.UpdatemyApointments = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { status, ApointmentId } = req.query
        let result = await appointment.findByPk(ApointmentId)
        if (!result) {
            throw new Error("Appointment not found.")
        }

        if (status == "Reshedule") {
            let reqDay = moment(req.body.date).format('dddd'); // Wednesday
            let isavailable = await availability.findOne({where: {docter_id: req.profile.id}, attributes: [reqDay]})
            if (!Object.values(isavailable.dataValues)[0]) {
                return Response.errorResponseWithoutData(
                    res,
                    SUCCESS,
                    "You are not available on this day. Check My availability.",
                    req
                )
            }

            let gettime = moment(req.body.time, ['h:m', 'H:m'])
            let isCreated = await appointment.findAll({where: {date: req.body.date},
                    include: [{model: docter, where: {id: req.profile.id}}]
                })
    
                isCreated.forEach(element => {
                if (moment(element.time, ['h:m', 'H:m']).isSame(gettime)) {
                    throw new Error("You have already created apointment on this Time.")
                }
            });

        }

        let data = await appointment.update({status: status }, {where: {id: ApointmentId}, individualHooks: true}, {transaction: t})
        if (data[0] != 0) {
            await t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                `Apointment ${status} successfullly.`
            )
        } else {
            await t.rollback()
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                `Error while ${status} Apointment.`,
                req
            )
        }
    } catch(err) {
        await t.rollback()
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            err.message? err.message: "Error while updating Apointment.",
            req
        )
    }
}