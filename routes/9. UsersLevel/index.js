const express = require("express")

const authenticateCookie = require("../../middlewares/authenticateCookie")

const router = express.Router()

router.route("/users-level")


router.route("/users-level/:id")


router.route("/me/user-level")

module.exports = router