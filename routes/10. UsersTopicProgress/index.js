const express = require("express")

const authenticateCookie = require("../../middlewares/authenticateCookie")
const ME_POST_USER_TOPIC_PROGRESS = require("../../controllers/10. UsersTopicProgress/1. ME_POST")
const ME_UPDATE_USER_TOPIC_PROGRESS = require("../../controllers/10. UsersTopicProgress/2. ME_UPDATE")

const router = express.Router()

router.route("/me/user-topic-progress")
.post(authenticateCookie, ME_POST_USER_TOPIC_PROGRESS)
.put(authenticateCookie, ME_UPDATE_USER_TOPIC_PROGRESS)


module.exports = router