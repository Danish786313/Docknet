const { bankdetail, docter } = require('../models')


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
        return res.status(400).json({
            success: false,
            message: "bank Details does not exists."
        })
    })
}

exports.create = async (req, res) => {
    let bank = await bankdetail.findOne({where: { docter_id: req.profile.id}})
    if (bank) {
        return res.status(201).json({
            message: "bank details already exists"
        })
    }
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
    await bankdetail.findOne({where: {docter_id: req.profile.id}}).then(data => {
        if (data) {
             res.status(200).json({
                message: "bankdetail fetched successfully",
                result: data
            })
        } else {
            throw Error
        }      
    }).catch(err => {
        res.status(400).json({
            message: "Error while feching bankdetails",
            result: err.message
        })
    })
}

exports.update = async (req, res) => {
    await bankdetail.update(req.body, {where: {id: req.params.bankId}}).then(bankdetail => {
        // throw Error
        if (bankdetail[0] != 0) {
            res.status(200).json({
                success: true,
                message: "bankdetail updated successfully",
                result: bankdetail
            })
        } else {
            return Promise.reject("Please provide atlest one field to update")
        }
    }).catch(error => {
        return res.status(400).json({
            success: false,
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await bankdetail.destroy({where: {id: req.params.bankId}}).then(bankdetail => {
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