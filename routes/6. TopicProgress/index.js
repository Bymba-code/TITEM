const express = require("express")
const ME_GET_ALL_TOPIC_PROGRESS = require("../../controllers/6. TopicProgress/6. ME")
const authenticateCookie = require("../../middlewares/authenticateCookie")

const router = express.Router()

router.route("/me/topic-progress")
.get(authenticateCookie, ME_GET_ALL_TOPIC_PROGRESS)

module.exports = router