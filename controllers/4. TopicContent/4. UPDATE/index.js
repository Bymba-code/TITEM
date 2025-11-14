const { updateData } = require("../../../services/controllerServices")

const UPDATE_TOPIC_CONTENT = async (req, res) => {
    
    const { id } = req.params

    const { content, type, index} = req.body;

    await updateData(
        "topic_content",
        { id: parseInt(id) },
        {
            ...(content && { content:content}),
            ...(type && { type:parseInt(type)}),
            ...(index && { index:parseInt(index)}),
        },
        res
    );
    
    
}

module.exports = UPDATE_TOPIC_CONTENT

