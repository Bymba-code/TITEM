const express = require("express")
const GET_ALL_TOPIC_TEST = require("../../controllers/5. TopicTest/1. GET_ALL")
const GET_SINGLE_TOPIC_TEST = require("../../controllers/5. TopicTest/2. GET_SINGLE")
const POST_TOPIC_TEST = require("../../controllers/5. TopicTest/3. POST")
const UPDATE_TOPIC_TEST = require("../../controllers/5. TopicTest/4. UPDATE")
const DELETE_TOPIC_TEST = require("../../controllers/5. TopicTest/5. DELETE")

const router = express.Router()

router.route("/topic-test")
.get(GET_ALL_TOPIC_TEST)
.post(POST_TOPIC_TEST)

router.route("/topic-test/:id")
.get(GET_SINGLE_TOPIC_TEST)
.put(UPDATE_TOPIC_TEST)
.delete(DELETE_TOPIC_TEST)

module.exports = router