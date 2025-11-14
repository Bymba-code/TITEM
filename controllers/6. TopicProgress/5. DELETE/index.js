const { deleteData, checkExistData } = require("../../../services/controllerServices")

const DELETE_TOPIC_TEST = async (req, res) => {
    
    const { id } = req.params


    await deleteData(
        "topic_test",
        { id : parseInt(id)},
        res
    )
    
}

module.exports = DELETE_TOPIC_TEST

