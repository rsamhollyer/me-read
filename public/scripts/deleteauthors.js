const authorIdToDelete = document.querySelectorAll("[data-author-id]")
const deleteButton = document.querySelector("[data-delete-author]")
let deleteRequest;

const handleDeleteClick = (e) => {
    const authorId = e.target
    const targetAuthor = authorId.getAttribute("data-author-id")

    const url = `/author/${targetAuthor}`;

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


authorIdToDelete.forEach(id => {
    id.addEventListener("click", handleDeleteClick)
})

deleteButton.addEventListener("click", () => {
    deleteRequest()
})