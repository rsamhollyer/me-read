const express = require("express")
const router = express.Router()

const { userControllers } = require("../controllers")

router
    .get("/create", userControllers.newUser)
    .post("/create" , userControllers.processNewUser)
    .post("/login",userControllers.processLogin)
    .get("/home",userControllers.userHomePage)
    .post("/logout",userControllers.logout)
module.exports = router