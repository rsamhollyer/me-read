const {
    layout,
    navLayout
} = require("../utilityfiles/utils")

const {
    Book,
    Author
} = require("../models")

const {Op} =require("sequelize")

const renderBooksPage = async (req, res) => {
    const {
        authorid,
        sorted
    } = req.params

    try {
        let books = []
        if (authorid) {

            const author = await Author.findByPk(authorid)
            if(sorted === "az"){
                books = await Book.findAll({
                    where:{
                        AuthorId:authorid,
                    },
                    order:[
                        ["title","DESC"]
                    ]
                })
            } else if(sorted==="za"){
                books = await Book.findAll({
                    where:{
                        AuthorId:authorid,
                    },
                    order:[
                        ["title","ASC"]
                    ]
                })
            } else {

                books = await Book.findAll({
                    where: {
                        AuthorId: authorid,
                    },
                    order:[
                       [ "updatedAt","DESC"]
                    ]
                })
            }


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

    

    const author = await Author.findByPk(hidden_author_id)
   
    try {

        if (title && copyright && totalpages && currentpage && hidden_author_id) {

            const newBook = await Book.create({
                title,
                copyright,
                totalpages,
                currentpage,
                AuthorId:  hidden_author_id,
            })

            console.log(`NEW BOOK ADDED ====================== : ${newBook}`);
            res.redirect(`${req.baseUrl}/${hidden_author_id}/sort/sorted`)
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

const searchBooks = async (req,res)=>{

    const {term} = req.query

    try{

        if(term){

            const books = await Book.findAll({
                where:{
                    title:{
                        [Op.iLike] :"%" + term + "%"
                    }
                }
            })

            res.render("searchresults/searchbooks",{
                ...navLayout,
                locals:{
                    title:`Seach Results`,
                    books,
                }
            })
        }

    } catch(err){
        console.log(`BOOK SEARCH ERROR : ${err}`);
        res.redirect("/user/home")
    }
}


module.exports = {
    renderBooksPage,
    processBookForm,
    deleteBook,
    searchBooks
}