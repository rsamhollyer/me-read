const express = require("express")
const router = express.Router()

const { bookControllers } = require("../controllers")
const { processBookForm } = require("../controllers/book")

router.get("/:id",bookControllers.renderBooksPage)
      .get("/:id/add",bookControllers.renderAddBookPage)  
      .post("/:id/add",processBookForm) 

module.exports = router