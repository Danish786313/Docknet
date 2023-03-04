const { review, sequelize } = require("../models")
const Response = require("../helper/response")
const { SUCCESS, FAIL } = require("../helper/constants")

exports.getReview = async (req, res, next, id) => {
    try {
        let data = await review.findByPk(id)
        if (data) {
            req.Data = data;
            next();
        } else {
            return Response.errorResponseData(
                res, 
                "review Does not exist",
                req
            )
        }
    } catch (err) {
        return Response.errorResponseData(
            res, 
            "Something went wrong",
            req
        )
    }
}

exports.createReview = async (req, res) => {
    let t = await sequelize.transaction()
    try {
        req.body.patient_id = req.profile.id
        let data = await review.create(req.body, {transaction: t})
        if (data) {
            t.commit()
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Review created successfully"
            )
        } else {
            t.rollback()
            return Response.errorResponseData(
                res,
                "Could not create review",
                req
            )
        }
    } catch (err) {
        t.rollback()
        console.log(err)
        return Response.errorResponseData(
            res,
            "Something went wrong while creating review",
            req
        )
    }
}

exports.getReviewStars = async (req, res) => {
    try {
        let data = await review.findAndCountAll({ where: {docter_id: req.params.docterId}})
        if (data.rows.length) {
            return Response.successResponseData(
                res,
                { count: data.count, allData: data.rows },
                SUCCESS,
                "Review found successfully"
            )
        } else {
            return Response.errorResponseData(
                res,
                "Review not found",
                req
            )
        }
    } catch (err) {
        console.log(err)
        return Response.errorResponseData(
            res,
            "Something went wrong while getting review",
            req
        )
    }
}

exports.updateReview = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let data = await review.update(req.body, {where: {id: req.params.reviewId}}, {transaction: t})
        if (data[0] != 0) {
            t.commit()
            return Response.successResponseWithoutData(
                res,
                "review updated successfully",
                SUCCESS,
            ) 
        } else {
            t.rollback()
            return Response.errorResponseData(
                res,
                "Could not update review",
                req,
            )
        }
    } catch (err) {
        t.rollback()
        console.log(err)
        return Response.errorResponseData(
            res,
            "Something went wrong while updating review",
            req,
        )
    }
};

exports.deleteReview = async (req, res) => {
    try {
        let result = await review.destroy({where: {id: req.params.reviewId}})
        if (result) {
            return Response.successResponseWithoutData(
                res,
                "review deleted successfully",
                SUCCESS,
            )  
        } else {
            return Response.errorResponseData(
                res,
                "Could not delete review",
                req
            )
        }
    } catch (err) {
        return Response.errorResponseData(
            res,
            "Something went wrong while deleting review",
            req
        )
    }
}