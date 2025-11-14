const { storeData, returnCatchedError } = require("../../../services/controllerServices")

const GET_SINGLE_TOPIC = async (req, res) => {
    try 
    {
        const { id } = req.params

        await storeData(param = parseInt(id), string = "topic", res)

    }
    catch(err)
    {
        return returnCatchedError(err, res)
    }
}

module.exports = GET_SINGLE_TOPIC

