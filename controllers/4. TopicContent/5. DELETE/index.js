const { deleteData, checkExistData } = require("../../../services/controllerServices")
const prismaService = require("../../../services/prismaServices")

const DELETE_TOPIC_CONTENT = async (req, res) => {
    
    const { id } = req.params


    await deleteData(
        "topic_content",
        { id : parseInt(id)},
        res
    )
    
}

module.exports = DELETE_TOPIC_CONTENT

