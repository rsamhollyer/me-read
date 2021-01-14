const authorIdVary = document.querySelectorAll("[data-author-id]")
const editButton = document.querySelector("[data-edit-author]")

let editAuthor = document.querySelector("#edit-author")

const handleEditClick = () => {
    // const authorId = e.target
    // const targetAuthor = authorId.getAttribute("data-author-id")
    editAuthor.classList.toggle('hide-this')

    // const url = `/author/edit/${targetAuthor}`;
    // console.log(url);

    // editRequest = (data) => {
    //     fetch(url, {
    //             method: `POST`,
    //             body: data,
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(result => {
    //             console.log(result);
    //             return result.json()
    //         })
    //         .then(data => {
    //             console.log(data);
    //             // location.reload();
    //             return data
    //         })
    //         .catch(err => {
    //             console.log(`You got an error :${err}`);
    //         })

    // }
}


authorIdVary.forEach(id => {
    id.addEventListener("click", handleEditClick)
    editAuthor.classList.toggle('hide-this')
})

editButton.addEventListener("click", (data) => {
    console.log(data);
    // editRequest(data)
})