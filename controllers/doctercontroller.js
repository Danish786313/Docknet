const { docter, sequelize, patient, docterInfo, admin, bankdetail } = require("../models")
const { SUCCESS, FAIL } = require("../helper/constants")
const Response = require("../helper/response")

exports.findById = async (req, res) => {
    await docter.findOne({ where:{id : req.profile.id}, include: [{model: docterInfo}, {model: bankdetail}]}).then(data => {
        if (data) {
            return Response.successResponseData(
                res,
                data,
                SUCCESS,
                "Docter fetched successfully."
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Error while fetching docter.",
                req
            )
        }
       
    }).catch(error =>{
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Sometn=hing went wrong while fetching docter.",
            req
        )
    })
}

exports.docterUpdate = async (req, res) => {
    let t = await sequelize.transaction()
    try {
        reqObj = req.files
        reqObj.profilePicture?  req.body.photo = req.files.profilePicture[0].filename : null;
        await docter.update(req.body, {where: {id: req.profile.id}, individualHooks: false}, {transaction: t}).then(async docter => {
            if (docter.length != "0") {
                docs = {}
                reqObj.logo? docs.logo = req.files.logo[0].filename : null
                reqObj.licenseFront? docs.licenseFront = req.files.licenseFront[0].filename : null;
                reqObj.identityCardFront? docs.identityCardFront = req.files.identityCardFront[0].filename : null;
                reqObj.identityCardBack? docs.identityCardBack = req.files.identityCardBack[0].filename : null;
                reqObj.clinicLicenseFront? docs.clinicLicenseFront = req.files.clinicLicenseFront[0].filename : null;
                reqObj.introVideo? docs.introVideo = req.files.introVideo[0].filename : null;
                await docterInfo.update(docs, {where: {docter_id: req.profile.id}}, {transaction: t}).then(docterInfo => {
                    if (docterInfo.length != "0") {
                        t.commit()
                        return Response.successResponseWithoutData(
                            res,
                            SUCCESS,
                            "Docter profile updated successfully"
                        )
                    } else {
                        t.rollback();
                        return Response.errorResponseWithoutData(
                            res,
                            FAIL,
                            "Something went wrong. while updating profile",
                            req
                        )
                    }
                }).catch(err => {
                    t.rollback();
                    return Response.errorResponseWithoutData(
                        res,
                        FAIL,
                        "Something went wrong. while updating docter info.",
                        req
                    )
                });
            } else {
                t.rollback();
                return Response.errorResponseWithoutData(
                    res,
                    FAIL,
                    "Something went wrong. while updating docter profile.",
                    req
                )
            }
        }).catch(err => {
            t.rollback();
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Something went wrong. while updating docter profile.",
                req,
            )
        })
    } catch (error) {
        console.log(error)
        t.rollback();
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong. while updating docter profile.",
            req,
        )
    }
};


exports.deleteDocter = async (req, res) => {
    try {
        let result = await docter.destroy({where: {id: req.profile.id}})
        if (result.length != "0") {
            return Response.successResponseWithoutData(
                res,
                SUCCESS,
                "Docter profile deleted successfully."
            )
        } else {
            return Response.errorResponseWithoutData(
                res,
                FAIL,
                "Something went wrong. while deleting docter profile.",
                req,
            )
        }
    } catch (error) {
        console.log(error)
        return Response.errorResponseWithoutData(
            res,
            FAIL,
            "Something went wrong. while deleting docter profile.",
            req,
        )
    }   
};

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