const { returnCatchedError } = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices");

const ME_POST_USER_BULEG_PROGRESS = async (req, res) => {
    try 
    {
        const user = req.user;

        const { buleg } = req.body;

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

        const EXP = topic?.exp;

        const dataExist = await prismaService.users_topic_progress.findFirst({
            where: {
                user: parseInt(user.id),
                topic:parseInt(topicID)
            }
        })

        if(dataExist)
        {
            return res.status(403).json({
                success:false,
                data:[],
                message: "Хэрэглэгч тухайн сэдвийг аль хэдийн үзсэн байна."
            })
        }
        

        const result = await prismaService.users_topic_progress.create({
            data: {
                user: parseInt(user.id),
                topic: parseInt(topicID),
                progress: 100,
                completed: 1,
                date: new Date() 
            }
        })

        // EXP нэмэх
        const resultExp = await prismaService.users_exp.create({
            data: {
                user: parseInt(user.id),
                exp: parseFloat(EXP),
                reason: `${ topic.name} сэдвийг үзэж дуусгав.`,
                date: new Date()
            }
        })


        return res.status(200).json({
            success:false,
            data:{ 
                totalAddExp: EXP,
                
            },
            message: "Амжилттай."
        })

        
    }
    catch(err)
    {
        returnCatchedError(err, res)
    }
}

module.exports = ME_POST_USER_BULEG_PROGRESS

