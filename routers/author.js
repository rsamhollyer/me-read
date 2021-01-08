const express = require("express")
const router = express.Router()

const {
      authorControllers
} = require("../controllers")

router.get("/main", authorControllers.authorPage)
      .get("/add", authorControllers.renderAuthorForm)
      .post("/add", authorControllers.processNewAuthor)


module.exports = router