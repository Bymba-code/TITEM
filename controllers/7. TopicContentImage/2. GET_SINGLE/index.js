const { storeData, returnCatchedError } = require("../../../services/controllerServices")

const GET_SINGLE_TOPIC_CONTENT_IMAGE = async (req, res) => {
    try 
    {
        const { id } = req.params

        await storeData(param = parseInt(id), string = "topic_content_image", res)

    }
    catch(err)
    {
        return returnCatchedError(err, res)
    }
}

module.exports = GET_SINGLE_TOPIC_CONTENT_IMAGE

