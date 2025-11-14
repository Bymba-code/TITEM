const express = require("express")
const GET_ALL_LESSONS = require("../../controllers/1. Lessons/1. GET_ALL")
const GET_SINGLE_LESSONS = require("../../controllers/1. Lessons/2. GET_SINGLE")
const POST_LESSONS = require("../../controllers/1. Lessons/3. POST")
const UPDATE_LESSONS = require("../../controllers/1. Lessons/4. UPDATE")
const DELETE_LESSONS = require("../../controllers/1. Lessons/5. DELETE")
const GET_ALL_LESSONS_ME = require("../../controllers/1. Lessons/6. ME")
const authenticateCookie = require("../../middlewares/authenticateCookie")
const ME_GET_SINGLE_LESSONS = require("../../controllers/1. Lessons/7. ME_SINGLE")

const router = express.Router()

router.route("/lessons")
.get(GET_ALL_LESSONS)
.post(POST_LESSONS)

router.route("/lessons/:id")
.get(GET_SINGLE_LESSONS)
.put(UPDATE_LESSONS)
.delete(DELETE_LESSONS)

router.route("/lesson")
.get(authenticateCookie, GET_ALL_LESSONS_ME)

router.route("/me/lessons/:id")
.get(authenticateCookie, ME_GET_SINGLE_LESSONS)

module.exports = router