const { speciality } = require('../models')

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
    
    await speciality.create(req.body).then(speciality => {
        res.status(200).json({
            success: true,
            message: 'speciality added successfully',
            result: speciality
        })
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while adding the speciality',
                Error: error 
            })
        })
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
    await speciality.findAll()
    .then(speciality => {
        if(speciality.length){
            res.status(200).json({
                success: true,
                message: 'All specialitys fetched successfully',
                result: speciality
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No specialitys found',
                result: speciality
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching speciality',
                Error: error
            })
        })
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