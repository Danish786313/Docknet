const { validationResult } = require('express-validator')
const Response = require("../helper/response")

exports.validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }

    var extractedErrors = {}
    errors.array().map(err => extractedErrors[err.param]= err.msg )
    return Response.validationErrorResponseData(
        res,
        extractedErrors
    )
    
    // return res.status(422).json({
    //   success:false,
    //   error: extractedErrors,
    // })
    
   
  }