const { updateData, checkExistData } = require("../../../services/controllerServices")

const UPDATE_LESSONS = async (req, res) => {
    
    const { id } = req.params

    const { name, index, exp } = req.body;

    await checkExistData("lessons", { index: parseInt(index)}, "Оруулсан хичээлийн дараалал давхцаж байна.", res)

    await updateData(
        "lessons",
        { id: parseInt(id) },
        {
            ...(name && { name }),
            ...(index && { index: parseInt(index) }),
            ...(exp && { exp }),
        },
        res
    );
    
    
}

module.exports = UPDATE_LESSONS

