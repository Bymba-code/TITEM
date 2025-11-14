const { returnCatchedError } = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices");

const ME_GET_SINGLE_LESSONS = async (req, res) => {
  try 
  {
    const user = req.user;

    const { id } = req.params;

    const lesson = await prismaService.lessons.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        buleg:{
            include:{
              topic_topic_bulegTobuleg:{
                include:{
                  topic_content_topic_content_topicTotopic:true
                }
            }
          }
        }
      }
    })
    
    const progress = await prismaService.users_lesson_progress.findFirst({
      where: {
        lesson: parseInt(id),
        user: parseInt(user.id)
      }
    })

    if(!progress)
    {
      const result = await prismaService.users_lesson_progress.create({
        data: {
          lesson: parseInt(id),
          user: parseInt(user.id),
          progress:0,
          completed:1,
          date: new Date()
        }
      })

      return res.status(200).json({
        success:true,
        data:{
          lesson,
          progress:result
        },
        message: "Амжилттай."
      })
    }

    return res.status(200).json({
      success:true,
      data: {
        lesson,
        progress
      },
      message: "Амжилттай."
    })


  } 
  catch(err) 
  {
    returnCatchedError(err, res);
  }
};

module.exports = ME_GET_SINGLE_LESSONS;
