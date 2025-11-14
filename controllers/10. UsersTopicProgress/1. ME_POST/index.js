const { returnCatchedError } = require("../../../services/controllerServices");
const prismaService = require("../../../services/prismaServices");

const ME_POST_USER_TOPIC_PROGRESS = async (req, res) => {
    try {
        const user = req.user;
        const { topicID } = req.body;

        // 1.Validations
        if (!topicID) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Буруу хүсэлт! Topic ID шаардлагатай."
            });
        }

        // 2. Topic мэдээлэл авах
        const topic = await prismaService.topic.findUnique({
            where: {
                id: parseInt(topicID)
            },
            include: {
                buleg_topic_bulegTobuleg: true
            }
        });

        if (!topic) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Сэдэв олдсонгүй."
            });
        }

        const EXP = topic?.exp || 0;
        const progress = topic?.progress || 0;
        const topicIndex = topic?.index || 0;

        // 3. Buleg мэдээлэл авах
        const buleg = await prismaService.buleg.findFirst({
            where: {
                id: parseInt(topic.buleg)
            },
            include: {
                lessons: true
            }
        });

        if (!buleg) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Бүлэг олдсонгүй."
            });
        }

        // Lesson ID шалгах
        if (!buleg.lesson) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Бүлэгт хичээл холбогдоогүй байна."
            });
        }

        // 3.1 Буleg дахь хамгийн их index-тэй topic-ийг олох
        const maxIndexTopic = await prismaService.topic.findFirst({
            where: {
                buleg: parseInt(buleg.id)
            },
            orderBy: {
                index: 'desc'
            }
        });

        const isLastTopic = maxIndexTopic && maxIndexTopic.index === topicIndex;

        // 4. Хэрэглэгчийн бүлгийн явц шалгах эсвэл үүсгэх
        let bulegProgress = await prismaService.users_buleg_progress.findFirst({
            where: {
                user: parseInt(user.id),
                buleg: parseInt(buleg.id)
            }
        });

        if (!bulegProgress) {
            bulegProgress = await prismaService.users_buleg_progress.create({
                data: {
                    user: parseInt(user.id),
                    buleg: parseInt(buleg.id),
                    progress: 0,
                    completed: 0,
                    date: new Date()
                }
            });
        }

        // 5. Хэрэглэгч сэдвийг өмнө нь үзсэн эсэхийг шалгах
        const dataExist = await prismaService.users_topic_progress.findFirst({
            where: {
                user: parseInt(user.id),
                topic: parseInt(topicID)
            }
        });

        if (dataExist) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Хэрэглэгч тухайн сэдвийг аль хэдийн үзсэн байна."
            });
        }

        // 6. Сэдвийн явцыг бүртгэх
        const result = await prismaService.users_topic_progress.create({
            data: {
                user: parseInt(user.id),
                topic: parseInt(topicID),
                progress: 100,
                completed: 1,
                date: new Date()
            }
        });

        // 7. EXP нэмэх
        const resultExp = await prismaService.users_exp.create({
            data: {
                user: parseInt(user.id),
                exp: parseFloat(EXP),
                reason: `${topic.name} сэдвийг үзэж дуусгав.`,
                date: new Date()
            }
        });

        // 7.1 Хэрэв сүүлчийн topic бол буleg-ийн EXP нэмэх
        let bulegExpResult = null;
        if (isLastTopic && buleg.exp) {
            bulegExpResult = await prismaService.users_exp.create({
                data: {
                    user: parseInt(user.id),
                    exp: parseFloat(buleg.exp),
                    reason: `${buleg.name} бүлгийг дуусгав.`,
                    date: new Date()
                }
            });
        }

        // 8. Бүлгийн явцыг шинэчлэх
        const totalProgressBuleg = parseFloat(bulegProgress.progress) + parseFloat(progress);

        const resultBuleg = await prismaService.users_buleg_progress.update({
            where: {
                id: parseInt(bulegProgress.id)
            },
            data: {
                progress: parseFloat(totalProgressBuleg),
                completed: totalProgressBuleg >= 100 ? 1 : 0
            }
        });

        // 9. Хэрэв сүүлчийн topic бол lesson progress шинэчлэх
        let updateProgressLesson = null;
        if (isLastTopic) {
            const userLessonProgress = await prismaService.users_lesson_progress.findFirst({
                where: {
                    lesson: parseInt(buleg.lesson),
                    user: parseInt(user.id)
                }
            });

            if (userLessonProgress) {
                const progressToAdd = parseFloat(userLessonProgress.progress) + parseFloat(buleg.progress || 0);

                updateProgressLesson = await prismaService.users_lesson_progress.update({
                    where: {
                        id: parseInt(userLessonProgress.id)
                    },
                    data: {
                        progress: progressToAdd,
                        completed: progressToAdd >= 100 ? 1 : 0
                    }
                });
            } else {
                // Хэрэв lesson progress байхгүй бол үүсгэх
                updateProgressLesson = await prismaService.users_lesson_progress.create({
                    data: {
                        lesson: parseInt(buleg.lesson),
                        user: parseInt(user.id),
                        progress: parseFloat(buleg.progress || 0),
                        completed: 0,
                        date: new Date()
                    }
                });
            }
        }

        return res.status(200).json({
            success: true,
            data: {
                totalAddExp: EXP + (bulegExpResult ? parseFloat(buleg.exp) : 0),
                topicProgress: result,
                bulegProgress: resultBuleg,
                currentBulegProgress: totalProgressBuleg,
                bulegCompleted: isLastTopic,
                bulegExp: bulegExpResult,
                lessonProgress: updateProgressLesson
            },
            message: "Амжилттай."
        });
    } catch (err) {
        console.error("ME_POST_USER_TOPIC_PROGRESS Error:", err);
        returnCatchedError(err, res);
    }
};

module.exports = ME_POST_USER_TOPIC_PROGRESS;