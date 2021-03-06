const {
    layout,
    navLayout
} = require("../utilityfiles/utils")

const {
    Author
} = require("../models");

const Sequelize = require("sequelize")
const {
    Op
} = require("sequelize")

const authorPage = async (req, res) => {
    const {
        sorted
    } = req.params

    const {
        firstname,
        lastname,
        id
    } = req.session.user


    if (id) {
        let authors = []
        try {
            if (sorted === "za") {
                authors = await Author.findAll({
                    where: {
                        UserId: id,
                    },
                    order: [
                        ["authorlast", "ASC"]
                    ]
                })

            } else if (sorted === "az") {
                authors = await Author.findAll({
                    where: {
                        UserId: id,
                    },
                    order: [
                        ["authorlast", "DESC"]
                    ]
                })
            } else {
                authors = await Author.findAll({
                    where: {
                        UserId: id,
                    },
                    order: [
                        ["updatedAt", "DESC"]
                    ]
                })
            }

        } catch (err) {
            console.log(`THIS IS AN ERROR INSIDE userHomePage================== : ${err}`);
        }

        res.render("authors/allauthors", {
            ...navLayout,
            locals: {
                title: `${firstname}'s Authors`,
                authors,
            }
        })
    }
}





const renderAuthorForm = (req, res) => {
    res.render("forms/addauthor", {
        ...layout,
        locals: {
            title: 'Add an Author'
        }
    })
}

const processNewAuthor = async (req, res) => {

    const {
        authorfirst,
        authorlast
    } = req.body
    const {
        id
    } = req.session.user

    try {
        if (authorfirst && authorlast && id) {
            const newAuthor = await Author.create({
                authorfirst,
                authorlast,
                UserId: id
            })
            console.log(`==========================NEW Author ITEM`, newAuthor);
            res.redirect(`/author/sort/main/sorted`)
        } else {
            res.redirect(req.url)
        }
    } catch (e) {
        console.log(`ERROR ${e}`);
        res.redirect(`/user/home`)
    }
}


const deleteAuthor = async (req, res) => {

    const {
        authorid
    } = req.params


    try {

        const numberOfAuthorToDelete = await Author.destroy({
            where: {
                id: authorid,
                UserId: req.session.user.id
            }
        })

        console.log(numberOfAuthorToDelete);

        if (numberOfAuthorToDelete === 0 || numberOfAuthorToDelete > 1) {
            throw Error(`Something has gone wrong`)
        }
        res.json({
            status: `Success`,
            authorid
        })
    } catch (err) {
        res.json({
            status: `Error`
        })
    }
}

const editAuthor = async (req, res) => {

    const {
        authorid
    } = req.params


    let {
        authorfirst,
        authorlast
    } = req.body

 

    try {

        const findAuthor = await Author.findOne({
            where: {
                id: authorid,
                UserId: req.session.user.id
            }
        })

             
        findAuthor.authorfirst = authorfirst
        findAuthor.authorlast = authorlast

        await findAuthor.save()

      
        res.redirect(`${req.baseUrl}/sort/main/sorted`)
    } catch (err) {
        console.log(`ERROR IN EDIT ${err}`);
        res.redirect(`${req.baseUrl}/sort/main/sorted`)

    }
}

const searchAuthors = async (req, res) => {
    const {
        term
    } = req.query


    try {

        if (term) {

            const authors = await Author.findAll({

                where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("authorfirst"), Sequelize.col("authorlast")), {
                    [Op.iLike]: "%" + term + "%"
                })

            })

            res.render("searchresults/searchauthors", {
                ...navLayout,
                locals: {
                    title: `Seach Results`,
                    authors,
                }
            })
        }

    } catch (err) {
        console.log(`AUTHOR SEARCH ERROR : ${err}`);
        res.redirect("/user/home")
    }
}

module.exports = {
    renderAuthorForm,
    processNewAuthor,
    authorPage,
    deleteAuthor,
    editAuthor,
    searchAuthors
}