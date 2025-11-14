const jwt = require("jsonwebtoken");

const authenticateCookie = (req, res, next) => {
  try {
    const token = req.cookies?.token

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Нэвтрэх шаардлагатай байна.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token хүчингүй эсвэл хугацаа дууссан байна.",
    });
  }
};

module.exports = authenticateCookie;
