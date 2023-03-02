const { speciality } = require('../models')
const { Op } = require("sequelize");
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.getspeciality = async (req, res, next, id) => {
    await speciality.findByPk(id).then(speciality => {
        if(speciality){
            req.speciality = speciality;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "speciality does not exists."
        })
    })
}

exports.create = async (req, res) => {
    try {
        let data = await speciality.create(req.body)
        if (data) {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Specility created successfully",
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Error while creating speciality.",
                req,
            )
        }
    } catch (err) {
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while creating the speciality",
            req,
        )
    }
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "speciality fetched successfully.",
            result: req.specialitys
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching speciality.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    try {
        let where = {}
        const { searchText } = req.query;
        if (searchText) {
            where = {
                speciality: {
                    [Op.like]: `%${searchText}%`
                }
            }
        } 
        let data = await speciality.findAndCountAll({ where, attributes: ["id", "speciality", "commission"]})
        if (data) {
            return Response.successResponseData(
                res,
                data.rows,
                SUCCESS,
                "Speciality fetched successfully"
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Speciality does not exist.",
                req,
            )
        }
    } catch (error) {
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong while fetching speciality.",
            req,
        )
    }
}


exports.update = async (req, res) => {
    await speciality.update(req.body, {where: {id: req.params.specialityId}})
    .then(speciality => {
        res.status(200).json({
            success: true,
            message: "speciality updated successfully",
            result: speciality
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing speciality",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await speciality.destroy({where: {id: req.params.specialityId}})
    .then(speciality => {
        res.status(200).json({
            success: true,
            message: "speciality deleted successfully",
            result: speciality
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting speciality",
            Error: error
        })
    })
}