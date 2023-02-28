const { docter, sequelize, patient, docterInfo, admin, bankdetail } = require("../models")

exports.getdocter = async (req, res, next, id) => {
    try {
        const Docter = await docter.findByPk(id);
        if (Docter) {
            req.Docter = Docter;
            next();

        } else {
            throw "Docter doesn't exist."
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Docter does not exists."
        })
    }
}


exports.findById = async (req, res) => {
    await docter.findOne({
        where:{id : req.profile.id}, 
        include: [{model: docterInfo}, {model: bankdetail}]}).then(docter => {
        if (docter) {
            res.status(200).json({
                message: "Docter fetched successfully",
                results: docter
            })
        } else {
            throw Error
        }
       
    }).catch(error =>{
        res.status(400).json({
            message: "Docter fetched successfully",
            results: docter
        })
    })
}

exports.docterUpdate = async (req, res) => {
    await sequelize.transaction(async (t) => {
        reqObj = req.files
        reqObj.profilePicture?  req.body.photo = req.files.profilePicture[0].filename : null;
        await docter.update(req.body, {where: {id: req.profile.id}}, {transaction: t}).then(async docter => {
            console.log(docter)
            if (docter.length) {
                docs = {}
                reqObj.logo? docs.logo = req.files.logo[0].filename : null
                reqObj.licenseFront? docs.licenseFront = req.files.licenseFront[0].filename : null;
                reqObj.licenseBack? docs.licenseBack = req.files.licenseBack[0].filename : null;
                reqObj.identityCardFront? docs.identityCardFront = req.files.identityCardFront[0].filename : null;
                reqObj.identityCardBack? docs.identityCardBack = req.files.identityCardBack[0].filename : null;
                reqObj.clinicLicenseFront? docs.clinicLicenseFront = req.files.clinicLicenseFront[0].filename : null;
                reqObj.clinicLicenseBack? docs.clinicLicenceBack = req.files.clinicLicenseBack[0].filename : null;
                reqObj.introVideo? docs.introVideo = req.files.introVideo[0].filename : null;
                await docterInfo.update(docs, {where: {docter_id: req.profile.id}}, {transaction: t}).then(docterInfo => {
                    if (docterInfo.length) {
                        res.status(200).json({
                            message: "docter updated successfully",
                            result: docter,
                            docterInfo: docterInfo 
                        })
                    } else {
                        return res.status(400).json({
                            message: "Something went wrong. 123",
                            error: err
                        })
                    }
                }).catch(err => {
                    res.status(400).json({
                        message: "Something went wrong.",
                        error: err
                    })
                });
            } else {
                return res.status(400).json({
                    message: "Something went wrong.",
                    error: err
                })
            }
            
        }).catch(err => {
            res.status(400).json({
                message: "Something went wrong.",
                error: err
            });
        })        
    })
};


exports.deleteDocter = async (req, res) => {
    await docter.destroy({where: {id: req.profile.id}}).then((docter) => {
        return res.status(200).json({
               message: "Docter deleted successfully",
               result: docter
        })
    }).catch(err => {
        return res.status(400).json({
               message: "Something went wrong",
               error: err
        });
    });
}

;

const getPagination = (_page, _limit) => {
    const limit = _limit ? +_limit : 20;
    const offset = _page ? _page * limit : 0;
  
    return { limit, offset };
  };

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, items, totalPages, currentPage };
  };

exports.searchPatient = async (req, res) => {
    const { _page, _limit, searchText } = req.query;
    const { limit, offset } = helper.getPagination(_page, _limit);
    let where = {
        [Op.or]: [
          { name: { [Op.like]: "%" + searchText + "%" } },
          { phone: { [Op.like]: "%" + searchText + "%" } },
          { email: { [Op.like]: "%" + searchText + "%" } },
        ],
      };
    try {
        const users = await patient.findAndCountAll({
            limit,
            offset,
            where,
        });
        const response = helper.getPagingData(users, _page, limit);
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}