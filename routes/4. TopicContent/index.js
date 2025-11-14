const express = require("express")
const GET_ALL_TOPIC_CONTENT = require("../../controllers/4. TopicContent/1. GET_ALL")
const GET_SINGLE_TOPIC_CONTENT = require("../../controllers/4. TopicContent/2. GET_SINGLE")
const POST_TOPIC_CONTENT = require("../../controllers/4. TopicContent/3. POST")
const UPDATE_TOPIC_CONTENT = require("../../controllers/4. TopicContent/4. UPDATE")
const DELETE_TOPIC_CONTENT = require("../../controllers/4. TopicContent/5. DELETE")

const router = express.Router()

router.route("/topic-content")
.get(GET_ALL_TOPIC_CONTENT)
.post(POST_TOPIC_CONTENT)


router.route("/topic-content/:id")
.get(GET_SINGLE_TOPIC_CONTENT)
.put(UPDATE_TOPIC_CONTENT)
.delete(DELETE_TOPIC_CONTENT)


module.exports = router