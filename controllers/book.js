const {
    layout,
    navLayout
} = require("../utilityfiles/utils")

const {
    Book,
    Author
} = require("../models")

const renderBooksPage = async (req, res) => {
    const {
        authorid
    } = req.params

    try {
        let books = []
        if (authorid) {

            const author = await Author.findByPk(authorid)
            books = await Book.findAll({
                where: {
                    AuthorId: authorid,
                }
            })

            res.render("book/allbooks", {
                ...navLayout,
                locals: {
                    title: `${author.authorfirst} ${author.authorlast}`,
                    books,
                    author,
                }
            })
        }

    } catch (err) {
        console.log(`=============THIS IS AN ERROR IN BOOKS============ :${err}`);
        res.redirect("/user/home")
    }
}


const processBookForm = async (req, res) => {

    const {
        title,
        copyright,
        totalpages,
        currentpage,
        hidden_author_id
    } = req.body



    // const {
    //     authorid
    // } = req.params



    const author = await Author.findByPk(hidden_author_id)
    console.log(`==================first variables ${title} ${copyright} ${totalpages} ${currentpage}`);
    console.log(`=====================ID ${hidden_author_id}`);
    console.log(`=====================AUTHOR ${author}`);
    console.log(`===================url ${req.url}`);

    try {

        if (title && copyright && totalpages && currentpage &&  hidden_author_id) {
            const newBook = await Book.create({
                title,
                copyright,
                totalpages,
                currentpage,
                AuthorId:  hidden_author_id,
            })
            console.log(`NEW BOOK ADDED ====================== : ${newBook}`);
            res.redirect(`${req.baseUrl}/${ hidden_author_id}`)
        } else {
            console.log(`ERROR IN ELSE===================`);
            res.redirect("/user/home")
        }

    } catch (err) {
        console.log(`=================BOOK FORM`, err);
        res.redirect("/user/home")
    }
}



module.exports = {
    renderBooksPage,
    processBookForm
}