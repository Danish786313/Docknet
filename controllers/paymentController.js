var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay')
const shortid = require('shortid');
const { payment } = require("../models")


var razorPayInstance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET_KEY,
});

exports.createOrder = async (req, res) => {
    params = {
        amount: req.body.amount * 100,
		currency: "INR",
        receipt: shortid.generate(),
        payment_capture: "1"
    }
    await razorPayInstance.orders.create(params).then(async (response) => {
        const razorpayKeyId = process.env.KEY_ID
        const paymentDetail = {
            orderId: response.id,
			receiptId: response.receipt,
			amount: response.amount,
			currency: response.currency,
			createdAt: response.created_at,
			status: response.status
        }

        await payment.create(paymentDetail).then(() => {
            return res.render('pages/payment/checkout', {
				title: "Confirm Order",
				razorpayKeyId: razorpayKeyId,
				paymentDetail : paymentDetail
			})
            return res.status(200).json({
                message: "Order created",
                razorpayKeyId: razorpayKeyId,
                paymentDetail: paymentDetail
            })
        }).catch(err =>{
            if (err) throw err;
            return res.status(400).json({
                message: err.message
            })
        })

    }).catch(err =>{
        if (err) throw err;
        res.status(400).json({
            message: err.message
        })
    })
}


exports.verifyPayment = async (req, res) => {
    body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
	let crypto = require("crypto");
	let expectedSignature = crypto.createHmac('sha256', process.env.SECRET_KEY)
							.update(body.toString())
							.digest('hex');

    if(expectedSignature === req.body.razorpay_signature) {
        await payment.update({
            paymentId: req.body.razorpay_payment_id,
            signature: req.body.razorpay_signature,
            status: "paid"
            },
            {where: { orderId: req.body.razorpay_order_id }
        }).then(doc => {
            res.render('pages/payment/success', {
                title: "Payment verification successful",
                paymentDetail: doc
            })
        }).catch(err => {
            return res.render('pages/payment/fail', {
                title: "Payment verification failed 2",
            })
        });

    } else {
        return res.render('pages/payment/fail', {
			title: "Payment verification failed 3",
		})
        return res.status(400).send({
            message: err.message
        })
    }

} 