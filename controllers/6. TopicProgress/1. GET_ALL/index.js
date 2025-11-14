const prismaService = require("../../../services/prismaServices")

const GET_ALL_TOPIC_PROGRESS = async (req, res) => {
    try 
    {
        const data = await prismaService.topic_test.findMany({})

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

module.exports = GET_ALL_TOPIC_PROGRESS

