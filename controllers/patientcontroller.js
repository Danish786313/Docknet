const { patient, sequelize } = require('../models')
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.findOne = async (req, res) => {
    try {
       let data = await patient.findOne({where: {id: req.profile.id}})
       if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Patient fetched successfully"
            )
       } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Error while fetching the patient",
                req
            )
       }
    }
    catch (error) {
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while fetching the patient",
            req
        )
    }
}

exports.update = async (req, res) => {
    console.log(req.body)
    const t = await sequelize.transaction();
    try {
        req.file ? req.body.profilePicture = req.file.filename: null
        let result = await patient.update(req.body, {where: {id: req.profile.id}}, {transaction: t})
        if (result[0] != "0") {
            t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Docter profile updated successfully"
            )
        } else {
            t.rollback()
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Please provide atleast one field to update.",
                req
            )
        }
    } catch (error) {
        t.rollback()
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while updating the patient",
            req
        )
    }
}

exports.delete = async (req, res) => {
    try {
        let result = await patient.destroy({where: {id: req.profile.id}})
        if (result.length != "0") {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Patient profile deleted successfully."
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Something went wrong. while deleting patient profile.",
                req,
            )
        }
    } catch (error) {
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong. while deleting patient profile.",
            req,
        )
    }   
}

exports.findAll = async (req, res) => {
    await patient.findAll()
    .then(patient => {
        if(patient.length){
            res.status(200).json({
                success: true,
                message: 'All patients fetched successfully',
                result: patient
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No patients found',
                result: patient
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching patient',
                Error: error
            })
        })
}