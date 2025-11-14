const prismaService = require("../../../services/prismaServices");
const bcrypt = require("bcrypt")

const POST_USERS = async (req, res) => {
  try {
    const { firstname, lastname, username, password, confirmPassword } = req.body;

    if (!firstname) return res.status(403).json({ success: false, message: "Овог нэр оруулна уу." });
    if (!lastname) return res.status(403).json({ success: false, message: "Өөрийн нэр оруулна уу." });
    if (!username) return res.status(403).json({ success: false, message: "Нэвтрэх нэр оруулна уу." });
    if (!password) return res.status(403).json({ success: false, message: "Нууц үг оруулна уу." });
    if (!confirmPassword) return res.status(403).json({ success: false, message: "Нууц үг давтан оруулна уу." });

    const usernameDuplicate = await prismaService.users.findFirst({ where: { username } });
    if (usernameDuplicate) return res.status(403).json({ success: false, message: "Нэвтрэх нэр бүртгэлтэй байна." });

    if (password !== confirmPassword) return res.status(403).json({ success: false, message: "Нууц үг хоорондоо таарахгүй байна." });

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const result = await prismaService.$transaction(async (tx) => {
      const newUser = await tx.users.create({
        data: { firstname, lastname, username, password: hashed, date: new Date() }
      });

      await tx.users_level.create({
        data: { user: parseInt(newUser.id), level: 1, exp:0, achieved_at: new Date() }
      });

      await tx.users_exp.create({
        data: { user: parseInt(newUser.id), exp: 0, reason: "Хэрэглэгчийн бүртгэлийг амжилттай үүсгэлээ.", date: new Date() }
      });

      return newUser;
    });

    res.json({
      success: true,
      message: "Хэрэглэгч амжилттай үүслээ.",
      data: { id: result.id, username: result.username }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = POST_USERS;
