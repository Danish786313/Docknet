const { bankdetail, docter } = require('../models')
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.getbankdetails = async (req, res, next, id) => {
    await bankdetail.findByPk(id, {
        include: [{ model: docter, attributes: ['id', 'fullName'] }],
    }).then(bankdetails => {
        if(bankdetails){
            req.bankdetails = bankdetails;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "bank Details does not exists.",
            req,
        )
    })
}

exports.create = async (req, res) => {
    req.body.docter_id = req.profile.id
    await bankdetail.create(req.body).then(bankdetail => {
        return Response.successResponseWithoutData(
            res,
            SUCCESS,
            "bankdetail added successfully.",
            req
        )
    }).catch(error => {
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "omething went wrong while adding the bankdetail.",
            req,
        )
    })
}

exports.findOne = async (req, res) => {
    await bankdetail.findOne({where: {docter_id: req.profile.id}}).then(data => {
        if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "bankdetail found successfullysdd",
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Bank details does not exist",
                req,
            )
        }      
    }).catch(err => {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while finding the bank details.",
            req,
        )
    })
}

exports.update = async (req, res) => {
    await bankdetail.update(req.body, {where: {id: req.params.bankId}}).then(bankdetail => {
        if (bankdetail[0] != 0) {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "bankdetail updated successfully.",
                req
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Please provide atlest one field to update.",
                req,
            )
        }
    }).catch(error => {
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while updating the bank details.",
            req,
        )
    })
}

exports.delete = async (req, res) => {
    await bankdetail.destroy({where: {id: req.params.bankId}}).then(bankdetail => {
        return Response.successResponseWithoutData(
            res,
            SUCCESS,
            "bankdetail deleted successfully.",
            req
        )
    }).catch(error => {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while deleting bankdetails.",
            req,
        )
    })
}