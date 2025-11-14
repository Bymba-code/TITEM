const { storeDataVersionTwo, returnCatchedError } = require("../../../services/controllerServices")

const GET_ALL_USERS = async (req, res) => {
    try {
        const {page, limit} = req.query;

        let whereClause = {};

        let orderClause = {};


        return await storeDataVersionTwo(
            res,
            "users",
            whereClause,
            orderClause,          
            page ? parseInt(page) : null,
            limit ? parseInt(limit) : null,
            {}
        );
    } catch (err) {
        return returnCatchedError(err, res);
    }
}

module.exports = GET_ALL_USERS;
