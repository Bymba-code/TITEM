const { insertData, checkExistData, returnCatchedError } = require("../../../services/controllerServices")

const POST_TOPIC_CONTENT_IMAGE = async (req, res) => {
    const { topic_content, image, tailbar} = req.body;

    if(!topic_content)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хамаарах сэдвийн контентийг сонгоно уу."
        })
    }

    await insertData({
        model: "topic_content_image",
        data: {
            topic_content: parseInt(topic_content),
            image: image ? image : "",
            tailbar:tailbar ? tailbar : "",
            date: new Date()
        },   
    }, res)
}

module.exports = POST_TOPIC_CONTENT_IMAGE

