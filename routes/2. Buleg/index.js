const express = require("express")
const GETL_ALL_BULEG = require("../../controllers/2. Buleg/1. GET_ALL")
const GET_SINGLE_BULEG = require("../../controllers/2. Buleg/2. GET_SINGLE")
const POST_BULEG = require("../../controllers/2. Buleg/3. POST")
const UPDATE_BULEG = require("../../controllers/2. Buleg/4. UPDATE")
const DELETE_BULEG = require("../../controllers/2. Buleg/5. DELETE")
const ME_GET_ALL_BULEG = require("../../controllers/2. Buleg/6. ME")
const authenticateCookie = require("../../middlewares/authenticateCookie")

const router = express.Router()

router.route("/buleg")
.get(GETL_ALL_BULEG)
.post(POST_BULEG)

router.route("/buleg/:id")
.get(GET_SINGLE_BULEG)
.put(UPDATE_BULEG)
.delete(DELETE_BULEG)

router.route("/me/buleg")
.get(authenticateCookie, ME_GET_ALL_BULEG)

module.exports = router