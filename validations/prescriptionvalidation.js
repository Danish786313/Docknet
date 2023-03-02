const { body } = require('express-validator');
const { prescription_setting } = require('../models')

exports.prescriptionCreate = (req, res) => {
    return [
        body('docter').custom(async (value, {req}) => {
            return await prescription_setting.findOne({ where: { docter_id: req.profile.id }, raw: true }).then(prescription => {
                if (prescription) {
                  return Promise.reject('You already have created prescription')
                }
            })
        }),
        body("logo").custom(async (value, {req}) => {
            if (req.body.logo.required || req.body.logo.required == true){
                if (!req.body.logo.horizonAlign){
                    return Promise.reject("Logo Horizontal align is required")
                }
                if (!req.body.logo.verticalAlign){
                    return Promise.reject("Logo Vertical align is required")
                }
                if (!req.body.logo.width){
                    return Promise.reject("Logo Width is required")
                }
                if (!req.body.logo.height){
                    return Promise.reject("Logo heigth is required")
                }
            } else {
                return Promise.reject("'Required' field is required in logo")
            }
        }).notEmpty().isObject(),
        body("name").custom(async (value, {req}) => {
            if (req.body.name.required || req.body.name.required == true){
                if (!req.body.name.fullName) {
                    return Promise.reject("Name is required")
                }
                if (!req.body.name.color){
                    return Promise.reject("Name Color is required")
                }
                if (!req.body.name.font){
                    return Promise.reject("Name Font is required")
                }
                if (!req.body.name.width){
                    return Promise.reject("Name Width is required")
                }
                if (!req.body.name.height){
                    return Promise.reject("Name heigth is required")
                }
                if (!req.body.name.fontSize){
                    return Promise.reject("Name FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in name")
            }
        }).isObject(),
        body("speciality").custom(async (value, {req}) => {
            if (req.body.speciality.required || req.body.speciality.required == true){
                if (!req.body.speciality.speciality) {
                    return Promise.reject("Speciality is required")
                }
                if (!req.body.speciality.color){
                    return Promise.reject("Speciality Color is required")
                }
                if (!req.body.speciality.font){
                    return Promise.reject("Speciality Font is required")
                }
                if (!req.body.speciality.width){
                    return Promise.reject("Speciality Width is required")
                }
                if (!req.body.speciality.height){
                    return Promise.reject("Speciality heigth is required")
                }
                if (!req.body.speciality.fontSize){
                    return Promise.reject("Speciality FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in speciality")
            }
        }).isObject(),
        body("cname").custom(async (value, {req}) => {
            if (req.body.cname.required || req.body.cname.required == true){
                if (!req.body.cname.cname) {
                    return Promise.reject("CName is required")
                }
                if (!req.body.cname.color){
                    return Promise.reject("CName Color is required")
                }
                if (!req.body.cname.font){
                    return Promise.reject("CName Font is required")
                }
                if (!req.body.cname.width){
                    return Promise.reject("CName Width is required")
                }
                if (!req.body.cname.height){
                    return Promise.reject("CName heigth is required")
                }
                if (!req.body.cname.fontSize){
                    return Promise.reject("CName FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in CName")
            }
        }).isObject(),
        body("address").custom(async (value, {req}) => {
            if (req.body.address.required || req.body.address.required == true){
                if (!req.body.address.address) {
                    return Promise.reject("Address is required")
                }
                if (!req.body.address.color){
                    return Promise.reject("Address Color is required")
                }
                if (!req.body.address.font){
                    return Promise.reject("Address Font is required")
                }
                if (!req.body.address.width){
                    return Promise.reject("Address Width is required")
                }
                if (!req.body.address.height){
                    return Promise.reject("Address heigth is required")
                }
                if (!req.body.address.fontSize){
                    return Promise.reject("Address FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Address")
            }
        }).isObject(),
        body("email").custom(async (value, {req}) => {
            if (req.body.email.required || req.body.email.required == true){
                if (!req.body.email.email) {
                    return Promise.reject("Email is required")
                }
                if (!req.body.email.color){
                    return Promise.reject("Email Color is required")
                }
                if (!req.body.email.font){
                    return Promise.reject("Email Font is required")
                }
                if (!req.body.email.width){
                    return Promise.reject("Email Width is required")
                }
                if (!req.body.email.height){
                    return Promise.reject("Email heigth is required")
                }
                if (!req.body.email.fontSize){
                    return Promise.reject("Email FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Email")
            }
        }).isObject(),
        body("phone").custom(async (value, {req}) => {
            if (req.body.phone.required || req.body.phone.required == true){
                if (!req.body.phone.phone) {
                    return Promise.reject("Phone is required")
                }
                if (!req.body.phone.color){
                    return Promise.reject("Phone Color is required")
                }
                if (!req.body.phone.font){
                    return Promise.reject("Phone Font is required")
                }
                if (!req.body.phone.fontSize){
                    return Promise.reject("Phone FontSize is required")
                }
                if (!req.body.phone.width){
                    return Promise.reject("Phone Width is required")
                }
                if (!req.body.phone.height){
                    return Promise.reject("Phone heigth is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Phone")
            }
        }).isObject(),
        body("signature").custom(async (value, {req}) => {
            if (req.body.signature.required || req.body.signature.required == true){
                if (!req.body.signature.horizonAlign){
                    return Promise.reject("Signature Horizon align is required")
                }
                if (!req.body.signature.verticalAlign){
                    return Promise.reject("Signature Vertical align is required")
                }
                if (!req.body.signature.width){
                    return Promise.reject("Signature Width is required")
                }
                if (!req.body.signature.height){
                    return Promise.reject("Signature heigth is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Phone")
            }
        }).isObject(),
        body("qrcode").custom(async (value, {req}) => {
            if (!req.body.qrcode.horizonAlign){
                return Promise.reject("Qrcode Horizon align is required")
            }
            if (!req.body.qrcode.verticalAlign){
                return Promise.reject("Qrcode Vertical align is required")
            }
            if (!req.body.qrcode.width){
                return Promise.reject("Qrcode Width is required")
            }
            if (!req.body.qrcode.height){
                return Promise.reject("Qrcode heigth is required")
            }
        }).isObject(),
        body("title").custom(async (value, {req}) => {
            if (!req.body.title.width){
                return Promise.reject("Title width align is required")
            }
            if (!req.body.title.height){
                return Promise.reject("Title height align is required")
            }
            if (!req.body.title.color){
                return Promise.reject("Title color is required")
            }
            if (!req.body.title.font){
                return Promise.reject("Title font is required")
            }
            if (!req.body.title.fontSize){
                return Promise.reject("Title fontSize is required")
            }
        }).isObject(),
        body("line").custom(async (value, {req}) => {
            if (!req.body.line.height){
                return Promise.reject("Line height align is required")
            }
            if (!req.body.line.start){
                return Promise.reject("Line start align is required")
            }
            if (!req.body.line.end){
                return Promise.reject("Line end align is required")
            }
            if (!req.body.line.color){
                return Promise.reject("Line color is required")
            }
        }).isObject(),
        body("description").custom(async (value, {req}) => {
            // if (req.body.description.descriptionNote.length >= 1200) {
            //     return Promise.reject("Description Note note length is too long")
            // }
            if (!req.body.description.width){
                return Promise.reject("Description width required")
            }
            if (!req.body.description.height){
                return Promise.reject("Description height is required")
            }
            if (!req.body.description.color){
                return Promise.reject("Description color is required")
            }
            if (!req.body.description.font){
                return Promise.reject("Description font is required")
            }
            if (!req.body.description.fontSize){
                return Promise.reject("Description fontSize is required")
            }
        }).isObject(),
        body("date").custom(async (value, {req}) => {
            if (!req.body.date.width){
                return Promise.reject("Date is required")
            } 
            if (!req.body.date.height) {
                return Promise.reject("Date height is required")
            }
            if (!req.body.date.color){
                return Promise.reject("Date color required")
            }
            if (!req.body.date.font){
                return Promise.reject("Date font required")
            }
            if (!req.body.date.fontSize){
                return Promise.reject("Date fontSize required")
            }
        }).isObject(),
        body("patient").custom(async (value, {req}) => {
            if (!req.body.patient.width){
                return Promise.reject("Patient name width is required")
            } 
            if (!req.body.patient.height) {
                return Promise.reject("Patient name height is required")
            }
            if (!req.body.patient.color){
                return Promise.reject("Patient name color required")
            }
            if (!req.body.patient.font){
                return Promise.reject("Patient name font required")
            }
            if (!req.body.patient.fontSize){
                return Promise.reject("Patient name fontSize required")
            }
        }).isObject(),
    ]
}

exports.getPrescription = (req, res) => {
    return [
        body('patient', "Patient name is reuired").notEmpty(),
        body('description', "Description is reuired").notEmpty(),
        body('title', "Title is reuired").notEmpty().isLength({ min: 0, max: 1200 }),
        body('file').custom(async (value, {req}) => {
            if (!req.files.qrCode) {
                return Promise.reject("QR code is required")
            }      
        }),
    ]
}

exports.updatePrescriptionValidation = (req, res) => {
    return [
        body("logo").custom(async (value, {req}) => {
            if (req.body.logo.required || req.body.logo.required == true){
                if (!req.body.logo.horizonAlign){
                    return Promise.reject("Logo Horizontal align is required")
                }
                if (!req.body.logo.verticalAlign){
                    return Promise.reject("Logo Vertical align is required")
                }
                if (!req.body.logo.width){
                    return Promise.reject("Logo Width is required")
                }
                if (!req.body.logo.height){
                    return Promise.reject("Logo heigth is required")
                }
            } else {
                return Promise.reject("'Required' field is required in logo")
            }
        }).notEmpty().isObject(),
        body("name").custom(async (value, {req}) => {
            if (req.body.name.required || req.body.name.required == true){
                if (!req.body.name.fullName) {
                    return Promise.reject("Name is required")
                }
                if (!req.body.name.color){
                    return Promise.reject("Name Color is required")
                }
                if (!req.body.name.font){
                    return Promise.reject("Name Font is required")
                }
                if (!req.body.name.width){
                    return Promise.reject("Name Width is required")
                }
                if (!req.body.name.height){
                    return Promise.reject("Name heigth is required")
                }
                if (!req.body.name.fontSize){
                    return Promise.reject("Name FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in name")
            }
        }).isObject(),
        body("speciality").custom(async (value, {req}) => {
            if (req.body.speciality.required || req.body.speciality.required == true){
                if (!req.body.speciality.speciality) {
                    return Promise.reject("Speciality is required")
                }
                if (!req.body.speciality.color){
                    return Promise.reject("Speciality Color is required")
                }
                if (!req.body.speciality.font){
                    return Promise.reject("Speciality Font is required")
                }
                if (!req.body.speciality.width){
                    return Promise.reject("Speciality Width is required")
                }
                if (!req.body.speciality.height){
                    return Promise.reject("Speciality heigth is required")
                }
                if (!req.body.speciality.fontSize){
                    return Promise.reject("Speciality FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in speciality")
            }
        }).isObject(),
        body("cname").custom(async (value, {req}) => {
            if (req.body.cname.required || req.body.cname.required == true){
                if (!req.body.cname.cname) {
                    return Promise.reject("CName is required")
                }
                if (!req.body.cname.color){
                    return Promise.reject("CName Color is required")
                }
                if (!req.body.cname.font){
                    return Promise.reject("CName Font is required")
                }
                if (!req.body.cname.width){
                    return Promise.reject("CName Width is required")
                }
                if (!req.body.cname.height){
                    return Promise.reject("CName heigth is required")
                }
                if (!req.body.cname.fontSize){
                    return Promise.reject("CName FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in CName")
            }
        }).isObject(),
        body("address").custom(async (value, {req}) => {
            if (req.body.address.required || req.body.address.required == true){
                if (!req.body.address.address) {
                    return Promise.reject("Address is required")
                }
                if (!req.body.address.color){
                    return Promise.reject("Address Color is required")
                }
                if (!req.body.address.font){
                    return Promise.reject("Address Font is required")
                }
                if (!req.body.address.width){
                    return Promise.reject("Address Width is required")
                }
                if (!req.body.address.height){
                    return Promise.reject("Address heigth is required")
                }
                if (!req.body.address.fontSize){
                    return Promise.reject("Address FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Address")
            }
        }).isObject(),
        body("email").custom(async (value, {req}) => {
            if (req.body.email.required || req.body.email.required == true){
                if (!req.body.email.email) {
                    return Promise.reject("Email is required")
                }
                if (!req.body.email.color){
                    return Promise.reject("Email Color is required")
                }
                if (!req.body.email.font){
                    return Promise.reject("Email Font is required")
                }
                if (!req.body.email.width){
                    return Promise.reject("Email Width is required")
                }
                if (!req.body.email.height){
                    return Promise.reject("Email heigth is required")
                }
                if (!req.body.email.fontSize){
                    return Promise.reject("Email FontSize is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Email")
            }
        }).isObject(),
        body("phone").custom(async (value, {req}) => {
            if (req.body.phone.required || req.body.phone.required == true){
                if (!req.body.phone.phone) {
                    return Promise.reject("Phone is required")
                }
                if (!req.body.phone.color){
                    return Promise.reject("Phone Color is required")
                }
                if (!req.body.phone.font){
                    return Promise.reject("Phone Font is required")
                }
                if (!req.body.phone.fontSize){
                    return Promise.reject("Phone FontSize is required")
                }
                if (!req.body.phone.width){
                    return Promise.reject("Phone Width is required")
                }
                if (!req.body.phone.height){
                    return Promise.reject("Phone heigth is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Phone")
            }
        }).isObject(),
        body("signature").custom(async (value, {req}) => {
            if (req.body.signature.required || req.body.signature.required == true){
                if (!req.body.signature.horizonAlign){
                    return Promise.reject("Signature Horizon align is required")
                }
                if (!req.body.signature.verticalAlign){
                    return Promise.reject("Signature Vertical align is required")
                }
                if (!req.body.signature.width){
                    return Promise.reject("Signature Width is required")
                }
                if (!req.body.signature.height){
                    return Promise.reject("Signature heigth is required")
                }
            } else {
                return Promise.reject("'Required' field is required in Phone")
            }
        }).isObject(),
        body("qrcode").custom(async (value, {req}) => {
            if (!req.body.qrcode.horizonAlign){
                return Promise.reject("Qrcode Horizon align is required")
            }
            if (!req.body.qrcode.verticalAlign){
                return Promise.reject("Qrcode Vertical align is required")
            }
            if (!req.body.qrcode.width){
                return Promise.reject("Qrcode Width is required")
            }
            if (!req.body.qrcode.height){
                return Promise.reject("Qrcode heigth is required")
            }
        }).isObject(),
        body("title").custom(async (value, {req}) => {
            if (!req.body.title.width){
                return Promise.reject("Title width align is required")
            }
            if (!req.body.title.height){
                return Promise.reject("Title height align is required")
            }
            if (!req.body.title.color){
                return Promise.reject("Title color is required")
            }
            if (!req.body.title.font){
                return Promise.reject("Title font is required")
            }
            if (!req.body.title.fontSize){
                return Promise.reject("Title fontSize is required")
            }
        }).isObject(),
        body("line").custom(async (value, {req}) => {
            if (!req.body.line.height){
                return Promise.reject("Line height align is required")
            }
            if (!req.body.line.start){
                return Promise.reject("Line start align is required")
            }
            if (!req.body.line.end){
                return Promise.reject("Line end align is required")
            }
            if (!req.body.line.color){
                return Promise.reject("Line color is required")
            }
        }).isObject(),
        body("description").custom(async (value, {req}) => {
            // if (req.body.description.descriptionNote.length >= 1200) {
            //     return Promise.reject("Description Note note length is too long")
            // }
            if (!req.body.description.width){
                return Promise.reject("Description width required")
            }
            if (!req.body.description.height){
                return Promise.reject("Description height is required")
            }
            if (!req.body.description.color){
                return Promise.reject("Description color is required")
            }
            if (!req.body.description.font){
                return Promise.reject("Description font is required")
            }
            if (!req.body.description.fontSize){
                return Promise.reject("Description fontSize is required")
            }
        }).isObject(),
        body("date").custom(async (value, {req}) => {
            if (!req.body.date.width){
                return Promise.reject("Date is required")
            } 
            if (!req.body.date.height) {
                return Promise.reject("Date height is required")
            }
            if (!req.body.date.color){
                return Promise.reject("Date color required")
            }
            if (!req.body.date.font){
                return Promise.reject("Date font required")
            }
            if (!req.body.date.fontSize){
                return Promise.reject("Date fontSize required")
            }
        }).isObject(),
        body("patient").custom(async (value, {req}) => {
            if (!req.body.patient.width){
                return Promise.reject("Patient name width is required")
            } 
            if (!req.body.patient.height) {
                return Promise.reject("Patient name height is required")
            }
            if (!req.body.patient.color){
                return Promise.reject("Patient name color required")
            }
            if (!req.body.patient.font){
                return Promise.reject("Patient name font required")
            }
            if (!req.body.patient.fontSize){
                return Promise.reject("Patient name fontSize required")
            }
        }).isObject(),
    ]
}