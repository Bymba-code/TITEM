const { returnCatchedError } = require("../../../services/controllerServices");

const LOGOUT = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      data: [],
      message: "Та системээс гарлаа.",
    });
  } catch (err) {
    returnCatchedError(err, res);
  }
};

module.exports = LOGOUT;
