const { docter, sequelize, patient, docterInfo, admin,  } = require("../models")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")
const bcrypt = require("bcrypt")
var nodemailer = require("nodemailer");
const ejs = require("ejs")
const path = require("path")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const { Op } = require("sequelize");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVICE_HOST,
  port: process.env.SMTP_SERVICE_PORT,
  secure: process.env.SEND_EMAIL,
  auth: {
      user: process.env.SMTP_USER_NAME,
      pass: process.env.SMTP_USER_PASSWORD
  }
});

exports.docterregister = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let reqObj = req.files
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, 10, async (err, hash) => {
                req.body.password = hash
                reqObj.profilePicture?  req.body.photo = req.files.profilePicture[0].filename : null;
                    await docter.create(req.body, { transaction: t }).then(async result => {
                        docs = {}
                        docs.docter_id =  result.id
                        reqObj.logo? docs.logo = req.files.logo[0].filename : null
                        reqObj.licenseFront? docs.licenseFront = req.files.licenseFront[0].filename : null;
                        reqObj.licenseBack? docs.licenseBack = req.files.licenseBack[0].filename : null;
                        reqObj.identityCardFront? docs.identityCardFront = req.files.identityCardFront[0].filename : null;
                        reqObj.identityCardBack? docs.identityCardBack = req.files.identityCardBack[0].filename : null;
                        reqObj.clinicLicenseFront? docs.clinicLicenseFront = req.files.clinicLicenseFront[0].filename : null;
                        reqObj.clinicLicenseBack? docs.clinicLicenceBack = req.files.clinicLicenseBack[0].filename : null;
                        await docterInfo.create(docs, { transaction: t })
                            ejs.renderFile(path.join(__dirname, "../views/approvalmail.ejs"), {
                                name: req.body.fullName,
                            }).then(async template => {
                                transporter.sendMail({
                                    to: process.env.Admin_id,
                                    from: "Docknet",
                                    subject: "Request to approve profile",
                                    html: template
                                }).then(async email => {
                                    await t.commit();
                                    return Response.successResponseWithoutData(
                                        res,
                                        SUCCESS,
                                        "SuccessFully Registerd and Email Have send to admin for profile approval",
                                        req
                                    )
                                }).catch(async (err) => {
                                    await t.rollback();
                                    return Response.errorResponseWithoutData(
                                        res,
                                        FAIL,
                                        "ErrorFully Registerd and Email Have not send to admin Please try again later",
                                        req,
                                    )
                                });
                            }).catch(async (err) =>  {
                                await t.rollback();
                                return Response.errorResponseWithoutData(
                                    res,
                                    FAIL,
                                    "Something went wrong",
                                    req,
                                )
                            })
                    }).catch(async (err) => {
                        await t.rollback();
                        return Response.errorResponseWithoutData(
                            res,
                            FAIL,
                            "Something went wrong",
                            req,
                        )
                    })
            })
        }) 
    } catch (err) {
        console.log(err)
        await t.rollback();
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong",
            req,
        )
    };
}

exports.aproveDocter = async (req, res) => {
    await docter.findOne({where: {email: req.query.email }}).then(async result => {
        if (result) {
            await docter.update({is_aprove: true}, {where: {email: req.query.email}}).then(update => {
                try {
                        ejs.renderFile(path.join(__dirname, "../views/profileaprove.ejs"), {
                          name: result.fullName
                        }).then(async template => {
                                transporter.sendMail({
                                    to: req.query.email,
                                    from: "Docknet",
                                    subject: "Your profile has been approved by Admin",
                                    html: template
                                }).then(async email => {
                                    return res.status(200).json({
                                        message: "Email sent",
                                        Email: email
                                    })
                                }).catch(async (err) => {
                                    return res.status(400).json({
                                        message: "Something went wrong",
                                        error: err
                                    })
                                });
                        }).catch(async (err) =>  { 
                             return res.status(400).json({
                                message: "Something went wrong",
                                error: err
                             })
                        })
                    } catch (err) {
                        return res.status(400).json({
                            success: true,
                            message: "Docter Approved Successfully"
                        })
                    }
            }).catch(err => {
                return res.status(400).json({
                    success: true,
                    message: "Docter Approved Successfully"
                })
            });
        } else {
            return res.status(400).json({
                message: "Email does not exist",
            })
        }
  }).catch(err => {
      return res.status(400).json({
          message: "Email does not exist",
      })
  });
}


