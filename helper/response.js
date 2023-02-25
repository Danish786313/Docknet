module.exports = {
    /**
     * @description This function use for format success response of rest api
     * @param data
     * @param code
     * @param message
     * @param res
     * @param extras
     * @returns {{data: , meta: {message:, code: *}}}
     */

    successResponseData(res, data, code = 1, message, extras) {
        const response = {
            status: true,
            message: message,
            data,
        }
        if (extras) {
            Object.keys(extras).forEach((key) => {
                if ({}.hasOwnProperty.call(extras, key)) {
                    response[key] = extras[key]
                }
            })
        }
        return res.send(response)
    },

    successResponseWithoutData(res, message, code = 1) {
        const response = {
            status: true,
            message: message,
        }
        return res.status(code).send(response)
    },

    errorResponseWithoutData(res, message, code = 400) {
        const response = {
            status: false,
            message: message,
        }
        return res.status(code).send(response)
    },

    errorResponseData(res, message, req, code = 400) {
        console.log("\x1b[33m%s\x1b[0m", `ERROR [path = ${req.url}], [MESSAGE = ${message}], [CODE = ${code}]`);
        const response = {
            status: false,
            message: message
        }
        return res.status(code).send(response)
    },

    validationErrorResponseData(res, message, code = 400) {
        const response = {
            status: false,
            message: message
        }
        return res.status(code).send(response)
    },

    apiError(err) {
        let error = {};
        if (err.name == 'ValidationError' && err.isJoi == true) {
            error.error_message = err.message.replace(/"/g, "");
            error.error_key = err.details[0]['context']['label'];
        } else if (typeof err == 'string') {
            error.error_message = err;
        } else {
            error = err;
            if (error.status == 401) error.message = 'unauthorized';
        }
        error.status = error.status || 400;
        return error;
    }

}