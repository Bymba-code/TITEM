const { storeData, returnCatchedError } = require("../../../services/controllerServices")

const GET_SINGLE_BULEG = async (req, res) => {
    try 
    {
        const { id } = req.params

        await storeData(param = parseInt(id), string = "buleg", res)

    }
    catch(err)
    {
        return returnCatchedError(err, res)
    }
}

module.exports = GET_SINGLE_BULEG

