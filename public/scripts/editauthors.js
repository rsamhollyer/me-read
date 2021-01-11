const authorIdVary = document.querySelectorAll("[data-author-id]")
const editButton = document.querySelector("[data-edit-author]")

let editRequest;

const handleClick = (e) => {
    const authorId = e.target
    const targetAuthor = authorId.getAttribute("data-author-id")

    const url = `/author/${targetAuthor}`;

    editRequest = () => {
        fetch(url, {
                method: `PUT`,
                body:JSON.stringify(data)
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


authorIdVary.forEach(id => {
    id.addEventListener("click", handleClick)
})

editButton.addEventListener("click", () => {
    editRequest()
})