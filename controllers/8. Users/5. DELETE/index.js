const { deleteData, checkExistData } = require("../../../services/controllerServices")
const prismaService = require("../../../services/prismaServices")

const DELETE_USERS = async (req, res) => {
    
    const { id } = req.params


    await deleteData(
        "users",
        { id : parseInt(id)},
        res
    )
    
}

module.exports = DELETE_USERS

