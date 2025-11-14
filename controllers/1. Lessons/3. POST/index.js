const { insertData, checkExistData } = require("../../../services/controllerServices")

const POST_LESSONS = async (req, res) => {
    const { name, index, exp } = req.body;

    if(!name)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хичээлийн нэрийг оруулна уу."
        })
    }
    if(!index)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хичээлийн дарааллийг оруулна уу."
        })
    }
    if(!exp)
    {
        return res.status(403).json({
            success:false,
            data:[],
            message: "Хичээлийг бүрэн дуусгасны дараа сурагчид өгөх оноог оруулна уу."
        })
    }

    await checkExistData("lessons", { name: name }, "Оруулсан хичээлийн нэр давхцаж байна.", res )    

    await checkExistData("lessons", { index: parseInt(index)}, "Оруулсан хичээлийн дараалал давхцаж байна.", res)
        
    await insertData({
        model: "lessons",
        data: {
            name,
            index,
            exp,
            date: new Date()
        },   
    }, res)
}

module.exports = POST_LESSONS

