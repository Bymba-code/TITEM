const { deleteData } = require("../../../services/controllerServices")

const DELETE_TOPIC = async (req, res) => {
    
    const { id } = req.params

    await deleteData(
        "topic",
        { id : parseInt(id)},
        res
    )
    
}

module.exports = DELETE_TOPIC

