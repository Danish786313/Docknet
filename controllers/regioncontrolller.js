const { city } = require("../models")
const { Op } = require("sequelize");

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

exports.getregion = async (req, res) => {
    try {
        const { _page, _limit, searchText } = req.query;
        const { limit, offset } = getPagination(_page, _limit);
        let where = {}
        if (searchText) {
            where = {
                cityName: {
                    [Op.like]: `%${searchText}%`
                }
            }
        }
        const users = await city.findAndCountAll({
            limit,
            offset,
            where
        });
        const response = getPagingData(users, _page, limit);
        return res.status(200).json({ response });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}