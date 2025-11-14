const express = require("express")
const cors = require("cors")
require("dotenv").config()
const cookieParser = require("cookie-parser")

const authRoute = require("./routes/0. Auth")
const lessonRoute = require("./routes/1. Lessons")
const bulegRoute = require("./routes/2. Buleg")
const topicRoute = require("./routes/3. Topic")
const topicContentRoute = require("./routes/4. TopicContent")
const topicTestRoute = require("./routes/5. TopicTest")
const topicProgressRoute = require("./routes/6. TopicProgress")
const topicContentImageRoute = require("./routes/7. TopicContentImage")
const usersRoute = require("./routes/8. Users")
const usersLevelRoute = require("./routes/9. UsersLevel")
const usersTopicProgressRoute = require("./routes/10. UsersTopicProgress")


const app = express()

app.use(express.json())

const allowedOrigins = [
  "https://teststudent.topjoloo.com",   
  "http://teststudent.topjoloo.com",
  "http://localhost:5173"
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("CORS blocked"))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(cookieParser())

app.use((req, res, next) => {
  res.cookie("test", "working", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  })
  next()
})


app.use(process.env.API_VERSION, authRoute)
app.use(process.env.API_VERSION, lessonRoute)
app.use(process.env.API_VERSION, bulegRoute)
app.use(process.env.API_VERSION, topicRoute)
app.use(process.env.API_VERSION, topicContentRoute)
app.use(process.env.API_VERSION, topicTestRoute)
app.use(process.env.API_VERSION, topicProgressRoute)
app.use(process.env.API_VERSION, topicContentImageRoute)
app.use(process.env.API_VERSION, usersRoute)
app.use(process.env.API_VERSION, usersLevelRoute)
app.use(process.env.API_VERSION, usersTopicProgressRoute)

app.listen(3000, () => {
    console.log("APP LISTENING: 3000")

})

