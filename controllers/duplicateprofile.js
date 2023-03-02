const { sequelize, patient } = require("../models");
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.duplicateProfile = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        req.body.parent_id = req.profile.id
        req.file ? req.body.profilePicture = req.file.filename : null 
        let result = await patient.create(req.body, { transaction: t })
        if(result) {
            t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Duplicate profile created successfully."
            )
        } else {
            t.rollback()
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Failed to create duplicate profile",
                req
            )
        }
    } catch (err) {
        t.rollback()
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while creating duplicate profile.",
            req
        )
    }
}

exports.getDuplicateProfile = async (req, res) => {
    try {
        let duplicate = await patient.findOne({
            include: [{
                model: patient,
                as: 'child',
                where: req.profile.id
            }
        ]
        })
        if (duplicate.length > 0) {
            res.status(200).json({
                success: true,
                message: "patient fetched successfully.",
                count: duplicate.length,
                result: duplicate
            })
        } else {
            res.status(400).json({
                success: false,
                message: "No patients found",
                result: duplicate
            })
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while fetching patient",
            Error: err.message
        })
    }
}

exports.getpatient = async (req, res, next, id) => {
    await patient.findByPk(id).then(patient => {
        if(patient){
            req.patient = patient;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "patient does not exists."
        })
    })
}