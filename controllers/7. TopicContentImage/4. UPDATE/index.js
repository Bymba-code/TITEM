const { updateData } = require("../../../services/controllerServices")

const UPDATE_TOPIC_CONTENT_IMAGE = async (req, res) => {
    
    const { id } = req.params

    const { image, tailbar} = req.body;

    await updateData(
        "topic_content_image",
        { id: parseInt(id) },
        {
            ...(image && { image:image}),
            ...(tailbar && { tailbar:tailbar})
        },
        res
    );
    
    
}

module.exports = UPDATE_TOPIC_CONTENT_IMAGE

