const { slottime, sequelize } = require("../models")
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
        // let start = moment(req.body.start, ['h:m a', 'H:m'])
        // let end = moment(req.body.end, ['h:m a', 'H:m'])
        // let slots = []
        // while (true) { 
        //     if (start.isBefore(end)) {
        //         slots.push(start.format('HH:mm'))
        //         start.add(parseInt(req.body.period), 'm')
        //     } else {
        //         slots.push(start.format('HH:mm'))
        //         break
        //     }
        // }
        // post = {
        //     docter_id : req.profile.id,
        //     start: moment(req.body.start, ['h:m', 'H:m']).format(),
        //     end: moment(req.body.end, ['h:m', 'H:m']).format(),
        //     // slots: slots,
        // }
        post = {
            docter_id : req.profile.id,
            start: moment(req.body.start, ['h:m a', 'H:m']).format(),
            end: moment(req.body.end, ['h:m a', 'H:m']).format()
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
            "Something went wrong while creating slot.",
            req,
        )
    }
}

exports.addTime = async (req, res) => {
    let t = await sequelize.transaction()
    try {
        let time = await slottime.findOne({where: {id: req.params.slotId}})

        // check if time is already in the database
        timeArr = JSON.parse(time.slots)
        for (let i=0; i<=timeArr.length; i++) {
            if (timeArr[i] == req.body.slot){
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "Slot time already exists.",
                    req
                )
            }
        }

        let start = moment(time.start, ['h:m a', 'H:m'])
        let end = moment(time.end, ['h:m a', 'H:m'])
        let slot = moment(req.body.slot, ['h:m a', 'H:m'])
        console.log(start.format('hh:mm'), slot.format('hh:mm'), end.format('hh:mm'))
    
        let slots = []
        console.log(timeArr.push(slot.format('hh:mm')))
        
        if (slot.isSame(slot) || slot.isAfter(start) && slot.isBefore(end)) {
            slots.push(slot.format('hh:mm'))
            timeArr.push(slot.format('hh:mm'))
        }

        let data = await slottime.update(timeArr, {where: {id: req.params.slotId}}, {transaction: t})
        if (data[0] = "0") {
            t.commit()
            Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Time added successfully."
            )
        } else {
            t.rollback()
            Response.errorResponseWithoutData(
                res,
                FAIL,
                "Something went wrong while adding the time slot."
            )
        }
    } catch (err) {
        t.rollback()
        console.log(err)
        Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while adding the time slot."
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