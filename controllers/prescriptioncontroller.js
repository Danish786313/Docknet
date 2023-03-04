const { SUCCESS, FAIL } = require("../helper/constants");
const { prescription_setting, sequelize } = require("../models")
const Response = require("../helper/response");

exports.getSetting = async (req, res, next, id) => {
    try {
        const data = await prescription_setting.findByPk(id);
        if (data) {
            req.Data = data;
            next();

        } else {
            return Response.errorResponseData(
                res, 
                "prescription setting Does not exist",
                req
            )
        }
    }
    catch (error) {
        return Response.errorResponseData(
            res, 
            "Something went wrong",
            req
        )
    }
}

exports.prescriptionSetting = async (req, res) => {
    const t = await sequelize.transaction()
    try{
        req.body.docter_id = req.profile.id
        let data = await prescription_setting.create(req.body, {transaction: t})
        if (data) {
            t.commit()
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Prescription setting created successfully"
            )
        } else {
            throw new Error("Failed to create")
        }
    } catch(err) {
        t.rollback()
        console.log(err.message)
        return Response.errorResponseData(
            res,
            "Something went wrong",
            req,
        );
    }
}

exports.prescriptionSettingFile = async (req, res) => {
    const t = await sequelize.transaction()
    try{
        req.body.logo_url = req.files.logoImage[0].filename
        req.body.signature_url = req.files.signatureImage[0].filename  
        let data = await prescription_setting.update(req.body, {where:{docter_id: req.profile.id}}, {transaction: t})
        if (data) {
            t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Prescription setting files created successfully"
            )
        } else {
            throw new Error("Failed to create")
        }
    } catch(err) {
        t.rollback()
        console.log(err.message)
        return Response.errorResponseData(
            res,
            "Something went wrong",
            req,
        );
    }
}


exports.getPrescriptionSetting = async (req, res) => {
    try {
        let data = await prescription_setting.findOne({whwre: {docter_id: req.profile.id}})
        if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Prescription feyched successfully"
            )
        } else {
            return Response.errorResponseData(
                res, 
                "Failed to find prescription setting",
                req
            )
        }
    } catch(err) {
        console.log(err)
        return Response.errorResponseData(
            res, 
            "Something went wrong",
            req
        )
    }
};

exports.updatePrescriptionSetting = async (req, res) => {
    let t = await sequelize.transaction()
    try {
        let data = await prescription_setting.update(req.body, {where: {docter_id: req.profile.id}}, {transaction: t})
        if (data[0] != 0) {
            t.commit()
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Prescription setting updated Succesfully"
            )
        } else {
            t.rollback()
            return Response.errorResponseData(
                res, 
                "Failed to Update prescription setting",
                req
            )
        }
    } catch(err) {
        t.rollback()
        console.log(err)
        return Response.errorResponseData(
            res, 
            "Something went wrong",
            req
        )
    }
};

exports.deletePrescriptionSetting = async (req, res) => {
    try {
        let data = await prescription_setting.destroy({where: {id: req.params.prescriptionSettingId}})
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Prescription setting delete Succesfully"
            )
    } catch(err) {
        console.log(err)
        return Response.errorResponseData(
            res, 
            "Something went wrong while deleting prescription setting",
            req
        )
    }
};