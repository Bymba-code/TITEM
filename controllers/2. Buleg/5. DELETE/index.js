const { deleteData } = require("../../../services/controllerServices")

const DELETE_BULEG = async (req, res) => {
    
    const { id } = req.params

    await deleteData(
        "buleg",
        { id : parseInt(id)},
        res
    )
    
}

module.exports = DELETE_BULEG

