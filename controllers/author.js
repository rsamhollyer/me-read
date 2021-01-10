const {
    layout,
    navLayout
} = require("../utilityfiles/utils")

const {
    Author
} = require("../models");


const authorPage = async (req, res) => {
    const {
        firstname,
        lastname,
        id
    } = req.session.user


    if (id) {
        let authors = []
        try {

            authors = await Author.findAll({
                where: {
                    UserId: id,
                }
            })

        } catch (err) {
            console.log(`THIS IS AN ERROR INSIDE userHomePage================== : ${err}`);
        }

        res.render("authors/allauthors", {
            ...navLayout,
            locals: {
                title:`${firstname}'s Authors`,
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
    console.log(req.body);

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
            res.redirect(`/author/main`)
        } else {
            res.redirect(req.url)
        }
    } catch (e) {
        console.log(`ERROR ${e}`);
        res.redirect(`/user/home`)
    }
}




module.exports = {
    renderAuthorForm,
    processNewAuthor,
    authorPage,
}