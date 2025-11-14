const { storeData, returnCatchedError } = require("../../../services/controllerServices")
const prismaService = require("../../../services/prismaServices")

const GET_SINGLE_LESSONS = async (req, res) => {
    try 
    {
        const { id } = req.params

        await storeData(param = parseInt(id), string = "lessons", res,  {
                buleg:{
                    include:{
                        topic_topic_bulegTobuleg:{
                            include:{
                                topic_content_topic_content_topicTotopic:true
                            }
                        }
                    }
                }
            })



    }
    catch(err)
    {
        return returnCatchedError(err, res)
    }
}

module.exports = GET_SINGLE_LESSONS

