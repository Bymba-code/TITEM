const { deleteData, checkExistData } = require("../../../services/controllerServices")

const DELETE_TOPIC_CONTENT_IMAGE = async (req, res) => {
    
    const { id } = req.params


    await deleteData(
        "topic_content_image",
        { id : parseInt(id)},
        res
    )
    
}

module.exports = DELETE_TOPIC_CONTENT_IMAGE

