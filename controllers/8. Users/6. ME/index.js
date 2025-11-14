const prismaService = require("../../../services/prismaServices");
const { returnCatchedError } = require("../../../services/controllerServices");

const ME_USER = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);

    // 1. Хэрэглэгчийн үндсэн мэдээлэл авах
    const userInfo = await prismaService.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        username: true
      }
    });

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        data: [],
        message: "Хэрэглэгчийн мэдээлэл олдсонгүй."
      });
    }

    // 2. Хэрэглэгчийн нийт туршлага (EXP) тооцоолох
    const userTotalExp = await prismaService.users_exp.aggregate({
      where: { user: userId }, 
      _sum: { exp: true }
    });

    const totalExp = userTotalExp._sum.exp || 0;

    // 3. Одоогийн level-г тодорхойлох (users_level-ээс хамгийн сүүлийн бичлэг)
    let userLevelRecord = await prismaService.users_level.findFirst({
      where: { user: userId },
      orderBy: { level: "desc" }, 
      select: { 
        level: true, 
        exp: true 
      }
    });

    // Хэрэв users_level-д бичлэг байхгүй бол level 1-ээр эхлүүлэх
    if (!userLevelRecord) {
      userLevelRecord = await prismaService.users_level.create({
        data: {
          user: userId,
          level: 1,
          exp: 0
        }
      });
    }

    let currentLevel = userLevelRecord.level;
    let currentLevelStartExp = userLevelRecord.exp;

    // 4. Level шилжилт шалгах ба шинэчлэх
    let leveledUp = false;
    const newLevelsAchieved = []; // Шинэ хүрсэн level-үүд
    
    while (true) {
      const nextLevelInfo = await prismaService.levels.findFirst({
        where: { level: currentLevel + 1 },
        select: { level: true, required_exp: true }
      });

      // Дараагийн level байхгүй эсвэл EXP хүрэхгүй байвал зогсоох
      if (!nextLevelInfo || totalExp < nextLevelInfo.required_exp) {
        break;
      }

      // Level ахиулах
      currentLevel = nextLevelInfo.level;
      currentLevelStartExp = nextLevelInfo.required_exp;
      leveledUp = true;
      newLevelsAchieved.push(currentLevel);

      // users_level хүснэгтэнд шинэ бичлэг үүсгэх
      await prismaService.users_level.create({
        data: {
          user: userId,
          level: currentLevel,
          exp: totalExp, // Хэрэглэгчийн бодит цуглуулсан EXP
          achieved_at: new Date()
        }
      });
    }

    // 5. Дараагийн level-рүү явах явцыг тооцоолох
    const nextLevelInfo = await prismaService.levels.findFirst({
      where: { level: currentLevel + 1 },
      select: { level: true, required_exp: true }
    });

    let progressData = null;
    if (nextLevelInfo) {
      // Одоогийн level дээр цуглуулсан EXP
      const expInCurrentLevel = totalExp - currentLevelStartExp;
      // Дараагийн level-д хүрэхэд шаардлагатай EXP
      const expNeededForNextLevel = nextLevelInfo.required_exp - currentLevelStartExp;
      // Дараагийн level-д ороход дутуу байгаа EXP
      const expRemaining = nextLevelInfo.required_exp - totalExp;
      // Явцын хувь
      const progress = ((expInCurrentLevel / expNeededForNextLevel) * 100).toFixed(2);
      
      progressData = {
        expInCurrentLevel: expInCurrentLevel,
        expNeededForNextLevel: expNeededForNextLevel,
        expRemaining: expRemaining,
        nextLevel: nextLevelInfo.level,
        nextLevelRequiredExp: nextLevelInfo.required_exp,
        progress: parseFloat(progress)
      };
    }

    // 6. Rank тодорхойлох
    const rankRecord = await prismaService.ranks.findFirst({
      where: { required_exp: { lte: totalExp } },
      orderBy: { required_exp: "desc" },
      select: { 
        rank_title: true,
        required_exp: true
      }
    });

    return res.status(200).json({
      success: true,
      data: {
        userInfo,
        totalExp: totalExp,
        level: {
          current: currentLevel,
          currentLevelBaseExp: currentLevelStartExp,
          ...progressData
        },
        rank: {
          title: rankRecord?.rank_title || "Зэрэггүй",
          requiredExp: rankRecord?.required_exp || 0
        },
        levelUp: {
          achieved: leveledUp,
          newLevels: newLevelsAchieved
        }
      },
      message: leveledUp 
        ? `🎉 Баяр хүргэе! Та ${newLevelsAchieved.join(", ")}-р түвшинд хүрлээ!` 
        : "Амжилттай."
    });

  } catch (err) {
    return returnCatchedError(err, res);
  }
};

module.exports = ME_USER;