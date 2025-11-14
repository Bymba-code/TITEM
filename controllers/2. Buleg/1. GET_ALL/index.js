const prismaService = require("../../../services/prismaServices")

const GETL_ALL_BULEG = async (req, res) => {
    try 
    {
        const data = await prismaService.buleg.findMany({})

        if(data.length === 0)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Мэдээлэл олдсонгүй."
            })
        }

        return res.status(200).json({
            success:true,
            data:data,
            message: "Амжилттай."
        })
    }
    catch(err)
    {

    }
}

module.exports = GETL_ALL_BULEG

