const { updateData, checkExistData } = require("../../../services/controllerServices")

const UPDATE_TOPIC = async (req, res) => {
    
    const { id } = req.params

    const { name, index, exp } = req.body;

    await updateData(
        "topic",
        { id: parseInt(id) },
        {
            ...(name && { name }),
            ...(index && { index: parseInt(index) }),
            ...(exp && { exp }),
        },
        res
    );
    
    
}

module.exports = UPDATE_TOPIC

