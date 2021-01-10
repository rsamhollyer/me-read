//Need to get this id to link book with Author table
let urlVary = window.location.pathname

urlVary = urlVary.split("/")

let urlAuthorId = urlVary.pop()

const formForBooks = document.querySelector("[data-hidden_author_id]")

formForBooks.value = urlAuthorId