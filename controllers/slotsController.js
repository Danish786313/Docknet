const { slottime } = require("../models")
const moment = require("moment")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.getSlots = async (req, res, next, id) => {
    await slottime.findByPk(id).then(slots => {
        if(slots){
            req.slots = slots;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "slot does not exists."
        })
    })
}

exports.createslots = async (req, res) => {
    try {
        let start = moment(req.body.start, ['h:m a', 'H:m'])
        let end = moment(req.body.end, ['h:m a', 'H:m'])
        let slots = []
        while (true) { 
            if (start.isBefore(end)) {
                slots.push(start.format('HH:mm'))
                start.add(parseInt(req.body.period), 'm')
            } else {
                slots.push(start.format('HH:mm'))
                break
            }
        }
        post = {
            docter_id : req.profile.id,
            start: moment(req.body.start, ['h:m', 'H:m']).format(),
            end: moment(req.body.end, ['h:m', 'H:m']).format(),
            slots: slots,
        }
        let data = await slottime.create(post)
        if (data) {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "SuccessFully creaed slot.",
                req
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Error while creating slot.",
                req,
            )
        }
    } catch (err) {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Somethoong went wrong while creating slot.",
            req,
        )
    }
}

exports.findAll = async (req, res) => {
    try {
        let data = await slottime.findAll({ where: {docter_id: req.profile.id}})
        if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "SuccessFully fetched slots"
            )
        }
    } catch (err) {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Somethoong went wrong while creating slot.",
            req,
        )
    }
}

exports.updateSlots = async (req, res) => {
    try {
        let result = await slottime.update(req.body, {where: {id: req.params.id}})
        if (result.length != "0") {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Slot updated successfully."
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Error while updating slot.",
                req,
            )
        }
    } catch (err) {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Somethoong went wrong while updating slot.",
            req,
        )
    }
};


exports.deleteSlots = async (req, res) => {
    try {
        let result = await slottime.destroy({where: {id: req.params.slotId}})
        if (result.length != "0") {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Slot Deleted successfully."
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Error while deleting slot.",
                req,
            )
        }
    } catch (err) {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while deleting slot.",
            req,
        )
    }
}