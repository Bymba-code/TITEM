const express = require("express")
const GET_ALL_USERS = require("../../controllers/8. Users/1. GET_ALL")
const GET_SINGLE_USERS = require("../../controllers/8. Users/2. GET_SINGLE")
const POST_USERS = require("../../controllers/8. Users/3. POST")
const UPDATE_USERS = require("../../controllers/8. Users/4. UPDATE")
const DELETE_USERS = require("../../controllers/8. Users/5. DELETE")
const ME_USER = require("../../controllers/8. Users/6. ME")
const authenticateCookie = require("../../middlewares/authenticateCookie")

const router = express.Router()

router.route("/users")
.get(GET_ALL_USERS)
.post(POST_USERS)

router.route("/users/:id")
.get(GET_SINGLE_USERS)
.put(UPDATE_USERS)
.delete(DELETE_USERS)

router.route("/me/user")
.get(authenticateCookie, ME_USER)

module.exports = router