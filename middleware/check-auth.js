const { docter, patient, docterInfo } = require("../models")
const jwt = require("jsonwebtoken")

exports.getLogedInUser =  async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const token = req.headers.authorization.split(" ")[1]
        let decodedToken
        try {
            decodedToken = jwt.verify(token, process.env.secret)
        } catch(e) {
            return res.send({
              message: "Invalid token provided"
            })
        }
        await docter.findOne({ where : {id : decodedToken.id }, include: [{model: docterInfo}]}).then(user => {
            if(user){
              req.profile = user
              next()
            } else {
              res.json({
                message : "user does not exist"
              })
            }
            }).catch()
    } else {
      return res.send({
        message : "Please provide a Access token"
      })
    }
}

exports.getLogedInPatient =  async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      const token = req.headers.authorization.split(" ")[1]
      let decodedToken
      try {
          decodedToken = jwt.verify(token, process.env.secret)
      } catch(e) {
          return res.send({
            message: "Invalid token provided"
          })
      }
      await patient.findOne({ where : {id : decodedToken.id }}).then(user => {
          if(user){
            req.profile = user
            next()
          } else {
            res.json({
              message : "user does not exist"
            })
          }
          }).catch()
  } else {
    return res.send({
      message : "Please provide a Access token"
    })
  }
}

