const { bankdetail, docter } = require('../models')

exports.create = async (req, res) => {
    req.body.docter_id = req.profile.id
    await bankdetail.create(req.body).then(bankdetail => {
        res.status(200).json({
            success: true,
            message: 'bankdetail added successfully',
            result: bankdetail
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: 'Something went wrong while adding the bankdetail',
            Error: error 
        })
    })
}

exports.findOne = async (req, res) => {
    await bankdetail.findOne({include: [{ 
        model: docter,
        attributes: ['id', 'fullName']
     }]}).then(bankdetails => {
        res.status(200).json({
            message: 'bankdetail fetched successfully',
            result: bankdetails
        })
    }).catch(err => {
        res.status(400).json({
            message: "Something went wrong while",
            result: err.message
        })
    })
}

exports.findAll = async (req, res) => {
    await bankdetail.findAll()
    .then(bankdetail => {
        if(bankdetail.length){
            res.status(200).json({
                success: true,
                message: 'All bankdetails fetched successfully',
                result: bankdetail
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No bankdetails found',
                result: bankdetail
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching bankdetail',
                Error: error
            })
        })
}


exports.update = async (req, res) => {
    await bankdetail.update(req.body, {where: {docter_id: req.profile.id}}).then(bankdetail => {
        res.status(200).json({
            success: true,
            message: "bankdetail updated successfully",
            result: bankdetail
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing bankdetail",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await bankdetail.destroy({where: {docter_id: req.profile.id}})
    .then(bankdetail => {
        res.status(200).json({
            success: true,
            message: "bankdetail deleted successfully",
            result: bankdetail
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting bankdetail",
            Error: error
        })
    })
}