const express = require("express")
const GETL_ALL_TOPIC = require("../../controllers/3. Topic/1. GET_ALL")
const POST_TOPIC = require("../../controllers/3. Topic/3. POST")
const GET_SINGLE_TOPIC = require("../../controllers/3. Topic/2. GET_SINGLE")
const UPDATE_TOPIC = require("../../controllers/3. Topic/4. UPDATE")
const DELETE_TOPIC = require("../../controllers/3. Topic/5. DELETE")
const ME_GET_ALL_TOPIC = require("../../controllers/3. Topic/6. ME")
const authenticateCookie = require("../../middlewares/authenticateCookie")

const router = express.Router()

router.route("/topic")
.get(GETL_ALL_TOPIC)
.post(POST_TOPIC)


router.route("/topic/:id")
.get(GET_SINGLE_TOPIC)
.put(UPDATE_TOPIC)
.delete(DELETE_TOPIC)

router.route("/me/topic")
.get(authenticateCookie, ME_GET_ALL_TOPIC)


module.exports = router