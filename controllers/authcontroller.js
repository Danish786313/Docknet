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
  await docter.findOne({where: {email: req.body.email }})
  .then(result => {
      if(!result){
          bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(req.body.password, 10, async (err, hash) => {
                  req.body.password = hash
                  req.files? req.body.photo = req.files.profilePicture[0].filename : null
                  const t = await sequelize.transaction();
                      await docter.create(req.body, { transaction: t }).then(async result => {
                          let docs = {
                              docter_id: result.id,
                              logo: req.files.logo[0].filename,
                              licenseFront: req.files.licenseFront[0].filename,
                              licenseBack: req.files.licenseBack[0].filename,
                              identityCardFront: req.files.identityCardFront[0].filename,
                              identityCardBack: req.files.identityCardBack[0].filename,
                              clinicLicenseFront: req.files.clinicLicenseFront[0].filename,
                              clinicLicenceBack: req.files.clinicLicenseBack[0].filename
                          }
                          await docterInfo.create(docs, { transaction: t })
                          try {
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
                                      return res.status(200).json({
                                          message: "Email sent",
                                          Email: email
                                      })
                                  }).catch(async (err) => {
                                      await t.rollback();
                                      return res.status(400).json({
                                          message: "Something went wrong",
                                          error: err
                                      })
                                  });
                              }).catch(async (err) =>  {
                                  await t.rollback();
                                   return res.status(400).json({
                                      message: "Something went wrong",
                                      error: err
                                   })
                              })
                          } catch (err) {
                              await t.rollback();
                              return res.status(400).json({
                                  message: "Something went wrong",
                                  error: err
                              })
                          };
                      })
              })
          }) 
      } else {
          return res.status(400).json({
              message: "Email already exist",
          })
      }
  }).catch(err => {
      return res.status(400).json({
          message : "Something went wrong",
          error: err
      })
  })
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
              return res.status(400).json({
                  success: false,
                  message: "Your account is not approved yet."
              })
          }
          bcrypt.compare(req.body.password, user.password, (err, result) => {
              if (result) {
                  jwt.sign({
                      id: user.id,
                      email: user.email,
                      phone: user.phone
                  }, process.env.secret , {expiresIn: "365d"}, async (err, token) => {
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


exports.signupPatient = async (req, res) => {
    await patient.findOne({where: {email: req.body.email }}).then(async result => {
        if (!result) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, async (err, hash) => {
                    req.body.password = hash;
                    let Otp = Math.floor((Math.random() * 1000000) + 1).toString();
                    req.body.otp = Otp;
                    req.body.isVerified = false;
                    req.file?req.body.profilePicture = req.file.filename: null;
                    const t = await sequelize.transaction();
                    await patient.create(req.body, { transaction: t }).then(async result => { 
                        try {
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
                                          "Successfully Send email to verifying account",
                                          SUCCESS
                                        )
                                    }).catch(async (err) => {
                                        await t.rollback();
                                        return Response.errorResponseWithoutData(
                                            res,
                                            "Something went wrong.",
                                            FAIL
                                        ) 
                                    });
                            }).catch(async (err) =>  {
                                await t.rollback();
                                return Response.errorResponseWithoutData(
                                    res,
                                    "Something went wrong.",
                                    FAIL
                                ) 
                            })
                        } catch (err) {
                                await t.rollback();
                                return Response.errorResponseWithoutData(
                                    res,
                                    "Something went wrong.",
                                    FAIL
                                ) 
                        }
                    }).catch(async (err) => {
                        await t.rollback();
                        return Response.errorResponseWithoutData(
                            res,
                            "Something went wrong.",
                            FAIL
                        )                     
                    })
                })
            })
        }else{
            return Response.errorResponseWithoutData(
                res,
                "Email Already exists",
                FAIL
            )
        }
    })
}


exports.patientLogin = async (req, res) => {
    await patient.findOne({where: {email: req.body.email }}).then(async user => {
        if (user) {
            if (user.isVerified == false) {
                return Response.errorResponseWithoutData(
                    res,
                    "Invalid Password provided",
                    FAIL
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
                                "Successfully Send email to verifying account"
                            )
                      })
                    });
                } else {
                    return Response.errorResponseWithoutData(
                        res,
                        "Invalid Password provided",
                        FAIL
                    )
                }
            });
        } else {
            return Response.errorResponseWithoutData(
                res,
                "Email does not exist",
                FAIL
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
                    
                )
                res.status(200).json({
                    success: true,
                    message: "OTP Verified"
                })
            })
        } else {
            return res.status(400).json({
                message: "Invalid OTP"
            })
        }
    }).catch(err => {
        return res.status(400).json({
            message: "Something went wrong",
            error: err
        })
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
                    res.status(404).json({
                        success: false,
                        message: "Invalid Username Please try With Valid UserName"
                    });
                    return "Mismacth";
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
                        res.status(200).json({
                            success: true,
                            message: "Successfully send reset-password-link mail"
                        })
                    })
                }
          })  
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Failed to reset Password.",
            error: error
        })
    }
}

exports.newPasswordDocter = async (req, res) => {
    try {
        const newPassword = req.body.newPassword
        const otp = req.body.otp
        docter.findOne({ where: { reset_password: otp } }).then(user => {
            if (!user) {
                return res.status(422).json({
                    message: "user reset Otp not existe"
                })
            }
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, 10, async (err, hash) => {
                    // user.reset_password = null
                    user.password = hash
                    user.save().then((saveduser) => {
                        res.json({
                            message: "Password Updated success"
                        })
                    })
                })
            })
        }).catch(err => {
           return Response.errorResponseData(
            res,
            "Failed to send reset-password",
            req
           )
        })
    } catch (err) {
        console.log(err)
        return Response.errorResponseData(
            res,
            "Something went wrong",
            req
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
                      res.status(404).json({
                          success: false,
                          message: "Invalid Username Please try With Valid UserName"
                      });
                      return "Mismacth";
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
                          res.status(200).json({
                              success: true,
                              message: "Successfully send reset-password-link mail"
                          })
                      })
                  }
            })  
          })
      } catch (error) {
          return res.status(400).json({
              success: false,
              message: "Failed to reset Password.",
              error: error
          })
      }
  }
  

  // patient
  exports.newPasswordPatient = async (req, res) => {
      try {
          const newPassword = req.body.newPassword
          const otp = req.body.otp
          patient.findOne({ where: { reset_password: otp } }).then(user => {
              if (!user) {
                  return res.status(422).json({
                      message: "user reset Otp not existe"
                  })
              }
              bcrypt.genSalt(10, (err, salt) => {
                  bcrypt.hash(newPassword, 10, async (err, hash) => {
                      // user.reset_password = null
                      user.password = hash
                      user.save().then((saveduser) => {
                          res.json({
                              message: "Password Updated success"
                          })
                      })
                  })
              })
          }).catch(err => {
             return Response.errorResponseData(
              res,
              "Failed to send reset-password",
              req
             )
          })
      } catch (err) {
          console.log(err)
          return Response.errorResponseData(
              res,
              "Something went wrong",
              req
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