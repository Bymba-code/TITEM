const express = require("express")
const REGISTER_STUDENT = require("../../controllers/0. Auth/1. REGISTER")
const LOGIN_STUDENT = require("../../controllers/0. Auth/2. LOGIN")
const LOGOUT = require("../../controllers/0. Auth/3. LOGOUT")
const authenticateCookie = require("../../middlewares/authenticateCookie")

const router = express.Router()

router.route("/auth/student/register")
.post(REGISTER_STUDENT)

router.route("/auth/student/login")
.post(LOGIN_STUDENT)

router.route("/logout")
.get(authenticateCookie, LOGOUT)

module.exports = router