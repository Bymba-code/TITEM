const { updateData } = require("../../../services/controllerServices")

const UPDATE_TOPIC_TEST = async (req, res) => {
    
    const { id } = req.params

    const { image, name} = req.body;

    await updateData(
        "topic_test",
        { id: parseInt(id) },
        {
            ...(image && { image }),
            ...(name && { name}),
        },
        res
    );
    
    
}

module.exports = UPDATE_TOPIC_TEST

