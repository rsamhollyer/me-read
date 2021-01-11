const bookIdVary = document.querySelectorAll("[data-book-id]")
const deleteButton = document.querySelector("[data-delete-book]")
let deleteRequest;

const handleClick = (e) => {
    const bookId = e.target
    const targetBook = bookId.getAttribute("data-book-id")

    const url = `/book/${targetBook}`;

    deleteRequest = () => {
        fetch(url, {
                method: `DELETE`
            })
            .then(result => result.json())
            .then(data => {

                location.reload(); 
            })
            .catch(err => {
                console.log(`You got an error :${err}`);
            })

    }
}


bookIdVary.forEach(id => {
    id.addEventListener("click", handleClick)
})

deleteButton.addEventListener("click", () => {
    deleteRequest()
})