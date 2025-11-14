const { insertData, checkExistData } = require("../../../services/controllerServices")

const POST_TOPIC_TEST = async (req, res) => {
    const { topic, image, name} = req.body;

    if(!topic)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хамаарах сэдвийг сонгоно уу."
        })
    }
    if(!name)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Тест оруулна уу."
        })
    }
      
    await insertData({
        model: "topic_test",
        data: {
            topic: parseInt(topic),
            image: image ? image : "",
            name: name,
            date: new Date()
        },   
    }, res)
}

module.exports = POST_TOPIC_TEST

