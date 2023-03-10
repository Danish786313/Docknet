const { availability, slottime, sequelize } = require("../models")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.CreateAvailability = async (req, res) => {
    try {
        let user = await availability.findOne({where: {docter_id: req.profile.id}})
        if (!user) {
            req.body.docter_id = req.profile.id
            let result = await availability.create(req.body)
            if (result) {
                return Response.successResponseWithoutData(
                    res,
                    SUCCESS,
                    "Availability created successfully.",
                    req
                )
            } else {
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "Failed to create availability.",
                    req
                )
            }
        } else {
            let result = await availability.update(req.body, {where: {docter_id: req.profile.id}})
            if (result[0] != 0) {
                return Response.successResponseWithoutData(
                    res,
                    SUCCESS,
                    "Availability updated successfully.",
                    req
                )
            } else {
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "Failed to update availability.",
                    req
                )
            }
        }
    } catch (err) {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong.",
            req
        )
    }
}

exports.getAvailability = async (req, res) => {
    try {
        let data =  await availability.findOne({ where: {docter_id: req.profile.id}})
        if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Availability fetched successfully"
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "You have not created availability yet.",
                req
            )
        }
    } catch (err) {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while fetching the availability.",
            req
        )
    }
}

exports.updateAvailability = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let result = await availability.update(req.body, {where: {docter_id: req.profile.id}}, {transaction: t})
        if (result[0] != 0) {
            t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Availability updated successfully",
                req
            )
        } else {
            t.rollback()
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Please Provide atleast one field to update",
                req
            )
        }
    } catch (err) {
        t.rollback()
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while updating the availability",
            req
        )
    }
}

exports.deleteAvailability = async (req, res) => {
    try {
        let result = await availability.destroy({where: {docter_id: req.profile.id}})
        if (result.length != "0") {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Availability deleted successfully",
                req
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Something went wrong while deleting the availability",
                req
            )
        }
    } catch (err) {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while deleting the availability",
            req
        )
    }
};