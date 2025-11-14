const prismaService = require("../../../services/prismaServices")
const { storeDataVersionTwo, returnCatchedError } = require("../../../services/controllerServices")

const GET_ALL_TOPIC_CONTENT = async (req, res) => {
    try {
        const { topic, page, limit, order, orderBy } = req.query;

        let whereClause = {};
        if (topic) whereClause.topic = parseInt(topic);

        const topicDB = await prismaService.topic.findUnique({
            where: { id: parseInt(topic) }
        });

        if (!topicDB) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Сонгогдсон сэдэв олдсонгүй."
            });
        }

        let orderClause = {};
        if (orderBy) {
            orderClause[orderBy] = order && ["asc","desc"].includes(order.toLowerCase()) ? order.toLowerCase() : "asc";
        }

        return await storeDataVersionTwo(
            res,
            "topic_content",
            whereClause,
            orderClause,          
            page ? parseInt(page) : null,
            limit ? parseInt(limit) : null,
            {
                topic_content_image_topic_content_image_topic_contentTotopic_content: true,
                topic_topic_content_topicTotopic: true
            }
        );
    } catch (err) {
        return returnCatchedError(res, err);
    }
}

module.exports = GET_ALL_TOPIC_CONTENT;
