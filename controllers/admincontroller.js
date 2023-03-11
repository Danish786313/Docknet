const { admin, sequelize, docter_patient_appointment, appointment, patient, docter } = require("../models")
const bcrypt = require("bcrypt")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")
const { QueryTypes } = require('sequelize');
const Helper = require("../helper/helper")
const { Op } = require("sequelize")

exports.adminLogin = async (req, res) => {
    await admin.findOne({where: {email: req.body.email }}).then(async user => {
        if (user) {
            if (user.name != "Admin") {
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "You are not admin.",
                    req,
                )
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({
                        id: user.id,
                        email: user.email,
                    }, process.env.secret , {expiresIn: 360}, (err, token) => {
                        user.token = token
                        user.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                message: "Login Successful",
                                token: token,
                                User: user
                            })
                        })
                        return res.status(200).json({
                            success: true,
                            message: "Login Successful",
                            token: token
                        })
                    });
                } else {
                    return Response.errorResponseWithoutData(
                        res,
                        FAIL,
                        "Invalid Password.",
                        req,
                    )
                }
            });
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Email does not exist.",
                req,
            )
        }
    })
}


exports.analytics = async (req, res) => {
    try {
        let startDate = req.query.startDate
        let endDate = req.query.endDate
        let dashboardData = {}

        let patient_count = await sequelize.query(`select 
            COUNT(id) FROM patients WHERE date(createdAt) >= date(?) AND date(createdAt) <= date(?);`, {
            replacements: [startDate, endDate],
            type: QueryTypes.SELECT,
            plain: true,
        })
        dashboardData.patient_count = patient_count
        
        let available_count = await sequelize.query(`select SUM(CASE WHEN available = 1 THEN 1 ELSE 0 END) AS available_docters, SUM(CASE WHEN available = 0 THEN 1 ELSE 0 END) AS unavailable_docters FROM availabilities;`, {
            type: QueryTypes.SELECT,
            plain: true
        })
        dashboardData.available_count = available_count
    
        let onboarding_count = await sequelize.query(`select 
            SUM(CASE WHEN status = 0 THEN 1 ELSE 0 END) as pending, 
            SUM(CASE WHEN status = 1 THEN 1 ELSE 0 END) as onbaorded
            FROM count_docters WHERE date(createdAt) >= date(?) AND date(createdAt) <= date(?);`, {
            replacements: [startDate, endDate],
            type: QueryTypes.SELECT,
            plain: true
        })
        dashboardData.onboarding_count = onboarding_count

        let apointments_count = await sequelize.query(`SELECT 
            sum(CASE WHEN status = "Request" THEN 1 ELSE 0 END) as Request,
            sum(CASE WHEN status = "Reshedule" THEN 1 ELSE 0 END) as Reshedule,
            sum(CASE WHEN status = "Upcoming" THEN 1 ELSE 0 END) as Upcoming,
            sum(CASE WHEN status = "Cancelled" THEN 1 ELSE 0 END) as Cancelled 
            from analytics where date(createdAt) >= date(?) AND date(createdAt) <= date(?);`, {
            replacements: [startDate, endDate],
            type: QueryTypes.SELECT,
            plain: true
        });
        dashboardData.apointments_count = apointments_count

        let highNumberOfApointment = await sequelize.query(`SELECT 
            count(docter_id) as number, docter_id FROM docter_patient_appointments AS docter_patient_appointment 
            INNER JOIN appointments AS appointment ON docter_patient_appointment.apointment_id = appointment.id AND appointment.status = 'Upcoming' 
            LEFT OUTER JOIN patients AS patient ON docter_patient_appointment.patient_id = patient.id 
            WHERE date(docter_patient_appointment.createdAt) >= date(?) and date(docter_patient_appointment.createdAt) <= date(?) 
            GROUP by docter_id`, {
            replacements: [startDate, endDate],
            type: QueryTypes.SELECT,
        })
        dashboardData.apointments_count = highNumberOfApointment

        return Response.successResponseData(
            res,
            dashboardData,
            SUCCESS,
            "Dashboard data fetched successfully."
        )
    } catch (err) {
        console.log(err)
        Response.errorResponseWithoutData(
            res,
            FAIL,
            err.message? err.message: "Something went wrong.",
            req
        )
    }
}

exports.getAlldocters = async (req, res) => {
    try {
        const { _page, _limit, searchText } = req.query;
        const { limit, offset } = Helper.getPagination(_page, _limit);
        let where = {}
        if (searchText) {
            where = {
                [Op.or]: [
                    { fullName: { [Op.like]: "%" + searchText + "%" } },
                    { phone: { [Op.like]: "%" + searchText + "%" } },
                    { email: { [Op.like]: "%" + searchText + "%" } },
                ],
            };
        }
        let data = await docter.findAndCountAll({
            limit,
            offset,
            where
        })
        const response = Helper.getPagingData(data, _page, limit);
        // res.send(response)
        if (response.items.length) {
            Response.successResponseData(
                res,
                response,
                SUCCESS,
                `Docters fetched successfully.`
            )
        } else {
            Response.errorResponseWithoutData(
                res,
                FAIL,
                `Docters does not exist.`,
                req
            )
        }
    } catch (err) {
        console.log(err)
        Response.errorResponseWithoutData(
            res,
            FAIL,
            `Docters does not exist.`,
            req
        )
    }
}

exports.getAllpatients = async (req, res) => {
    try {
        const { _page, _limit, searchText } = req.query;
        const { limit, offset } = Helper.getPagination(_page, _limit);
        let where = {}
        if (searchText) {
            where = {
                [Op.or]: [
                    { fullName: { [Op.like]: "%" + searchText + "%" } },
                    { phone: { [Op.like]: "%" + searchText + "%" } },
                    { email: { [Op.like]: "%" + searchText + "%" } },
                ],
            };
        }
        let data = await patient.findAndCountAll({
            limit,
            offset,
            where
        })
        const response = Helper.getPagingData(data, _page, limit);
        // res.send(response)
        if (response.items.length) {
            Response.successResponseData(
                res,
                response,
                SUCCESS,
                `Docters fetched successfully.`
            )
        } else {
            Response.errorResponseWithoutData(
                res,
                FAIL,
                `Docters does not exist.`,
                req
            )
        }
    } catch (err) {
        console.log(err)
        Response.errorResponseWithoutData(
            res,
            FAIL,
            `Docters does not exist.`,
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
            // where: {docter_id: req.profile.id}, 
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