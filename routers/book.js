const express = require("express")
const router = express.Router()

const { bookControllers } = require("../controllers")
const { processBookForm } = require("../controllers/book")

router.get("/:authorid",bookControllers.renderBooksPage)
      .post("/add",bookControllers.processBookForm) 

module.exports = router