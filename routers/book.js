const express = require("express")
const router = express.Router()

const { bookControllers } = require("../controllers")

router.get("/:authorid",bookControllers.renderBooksPage)
      .post("/add",bookControllers.processBookForm)
      .delete("/:bookid",bookControllers.deleteBook) 

module.exports = router