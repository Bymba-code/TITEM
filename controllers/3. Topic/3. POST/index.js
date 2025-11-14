const { insertData, checkExistData } = require("../../../services/controllerServices")

const POST_TOPIC = async (req, res) => {
    const { buleg, name, index, exp} = req.body;

    if(!buleg)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хамаарах бүлгийг сонгоно уу."
        })
    }
    if(!name)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Сэдвийн нэр оруулна уу."
        })
    }
    if(!index)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Сэдвийн дарааллийг оруулна уу."
        })
    }
    if(!exp)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Сэдвийг бүрэн дуусгасны дараа сурагчид өгөх оноог оруулна уу."
        })
    }

    const checkName = await checkExistData("topic", {buleg: parseInt(buleg), name: name}, "Оруулсан сэдвийн нэр давхцаж байна.", res)
    if(!checkName) return;
    
    const checkIndex = await checkExistData("topic", {buleg: parseInt(buleg), index: parseInt(index)}, "Оруулсан сэдвийн дараалал давхцаж байна.", res)
    if(!checkIndex) return;
      
    await insertData({
        model: "topic",
        data: {
            buleg: parseInt(buleg),
            name,
            index,
            exp,
            date: new Date()
        },   
    }, res)
}

module.exports = POST_TOPIC

