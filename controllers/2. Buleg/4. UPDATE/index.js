const { updateData, checkExistData } = require("../../../services/controllerServices")

const UPDATE_BULEG = async (req, res) => {
    
    const { id } = req.params

    const { name, index, exp } = req.body;

    await checkExistData("buleg", { index: parseInt(index)}, "Оруулсан бүлгийн дараалал давхцаж байна.", res)

    await updateData(
        "buleg",
        { id: parseInt(id) },
        {
            ...(name && { name }),
            ...(index && { index: parseInt(index) }),
            ...(exp && { exp }),
        },
        res
    );
    
    
}

module.exports = UPDATE_BULEG

