const express = require("express")
const router = express.Router()

const {
      bookControllers
} = require("../controllers")

router.get("/:authorid/sort/:sorted", bookControllers.renderBooksPage)
      .post("/add", bookControllers.processBookForm)
      .delete("/:bookid", bookControllers.deleteBook)
      .get("/search",bookControllers.searchBooks)
module.exports = router