const {layout,navLayout} = require("../utilityfiles/utils")

const home =  (req, res) => {
    res.render("index", {
        ...layout,
        locals:{
            title:"Home Page"
        }
    })
}


module.exports = {
    home
}