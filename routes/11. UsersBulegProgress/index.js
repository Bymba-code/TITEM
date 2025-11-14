const express = require("express")
const authenticateCookie = require("../../middlewares/authenticateCookie")
const ME_POST_USER_BULEG_PROGRESS = require("../../controllers/11. UsersBulegProgress/1. ME_POST")

const router = express.Router()

router.route("/me/user-buleg-progress")
.post(authenticateCookie, ME_POST_USER_BULEG_PROGRESS)



module.exports = router