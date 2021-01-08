// const deleteButtons = document.querySelectorAll(".deletebutton")
const deleteButtons = document.querySelectorAll("[data-comment-target]")

//Target with data attributes instead so that CSS changes to classes won't mess up javascript

const sendDelete = (event) => {
    //console.log() the ID of the comment - we'll use that in fetch() request
    //Each button needs a data-target attribute that you can assign a value (data-comment-target )
    // console.log(`You rang?`);
    // console.log(event.target);
    const button = event.target
    const id = button.getAttribute("data-comment-target")
    console.log(`Id of comment to delete : ${id}`);
    const url = `/comment/${id}`;
    //This is a Promise chain
    fetch(url, {
            method: `DELETE`,
            // method:"PUT",
            // body: JSON.stringify(data)   //if you need to send data to back end


        })
        .then(r => r.json()) // take the response, convert to JSON object
        .then(data => {
            console.log(`HERE IS RESPONSE DATA`);
            console.log(data.id);
            const comment = document.querySelector(`[data-comment-id =${data.id}]`)
            console.log(comment);
            //In DOM, to delete element, you have to ask parent to delete child
            comment.parentElement.removeChild(comment)
        }) //take the JSON object, do some stuff console.log() delete the DOM element
        .catch(err => {
            //Let user know there was an error - alert() or a dom element that covers it
            console.log(`You got an Error!`);
            console.log(err);
        }) // If error, console.log() it for now
    //when it comes back - remove the comment from the page
}

deleteButtons.forEach(button => {
    button.addEventListener("click", sendDelete)
})



//This is for the backened portion - will need to update on my app appropriately.

//Creating an API endpoint in the backend

app.delete('/comment/:id', async (req, res) => {
    const {
        id
    } = req.params

    //DELETE COMMENT WITH THAT ID
    console.log(`they want to delete comment id: ${id}`)


    try {
        //.destroy()
        const numCommentsDeleted = await Comment.destroy({
            where: {
                id,
                //To make sure that logged in use can only delete their own comments
                //do something like this
                // userId: req.session.user.id
            }
        })
        console.log(numCommentsDeleted)
        //we expect .destroy() to delete only 1 comment
        //if 0 or more than 1, throw error
        if (numCommentsDeleted === 0 || numCommentsDeleted > 1) {
            throw Error(`Bad. No Good.`)
        }
        res.json({
            status: `Success`,
            id,

        })

    } catch (err) {
        res.json({
            status: `Error`
        })
    }

})