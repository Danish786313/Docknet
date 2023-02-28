const { availability, slottime } = require("../models")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.CreateAvailability = async (req, res) => {
    req.body.docter_id = req.profile.id
    await availability.create(req.body).then(async (data) => {
        return Response.successResponseData(
            res,
            data,
            SUCCESS,
            "Availability created successfully"
        )
    }).catch((err) => {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while creating the availability",
            req,
        )
    });
}

exports.getAvailability = async (req, res) => {
    await availability.findOne({ where: {docter_id: req.profile.id}}).then((data) => {
        return Response.successResponseData(
            res,
            data,
            SUCCESS,
            "Availability fetched successfully"
        )
    }).catch((err) => {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while fetching the availability",
            req
        )
    })
}

exports.updateAvailability = async (req, res) => {
    await availability.update(req.body, {where: {docter_id: req.profile.id}}).then(data => {
        if (data[0] != 0) {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Availability updated successfully",
                req
            )
        } else {
            return Promise.reject("Please Provide atleast one field to update")
        }
    }).catch(err => {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while updating the availability",
            req
        )
    })
}

exports.deleteAvailability = async (req, res) => {
    await availability.destroy({where: {docter_id: req.profile.id}}).then(() => {
        return Response.successResponseWithoutData(
            res,
            SUCCESS,
            "Availability deleted successfully",
            req
        )
    }).catch((err) => {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while deleting the availability",
            req
        )
    });
};