const express = require("express")
const router = express.Router()

const {
      authorControllers
} = require("../controllers")

router.get("/sort/main/:sorted", authorControllers.authorPage)
      .get("/add", authorControllers.renderAuthorForm)
      .post("/add", authorControllers.processNewAuthor)
      .delete("/:authorid", authorControllers.deleteAuthor)
      .put("/:authorid", authorControllers.editAuthor)
      .get("/search", authorControllers.searchAuthors)


module.exports = router