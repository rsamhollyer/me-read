const layout = {
    partials:{
        header:"partials/header",
        footer:"partials/footer", 
        }
}

const navLayout = {
    partials:{
        header:"partials/navheader",
        footer:"partials/footer"
    }
}


const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }



  const requireLogin = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = {
    layout,
    navLayout,
    capitalize,
    requireLogin
}