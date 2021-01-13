//Need to get this id to link book with Author table
let pathNameForAuthorId = window.location.pathname
pathNameForAuthorId = pathNameForAuthorId.split("/")

let urlAuthorId = pathNameForAuthorId[2]
const formForBooks = document.querySelector("[data-hidden_author_id]")

formForBooks.value = urlAuthorId