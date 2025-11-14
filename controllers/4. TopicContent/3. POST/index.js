const { insertData, checkExistData, returnCatchedError } = require("../../../services/controllerServices")

const POST_TOPIC_CONTENT = async (req, res) => {
    const { topic, content, type, index} = req.body;

    if(!topic)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хамаарах сэдвийг сонгоно уу."
        })
    }
    if(!content)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Агуулга оруулна уу."
        })
    }
    if(!type)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Контентийн төрөл сонгоно уу."
        })
    }
    if(!index)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Контентийн дарааллийг оруулна уу."
        })
    }
      
    await insertData({
        model: "topic_content",
        data: {
            topic: parseInt(topic),
            content: content,
            type:parseInt(type),
            index:parseInt(index),
            date: new Date()
        },   
    }, res)
}

module.exports = POST_TOPIC_CONTENT

