const prismaService = require("../../../services/prismaServices")
const { storeDataVersionTwo, returnCatchedError } = require("../../../services/controllerServices")

const GET_ALL_TOPIC_CONTENT_IMAGE = async (req, res) => {
    try 
    {
        const { topic_content, page, limit } = req.query;

        let whereClause = {};

        if (topic_content) 
        {
            
            const topic_contentDB = await prismaService.topic_content.findUnique({
                where: {
                    id: parseInt(topic_content)
                }
            })

            if(!topic_contentDB)
            {
                return res.status(404).json({
                    success:false,
                    data:[],
                    message: "Сонгогдсон сэдвийн контент олдсонгүй."
                })
            }

            whereClause.topic_content = parseInt(topic_content);
        }

        return await storeDataVersionTwo(
            res,                 
            "topic_content_image",     
            whereClause,         
            { id: "desc" },      
            page ? parseInt(page) : null,
            limit ? parseInt(limit) : null
        );
    }
    catch(err)
    {
        returnCatchedError(err)
    }
}

module.exports = GET_ALL_TOPIC_CONTENT_IMAGE

