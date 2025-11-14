const { insertData, checkExistData } = require("../../../services/controllerServices")

const POST_BULEG = async (req, res) => {
    const { lesson, name, index, exp} = req.body;

    if(!lesson)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хамаатах хичээлийг сонгоно уу."
        })
    }
    if(!name)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Бүлгийн нэр оруулна уу."
        })
    }
    if(!index)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Бүлгийн дарааллийг оруулна уу."
        })
    }
    if(!exp)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Бүлгийг бүрэн дуусгасны дараа сурагчид өгөх оноог оруулна уу."
        })
    }

    await checkExistData("buleg", { name: name }, "Оруулсан бүлгийн нэр давхцаж байна.", res )    

    await checkExistData("buleg", { index: parseInt(index)}, "Оруулсан бүлгийн дараалал давхцаж байна.", res)
        
    await insertData({
        model: "buleg",
        data: {
            lesson: parseInt(lesson),
            name,
            index,
            exp,
            date: new Date()
        },   
    }, res)
}

module.exports = POST_BULEG