exports.docterLogin = async (req, res) => {
    await docter.findOne({where: {email: req.body.email }}).then(async user => {
        if (user) {
            if (user.is_aprove == false) {
              return Response.errorResponseWithoutData(
                  res,
                  FAIL,
                  "You do not have permission to login.",
                  req,
              )
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({
                        id: user.id,
                        email: user.email,
                        phone: user.phone
                    }, process.env.secret , {expiresIn: "365d"}, async (err, token) => {
                        // let data = {}
                        // data = user
                        // data.token = token
                        user.Token = token;
                        await user.save().then((user) => {
                            return res.status(200).json({
                                success: true,
                                message: "Login Successful",
                                token: token,
                                User: user
                            })
                        })
                    });
                } else {
                  return Response.errorResponseWithoutData(
                      res,
                      FAIL,
                      "Invalid password",
                      req,
                  )
                }
            });
        } else {
          return Response.errorResponseWithoutData(
              res,
              FAIL,
              "Email does not exist.",
              req,
          )
        }
    })
}


exports.signupPatient = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, async (err, hash) => {
                req.body.password = hash;
                let Otp = Math.floor((Math.random() * 1000000) + 1).toString();
                req.body.otp = Otp;
                req.body.isVerified = false;
                req.file ? req.body.profilePicture = req.file.filename: null;
                await patient.create(req.body, { transaction: t }).then(async result => { 
                    ejs.renderFile(path.join(__dirname, "../views/verifyOtp.ejs"), {
                            otp: req.body.otp,
                            name: req.body.name,
                        }).then(async template => {
                                transporter.sendMail({
                                    to: req.body.email,
                                    from: "kolonizer",
                                    subject: "Verify Otp",
                                    html: template
                                }).then(async email => {
                                    await t.commit();
                                    return Response.successResponseWithoutData(
                                        res,
                                        SUCCESS,
                                        "An Email have send to your registerd mail id",
                                        req
                                    )
                                }).catch(async (err) => {
                                    await t.rollback();
                                    return Response.errorResponseWithoutData(
                                        res,
                                        FAIL,
                                        "Something went wrong",
                                        req,
                                    )
                                });
                        }).catch(async (err) =>  {
                            await t.rollback();
                            return Response.errorResponseWithoutData(
                                res,
                                FAIL,
                                "Something went wrong",
                                req,
                            )
                        })
                }).catch(async (err) => {
                    await t.rollback();
                    return Response.errorResponseWithoutData(
                        res,
                        FAIL,
                        "Something went wrong",
                        req,
                    )                   
                })
            })
        })
    } catch (err) {
        t.rollback()
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong",
            req,
        )
    }
}


exports.patientLogin = async (req, res) => {
    await patient.findOne({where: {email: req.body.email }}).then(async user => {
        if (user) {
            if (user.isVerified == false) {
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "Please verify your email address.",
                    req,
                )
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({
                        id: user.id,
                        email: user.email,
                        phone: user.phone
                    }, process.env.secret , {expiresIn: "365d"}, (err, token) => {
                        user.Token = token
                        user.save().then(() => {
                            let User = {}
                            User = user
                            User.token = token
                            return Response.successResponseData(
                                res,
                                User,
                                SUCCESS,
                                "Successfully logIn"
                            )
                      })
                    });
                } else {
                    return Response.errorResponseWithoutData(
                        res,
                        FAIL,
                        "Invalid password.",
                        req,
                    )
                }
            });
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Email does not exist.",
                req,
            )
        }
    })
}


exports.verifyOtp = async (req, res) => {
    await patient.findOne({where: { email: req.query.email, otp: req.query.otp}}).then(async otp => {
        if (otp) {
            await patient.update({isVerified: true}, {where :{email: req.query.email}}).then(() => {
                return Response.successResponseWithoutData(
                    res,
                    SUCCESS,
                    "Successfully Verified account",
                    req
                )
            })
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Invalid OTP",
                req,
            )
        }
    }).catch(err => {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong",
            req,
        )
    });
}


