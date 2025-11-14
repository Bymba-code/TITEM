const { returnCatchedError } = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices");

const ME_GET_ALL_TOPIC = async (req, res) => {
  try {
    const user = req.user;
    const { buleg } = req.query;

    const userTopicProgress = await prismaService.users_topic_progress.findMany({
      where: { user: parseInt(user.id) },
    });

    const topics = await prismaService.topic.findMany({
      where: { buleg: parseInt(buleg) },
      orderBy: { index: "asc" },
    });

    
    const topicProgress = topics.map((t, index) => {
      const record = userTopicProgress.find((u) => u.topic === t.id);
      const progress = record ? record.progress : 0;
      const completed = progress === 100;

      let locked = false;
      if (index === 0) {
        locked = false; 
      } else {
        const prevRecord = userTopicProgress.find((u) => u.topic === topics[index - 1].id);
        const prevCompleted = prevRecord ? prevRecord.progress === 100 : false;
        locked = !prevCompleted;
      }

      return {
        id: t.id,
        name: t.name,
        progress,
        completed,
        locked,
        exp:t.exp,
        index: t.index
      };
    });

    res.json({
      success: true,
      user: user.id,
      data: topicProgress,
    });
  } catch (err) {
    returnCatchedError(err, res);
  }
};

module.exports = ME_GET_ALL_TOPIC;
