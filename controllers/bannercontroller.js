const { banner } = require('../models')

exports.getbanner = async (req, res, next, id) => {
    await banner.findByPk(id).then(banner => {
        if(banner){
            req.banner = banner;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "banner does not exists."
        })
    })
}

exports.create = async (req, res) => {
    post = {
        image: req.file.path,
        link: req.body.link
    }
    await banner.create(post).then(banner => {
        res.status(200).json({
            success: true,
            message: 'banner added successfully',
            result: banner
        })
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while adding the banner',
                Error: error 
            })
        })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "banner fetched successfully.",
            result: req.banner
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching banner.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    await banner.findAll()
    .then(banner => {
        if(banner.length){
            res.status(200).json({
                success: true,
                message: 'All banners fetched successfully',
                result: banner
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No banners found',
                result: banner
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching banner',
                Error: error
            })
        })
}


exports.update = async (req, res) => {
    await banner.update(req.body, {where: {id: req.params.bannerId}})
    .then(banner => {
        res.status(200).json({
            success: true,
            message: "banner updated successfully",
            result: banner
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing banner",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await banner.destroy({where: {id: req.params.bannerId}})
    .then(banner => {
        res.status(200).json({
            success: true,
            message: "banner deleted successfully",
            result: banner
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting banner",
            Error: error
        })
    })
}