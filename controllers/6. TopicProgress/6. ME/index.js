const prismaService = require("../../../services/prismaServices");

const ME_GET_ALL_TOPIC_PROGRESS = async (req, res) => {
  try {
    const user = req.user;

    // 1. Хэрэглэгчийн topic progress авна
    const meData = await prismaService.users_topic_progress.findMany({
      where: {
        user: parseInt(user.id), 
      },
    });

    // 2. Topic жагсаалт (дарааллын дагуу)
    const topics = await prismaService.topic.findMany({
      orderBy: {
        index: "asc", 
      },
    });


    // 3. Topic бүрийн locked / progress төлөв
    const topicProgress = topics.map((topic, index) => {
      const progressRecord = meData.find(
        (m) => m.topic === topic.id
      );

      let locked = false;

      // Эхний topic үргэлж нээлттэй
      if (index === 0) {
        locked = false;
      } else {
        const prevTopic = topics[index - 1];
        const prevRecord = meData.find(
          (m) => m.topic_id === prevTopic.id
        );
        const prevCompleted = prevRecord && prevRecord.progress === 100;
        locked = !prevCompleted; // өмнөх нь 100% биш бол locked
      }

      return {
        topic_id: topic.id,
        topic_title: topic.title,
        progress: progressRecord ? progressRecord.progress : 0,
        locked,
      };
    });

    res.json({
      success: true,
      user_id: user.id,
      topicProgress,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = ME_GET_ALL_TOPIC_PROGRESS;
