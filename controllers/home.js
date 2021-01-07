const {layout,navLayout} = require("../utils")

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