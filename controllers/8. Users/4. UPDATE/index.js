const { updateData } = require("../../../services/controllerServices")

const UPDATE_USERS = async (req, res) => {
    
    const { id } = req.params

    const { firstname, lastname, username, password} = req.body;


    await updateData(
        "users",
        { id: parseInt(id) },
        {
            ...(firstname && { firstname:firstname}),
            ...(lastname && { lastname:lastname}),
            ...(username && { username:username}),
            ...(password && { password:password}),

        },
        res
    );
    
}

module.exports = UPDATE_USERS

