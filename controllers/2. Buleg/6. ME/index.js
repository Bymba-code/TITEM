const { returnCatchedError } = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices");

const ME_GET_ALL_BULEG = async (req, res) => {
  try {
    const user = req.user;
    const { lesson } = req.query;

    const userBulegProgress = await prismaService.users_buleg_progress.findMany({
      where: { user: parseInt(user.id) },
    });

    const bulegs = await prismaService.buleg.findMany({
      where: { lesson: parseInt(lesson) },
      orderBy: { index: "asc" }, 
      include: { 
        topic_topic_bulegTobuleg:true
      }
    });

    

    const bulegProgress = bulegs.map((b, index) => {
      const record = userBulegProgress.find((u) => u.buleg === b.id);
      const progress = record ? record.progress : 0;
      const completed = progress === 100; 

      let locked = false;
      if (index === 0) {
        locked = false; 
      } else {
        const prevRecord = userBulegProgress.find((u) => u.buleg === bulegs[index - 1].id);
        const prevCompleted = prevRecord ? prevRecord.progress === 100 : false;
        locked = !prevCompleted; 
      }

      return {
     
        id: b.id,
        name: b.name,
        bulegTopicLengt:b && b.topic_topic_bulegTobuleg? b.topic_topic_bulegTobuleg.length : "0",
        progress,
        completed,
        locked,
        index:b.index,
        exp:b.exp
      };
    });

    res.json({
      success: true,
      user: user.id,
      data:bulegProgress,
    });
  } catch (err) {
    returnCatchedError(err, res);
  }
};

module.exports = ME_GET_ALL_BULEG;
