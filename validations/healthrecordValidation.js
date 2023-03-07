const { body } = require('express-validator');

exports.createHealthRecordValidation = (req, res) => {
    return [
        body('fullName', "name is required").notEmpty().trim(),
        body('DOB', "name is required").notEmpty().isDate().trim(),
        body('gender', "name is required").notEmpty().isIn(["Male", "Female"]).trim(),
        body('consent', "name is required").notEmpty().isBoolean().trim(),
        body('shareRecord', "name is required").notEmpty().isBoolean().trim(),
        body("emergency_contact").custom(async (value, {req}) => {
            if (!value.name) {
                return Promise.reject('Emergency person name is required')
            }
            if (!value.number) {
                return Promise.reject('Emergency number is required')
            }
            if (!value.relationship) {
                return Promise.reject('Emergency relationship is required')
            }
        }).isObject().notEmpty(),
        body("health_metrics").custom(async (value, {req}) => {
            if (!value.blod_type) {
                return Promise.reject('blood group is required')
            }
            if (!value.height) {
                return Promise.reject('Height is required')
            }
            if (!value.weight) {
                return Promise.reject('Weight is required')
            }
        }).isObject().notEmpty(),
        body("drug_allergies").custom(async (value, {req}) => {
            if (!value.any_allergy) {
                return Promise.reject('Drug allergy is required')
            } else {
                if (!value.allergy_name) {
                    return Promise.reject('Allergy name is required')
                }
            }
        }).isObject().notEmpty(),
        body("other_allergies").custom(async (value, {req}) => {
            if (!value.any_other_allergy) {
                return Promise.reject('Other allergy is required')
            } else {
                if (!value.allergy_name) {
                    return Promise.reject('Allergy name is required')
                }
            }
        }).isObject().notEmpty(),
        body("vaccination").custom(async (value, {req}) => {
            if (!value.any_vaccine) {
                return Promise.reject('Vaccine information is required')
            } else {
                if (!value.vaccine_name) {
                    return Promise.reject('Vaccine name is required')
                }
            }
        }).isObject().notEmpty(),
        body("diseases").custom(async (value, {req}) => {
            if (!value.any_disease) {
                return Promise.reject('Deseas information is required')
            } else {
                if (!value.deseas_name) {
                    return Promise.reject('Deseas name is required')
                }
            }
        }).isObject().notEmpty(),
        body("medication").custom(async (value, {req}) => {
            if (!value.any_medication) {
                return Promise.reject('Medication information is required')
            } else {
                if (!value.medication_name) {
                    return Promise.reject('Medication name is required')
                }
            }
        }).isObject().notEmpty(),
        body('smoking', "name is required").notEmpty().isBoolean().trim(),
        body('drinking_alcohol', "drinking alcohol is required").notEmpty().isBoolean().trim(),
    ]
}

exports.updateHealthRecordValidation = (req, res) => {
    return [
        body('fullName', "name is required").notEmpty().trim().optional(),
        body('DOB', "name is required").notEmpty().isDate().trim().optional(),
        body('gender', "name is required").notEmpty().isIn(["Male", "Female"]).trim().optional(),
        body('consent', "name is required").notEmpty().isBoolean().trim().optional(),
        body('shareRecord', "name is required").notEmpty().isBoolean().trim().optional(),
        body("emergency_contact").custom(async (value, {req}) => {
            if (!value.name) {
                return Promise.reject('Emergency person name is required')
            }
            if (!value.number) {
                return Promise.reject('Emergency number is required')
            }
            if (!value.relationship) {
                return Promise.reject('Emergency relationship is required')
            }
        }).isObject().notEmpty().optional(),
        body("health_metrics").custom(async (value, {req}) => {
            if (!value.blod_type) {
                return Promise.reject('blood group is required')
            }
            if (!value.height) {
                return Promise.reject('Height is required')
            }
            if (!value.weight) {
                return Promise.reject('Weight is required')
            }
        }).isObject().notEmpty().optional(),
        body("drug_allergies").custom(async (value, {req}) => {
            if (!value.any_allergy) {
                return Promise.reject('Drug allergy is required')
            } else {
                if (!value.allergy_name) {
                    return Promise.reject('Allergy name is required')
                }
            }
        }).isObject().notEmpty().optional(),
        body("other_allergies").custom(async (value, {req}) => {
            if (!value.any_other_allergy) {
                return Promise.reject('Other allergy is required')
            } else {
                if (!value.allergy_name) {
                    return Promise.reject('Allergy name is required')
                }
            }
        }).isObject().notEmpty().optional(),
        body("vaccination").custom(async (value, {req}) => {
            if (!value.any_vaccine) {
                return Promise.reject('Vaccine information is required')
            } else {
                if (!value.vaccine_name) {
                    return Promise.reject('Vaccine name is required')
                }
            }
        }).isObject().notEmpty().optional(),
        body("diseases").custom(async (value, {req}) => {
            if (!value.any_disease) {
                return Promise.reject('Deseas information is required')
            } else {
                if (!value.deseas_name) {
                    return Promise.reject('Deseas name is required')
                }
            }
        }).isObject().notEmpty().optional(),
        body("medication").custom(async (value, {req}) => {
            if (!value.any_medication) {
                return Promise.reject('Medication information is required')
            } else {
                if (!value.medication_name) {
                    return Promise.reject('Medication name is required')
                }
            }
        }).isObject().notEmpty().optional(),
        body('smoking', "name is required").notEmpty().isBoolean().trim().optional(),
        body('drinking_alcohol', "drinking alcohol is required").notEmpty().isBoolean().trim().optional(),
    ]
}