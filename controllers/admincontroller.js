const { admin } = require("../models")
const bcrypt = require("bcrypt")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.adminLogin = async (req, res) => {
    await admin.findOne({where: {email: req.body.email }}).then(async user => {
        if (user) {
            if (user.name != "Admin") {
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "You are not admin.",
                    req,
                )
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    jwt.sign({
                        id: user.id,
                        email: user.email,
                    }, process.env.secret , {expiresIn: 360}, (err, token) => {
                        user.token = token
                        user.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                message: "Login Successful",
                                token: token,
                                User: user
                            })
                        })
                        return res.status(200).json({
                            success: true,
                            message: "Login Successful",
                            token: token
                        })
                    });
                } else {
                    return Response.errorResponseWithoutData(
                        res,
                        FAIL,
                        "Invalid Password.",
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


