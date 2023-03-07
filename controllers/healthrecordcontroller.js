const { health_record, sequelize } = require("../models")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")
const Helper = require("../helper/helper")

exports.findHealthRecord = async (req, res, next, id) => {
    try {
        let data = await health_record.findByPk(id)
        if (data) {
            next()
        } else {
            throw new Error("Health record not found.")
        }
    } catch (err) {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            err.message? err.message: "Something went wrong. Please try again.",
            req,
        )
    }
}

exports.createHealthrecord = async (req, res) => {
    let t = await sequelize.transaction()
    try {
        req.body.patient_id = req.profile.id
        let data = await health_record.create(req.body, {transaction: t})
        if (data) {
            await t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Health record created successfully."
            )
        } else {
            await t.rollback()
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Failed to create health record.",
                req
            )
        }
    } catch (err) {
        await t.rollback()
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while creating health record.",
            req
        )
    }
}

exports.updateHealthrecord = async (req, res) => {
    let t = await sequelize.transaction()
    try {
        let data = await health_record.update(req.body, {where: {id: req.params.healthRecordId}}, {transaction: t})
        if (data[0] != 0) {
            t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Health record updated Succesfully"
            )
        } else {
            t.rollback()
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Failed to Update Health record.",
                req
            )
        }
    } catch(err) {
        t.rollback()
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while updating health record.",
            req
        )
    }
}

exports.getHealthRecordAll = async (req, res) => {
    try {
        let data = await health_record.findAll({whwre: {patient_id: req.params.healthRecordId}})
        if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Health record fetched successfully"
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Failed to find Health record.",
                req
            )
        }
    } catch(err) {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while fetching health record.",
            req
        )
    }
}

exports.getHealthRecord = async (req, res) => {
    try {
        let data = await health_record.findAll({whwre: {patient_id: req.params.patientId}})
        if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Health record fetched successfully"
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Failed to find Health record.",
                req
            )
        }
    } catch(err) {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while fetching health record.",
            req
        )
    }
}

exports.deleteHealthRecord = async (req, res) => {
    try {
        let data = await health_record.destroy({where: {id: req.params.healthRecordId}})
        if (data[0] != 0) {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Health record delete Succesfully."
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Error while deleting health record.",
                req
            )
        }
    } catch(err) {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while deleting Health record.",
            req
        )
    }
}