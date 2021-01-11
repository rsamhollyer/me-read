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

            res.render("book/authorsbooks", {
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

    

    // const author = await Author.findByPk(hidden_author_id)
   
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
            res.redirect(`${req.baseUrl}/${hidden_author_id}`)
        } else {
            console.log(`ERROR IN ELSE===================`);
            res.redirect("/user/home")
        }

    } catch (err) {
        console.log(`=================BOOK FORM`, err);
        res.redirect("/user/home")
    }
}

const deleteBook = async (req,res)=>{
    
    const {bookid} = req.params

    try{

        const numberOfBookToDelete = await Book.destroy({
            where:{
                id:bookid,
            }
        })
        console.log(numberOfBookToDelete);

        if(numberOfBookToDelete === 0 || numberOfBookToDelete >1){
            throw Error(`Something has gone wrong`)
        }

        res.json({
            status:`Success`,
            bookid,
        })
    }catch(err){
        res.json({
            status:`Error`
        })
    }

}

module.exports = {
    renderBooksPage,
    processBookForm,
    deleteBook
}