const { patient, sequelize } = require('../models')

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

exports.create = async (req, res) => {
    post = {
        image: req.file.path,
        link: req.body.link
    }
    await patient.create(post).then(patient => {
        res.status(200).json({
            success: true,
            message: 'patient added successfully',
            result: patient
        })
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while adding the patient',
                Error: error 
            })
        })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "patient fetched successfully.",
            result: req.patient
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching patient.",
            Error: error
        })
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


exports.update = async (req, res) => {
    await patient.update(req.body, {where: {id: req.params.patientId}})
    .then(patient => {
        res.status(200).json({
            success: true,
            message: "patient updated successfully",
            result: patient
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing patient",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await patient.destroy({where: {id: req.params.patientId}})
    .then(patient => {
        res.status(200).json({
            success: true,
            message: "patient deleted successfully",
            result: patient
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting patient",
            Error: error
        })
    })
}


exports.duplicate = async (req, res) => {
    try{
    await sequelize.transaction(async (t) => {
    req.file? req.body.profilePicture = req.file.filename: null
    let duplicate = await patient.create(req.body, {transaction: t})
    if (duplicate) {
        res.status(200).json({
            success: true,
            message: "patient added successfully",
            result: duplicate
        })
    } else {
        throw Error
    }
    });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while adding the patient",
            Error: err.message
        })
    }
}

exports.getDuplicateProfile = async (req, res) => {
    try {
        let duplicate = await patient.findAll({
            include: [{
                model: patient,
                as: 'parent',
                where: 1 //req.profile.id
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









