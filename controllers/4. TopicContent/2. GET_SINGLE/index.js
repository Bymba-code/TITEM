const { storeData, returnCatchedError } = require("../../../services/controllerServices")

const GET_SINGLE_TOPIC_CONTENT = async (req, res) => {
    try 
    {
        const { id } = req.params

        await storeData(param = parseInt(id), string = "topic_content", res)

    }
    catch(err)
    {
        return returnCatchedError(err, res)
    }
}

module.exports = GET_SINGLE_TOPIC_CONTENT

