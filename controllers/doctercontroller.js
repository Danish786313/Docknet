const { docter, sequelize, patient, docterInfo, admin,  } = require("../models")

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
    try {
        return res.status(200).json({
            success: true,
            message: "Docter fetched successfully.",
            Docter: req.Docter
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching Docter.",
            error: error
        })
    }
}

exports.docterUpdate = async (req, res) => {
    await sequelize.transaction(async (t) => {
        req.files.profilePicture ? req.body.photo = req.files.profilePicture[0].filename : null   
        await docter.update(req.body, {where: {id: req.profile.id}}, {transaction: t}).then(async docter => {
            if (docter.length) {
                let docs = {
                    licenseFront: req.files.licenseFront[0].filename,
                    licenseBack: req.files.licenseBack[0].filename,
                    identityCardFront: req.files.identityCardFront[0].filename,
                    identityCardBack: req.files.identityCardBack[0].filename,
                    clinicLicenseFront: req.files.clinicLicenseFront[0].filename,
                    clinicLicenceBack: req.files.clinicLicenseBack[0].filename,
                    introVideo: req.files.introVideo[0].filename
                }
                await docterInfo.update(docs, {where: {docter_id: req.params.docterId}}, {transaction: t}).then(docterInfo => {
                    if (docterInfo.length) {
                        res.status(200).json({
                            message: "docter updated successfully",
                            result: docter
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
    await docter.destroy({where: {id: req.params.docterId}}).then((docter) => {
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