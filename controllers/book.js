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
        id
    } = req.params

    try {
        let books = []
        if (id) {

            const author = await Author.findByPk(id)
            books = await Book.findAll({
                where: {
                    AuthorId: id,
                }
            })

            res.render("book/allbooks", {
                ...layout,
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

const renderAddBookPage = (req, res) => {
    res.render("forms/addbook", {
        ...layout,
        locals: {
            title: "Add a new Book"
        }
    })

}

const processBookForm = async (req, res) => {

    const {
        title,
        copyright,
        totalpages,
        currentpage
    } = req.body

    const {
        id
    } = req.params
    const author = await Author.findByPk(id)

    try {

        if (title && copyright && totalpages && currentpage && id) {
            const newBook = await Book.create({
                title,
                copyright,
                totalpages,
                currentpage,
                AuthorId: id,
            })
            console.log(`NEW BOOK ADDED ====================== : ${newBook}`);
            res.redirect(`${req.baseUrl}/${id}`)
        } else{
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
    renderAddBookPage,
    processBookForm
}