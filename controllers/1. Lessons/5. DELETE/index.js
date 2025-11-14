const { deleteData } = require("../../../services/controllerServices")

const DELETE_LESSONS = async (req, res) => {
    
    const { id } = req.params

    await deleteData(
        "lessons",
        { id : parseInt(id)},
        res
    )
    
}

module.exports = DELETE_LESSONS

