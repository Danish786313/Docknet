// exports.getPagination = async (_page, _limit) => {
//     const limit = _limit ? +_limit : 20;
//     const offset = _page ? _page * limit : 0;
//     return { limit, offset };
// }

// exports.getPagingData = async (data, page, limit) => {
//     const { count: totalItems, rows: items } = data;
//     const currentPage = page ? +page : 0;
//     const totalPages = Math.ceil(totalItems / limit);
//     return { totalItems, items, totalPages, currentPage };
// };

// exports.json = async (req, res, next) => {
//     console.log("then", req.body)
//     next()
// }


module.exports = {
    getPagination (_page, _limit){
        const limit = _limit ? +_limit : 20;
        const offset = _page ? _page * limit : 0;
      
        return { limit, offset };
    },
    getPagingData (data, page, limit) {
        const { count: totalItems, rows: items } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, items, totalPages, currentPage };
    },    
}