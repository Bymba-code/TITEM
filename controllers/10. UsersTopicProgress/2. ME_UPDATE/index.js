const { insertData, checkExistData } = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices");

const ME_UPDATE_USER_TOPIC_PROGRESS = async (req, res) => {
    try 
    {
        const user = req.user;

        const { topicID } = req.body;

        if(!topicID)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Буруу хүсэлт!"
            })
        }

        const topic = await prismaService.topic.findUnique({
            where: {
                id: parseInt(topicID)
            }
        })

        if(!topic)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Амжилтгүй."
            })
        }

        const data = await prismaService.users_topic_progress.findFirst({
            where: {
                user: parseInt(user.id),
                topic: parseInt(topicID)
            }
        })


        const updateResult = await prismaService.users_topic_progress.update({
            data: {
                
            }
        })
        
    }
    catch(err)
    {

    }

  
      
    await insertData({
        model: "users_level",
        data: {
          
        },   
    }, res)
}

module.exports = ME_UPDATE_USER_TOPIC_PROGRESS

