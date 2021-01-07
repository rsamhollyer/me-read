const express = require("express")
const router = express.Router()

const { authorControllers } = require("../controllers")

router.get("/add", authorControllers.authorPage)
      .post ("/add",authorControllers.processNewAuthor)



module.exports = router