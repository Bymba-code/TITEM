const { storeData, returnCatchedError } = require("../../../services/controllerServices")

const GET_SINGLE_USERS = async (req, res) => {
    try 
    {
        const { id } = req.params

        await storeData(param = parseInt(id), string = "users", res)

    }
    catch(err)
    {
        return returnCatchedError(err, res)
    }
}

module.exports = GET_SINGLE_USERS