exports.changePasswordDocter = async (req, res) => {
  try {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                console.log(err);
            }
            const token = buffer.toString("hex")
            docter.findOne({
              where: {
                  [Op.or]: [
                      { email: req.body.email },
                  ]
              }
           }).then(users => {
                if (!users) {
                    return Response.errorResponseWithoutData(
                        res,
                        FAIL,
                        "Invalid Username Please try With Valid UserName.",
                        req,
                    )
                }
                else {
                    var tokenmon = Math.floor((Math.random() * 1000000) + 1).toString()
                    users.reset_password = tokenmon
                    users.save().then((result) => {
                        ejs.renderFile(path.join(__dirname, "../views/resetPassword.ejs"),
                            {
                                userName: users.name,
                                token: tokenmon,
                                // url: process.env.FRONTEND_BASE_URL
                            })
                            .then(emailTemplate => {
                                transporter.sendMail({
                                    to: users.email,
                                    from: 'kolonizer',
                                    subject: "Password Reset",
                                    html: emailTemplate
                                })
                            })
                            return Response.successResponseWithoutData(
                                res,
                                SUCCESS,
                                "Successfully send reset-password-OTP on mail.",
                                req
                            )
                    })
                }
          })  
        })
    } catch (error) {
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Failed to reset Password.",
            req,
        )
    }
}

exports.newPasswordDocter = async (req, res) => {
    try {
        const newPassword = req.body.newPassword
        const otp = req.body.otp
        docter.findOne({ where: { reset_password: otp } }).then(user => {
            if (!user) {
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "user reset Otp not existe.",
                    req,
                )
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, 10, async (err, hash) => {
                    // user.reset_password = null
                    user.password = hash
                    user.save().then((saveduser) => {
                        return Response.successResponseWithoutData(
                            res,
                            SUCCESS,
                            "Password Updated successfully.",
                            req
                        )
                    })
                })
            })
        }).catch(err => {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Failed to send reset-password.",
                req,
            )
        })
    } catch (err) {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong.",
            req,
        )
    }
}


// patient 
exports.changePasswordPatient = async (req, res) => {
    try {
            crypto.randomBytes(32, (err, buffer) => {
                if (err) {
                    console.log(err);
                }
                const token = buffer.toString("hex")
                patient.findOne({
                  where: {
                      [Op.or]: [
                          { email: req.body.email },
                      ]
                  }
               }).then(users => {
                    if (!users) {
                        return Response.errorResponseWithoutData(
                            res,
                            FAIL,
                            "Invalid Username Please try With Valid UserName",
                            req,
                        )
                    } else {
                        var tokenmon = Math.floor((Math.random() * 1000000) + 1).toString()
                        users.reset_password = tokenmon
                        users.save().then((result) => {
                            ejs.renderFile(path.join(__dirname, "../views/resetPassword.ejs"),
                                {
                                    userName: users.name,
                                    token: tokenmon,
                                    // url: process.env.FRONTEND_BASE_URL
                                })
                                .then(emailTemplate => {
                                    transporter.sendMail({
                                        to: users.email,
                                        from: 'kolonizer',
                                        subject: "Password Reset",
                                        html: emailTemplate
                                    })
                                })
                            return Response.successResponseWithoutData(
                                res,
                                SUCCESS,
                                "Successfully send reset-password-OTP on mail.",
                                req
                            )
                        })
                    }
                })  
            })
        } catch (error) {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Invalid Username Please try With Valid UserName",
                req,
            )
        }
  }
  

exports.newPasswordPatient = async (req, res) => {
    try {
        const newPassword = req.body.newPassword
        const otp = req.body.otp
        patient.findOne({ where: { reset_password: otp } }).then(user => {
            if (!user) {
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "user reset Otp not exist.",
                    req,
                )
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, 10, async (err, hash) => {
                    // user.reset_password = null
                    user.password = hash
                    user.save().then((saveduser) => {
                        return Response.successResponseWithoutData(
                            res,
                            SUCCESS,
                            "Password Updated successfully.",
                            req
                        )
                    })
                })
            })
        }).catch(err => {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Invalid Username Please try With Valid UserName",
                req,
            )
        })
    } catch (err) {
        console.log(err)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong.",
            req,
        )
    }
}


exports.signout = (req, res) => {
    res.cookie("token", '', { expiresIn: "8h" });
    res.clearCookie("token");

    res.json({
        success: true,
        message: "User signout successfully"
    });
}