const express = require("express")
const GET_ALL_TOPIC_CONTENT_IMAGE = require("../../controllers/7. TopicContentImage/1. GET_ALL")
const GET_SINGLE_TOPIC_CONTENT_IMAGE = require("../../controllers/7. TopicContentImage/2. GET_SINGLE")
const POST_TOPIC_CONTENT_IMAGE = require("../../controllers/7. TopicContentImage/3. POST")
const UPDATE_TOPIC_CONTENT_IMAGE = require("../../controllers/7. TopicContentImage/4. UPDATE")
const DELETE_TOPIC_CONTENT_IMAGE = require("../../controllers/7. TopicContentImage/5. DELETE")

const router = express.Router()

router.route("/topic-content-image")
.get(GET_ALL_TOPIC_CONTENT_IMAGE)
.post(POST_TOPIC_CONTENT_IMAGE)

router.route("/topic-content-image/:id")
.get(GET_SINGLE_TOPIC_CONTENT_IMAGE)
.put(UPDATE_TOPIC_CONTENT_IMAGE)
.delete(DELETE_TOPIC_CONTENT_IMAGE)


module.exports = router