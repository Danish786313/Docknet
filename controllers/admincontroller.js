const { docter, sequelize, patient, docterInfo, admin } = require("../models")
const Mailer = require('../helper/helper')
const bcrypt = require("bcrypt")
var nodemailer = require("nodemailer");
const ejs = require("ejs")
const path = require("path")
const jwt = require("jsonwebtoken")
const moment = require("moment");
const crypto = require("crypto")
const { Op } = require("sequelize");

// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize(/* ... */);
const queryInterface = sequelize.getQueryInterface();


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVICE_HOST,
    port: process.env.SMTP_SERVICE_PORT,
    secure: process.env.SEND_EMAIL,
    auth: {
        user: process.env.SMTP_USER_NAME,
        pass: process.env.SMTP_USER_PASSWORD
    }
});


exports.adminLogin = async (req, res) => {
    await admin.findOne({where: {email: req.body.email }}).then(async user => {
        if (user) {
            if (user.name != "Admin") {
                return res.status(400).json({
                    success: false,
                    message: "You are not super admin"
                })
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({
                        id: user.id,
                        email: user.email,
                    }, process.env.secret , {expiresIn: 360}, (err, token) => {
                        return res.status(200).json({
                            success: true,
                            message: "Login Successful",
                            token: token
                        })
                    });
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid Password"
                    })
                }
            });
        } else {
            return res.status(400).json({
                message: "Email does not exist",
            })
        }
    })
}


