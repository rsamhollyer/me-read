const express = require("express")
const router = express.Router()

const {
      authorControllers
} = require("../controllers")

router.get("/main", authorControllers.authorPage)
      .get("/add", authorControllers.renderAuthorForm)
      .post("/add", authorControllers.processNewAuthor)
      .delete("/:authorid",authorControllers.deleteAuthor)
      .put("/:authorid",authorControllers.editAuthor)


module.exports = router