const { query } = require('express-validator');
const { docter, patient } = require("../models");
const { Op } = require("sequelize");

exports.profileApproveValidation = (req, res) => {
    return [
        query('email', 'Email is required').notEmpty().isEmail(),
        query('aprove', 'aprove is required').notEmpty().isBoolean(),
        query('email').custom(async (value, {req}) => {
            return await docter.findOne({ where: { email: value }, raw: true }).then(docter => {
              req.data = docter
              if (docter) {
                if (docter.is_aprove == JSON.parse(req.query.aprove)) {
                    return Promise.reject(`You have already Done ${req.query.aprove} of this user.`)
                }
              } else {
                Promise.reject("Email does not exist.")
              }
            })
        }),
    ]
}