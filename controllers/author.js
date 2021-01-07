const {
    layout,
    navLayout
} = require("../utils")

const {
    Author
} = require("../models");


const authorPage = (req,res) => {
    res.render("forms/addauthor" ,{
        ...layout,
        locals: {
            title:'Add an Author'
        }
    } )
}

const processNewAuthor = async (req,res)=>{
    console.log(req.body);
    
    const {authorfirst,authorlast} = req.body
    const {id} = req.session.user

    try {
        if (authorfirst && authorlast && id) {
            const newAuthor = await Author.create({
                authorfirst,
                authorlast,
                UserId: id
            })
            console.log(`==========================NEW Author ITEM`, newAuthor);
            res.redirect(`/user/home`)
        } else {
            res.redirect(req.url)
        }
    } catch (e) {
        console.log(`ERROR ${e}`);
        res.redirect(`/user/home`)
    }
}




module.exports = {
    authorPage,
    processNewAuthor,
}