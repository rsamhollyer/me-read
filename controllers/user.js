const {
    layout,
    navLayout,
    capitalize,
} = require("../utilityfiles/utils")

const bcrypt = require("bcryptjs");

const {
    User,
    Author
} = require("../models");


const newUser = (req, res) => {
    res.render('forms/createuser', {
        ...layout,
        locals: {
            title: "Create Account"
        }
    })
}


const processNewUser = async (req, res) => {

    let {
        username,
        password,
        firstname,
        lastname
    } = req.body

    firstname = firstname.toLowerCase()
    lastname = lastname.toLowerCase()

    if (username === "" || password === "" || firstname === "") {
        res.redirect(`${req.baseUrl}/create`)
    } else {
        const hash = bcrypt.hashSync(password, 10)

        try {
            const newUser = await User.create({
                username,
                hash,
                firstname,
                lastname
            })

            res.redirect("/")
        } catch (e) {
            console.log(`==================== ERROR WITH NEW USER CREATION: ${e}`);

            res.redirect(`/`)
        }
    }
}




const processLogin = async (req, res) => {
    const {
        username,
        password
    } = req.body;


    try {
        const user = await User.findOne({
            where: {
                username,
            }
        })

        if (user) {
            console.log(`======================= USER EXISTS`);

            const isValid = bcrypt.compareSync(password, user.hash)

            if (isValid) {
                console.log(`============================ PASSWORD GOOD`);

                req.session.user = {
                    username: user.username,
                    id: user.id,
                    firstname: capitalize(user.firstname),
                    lastname: capitalize(user.lastname),
                }

                req.session.save(() => {
                    res.redirect(`${req.baseUrl}/home`)
                })
            }
        } else {
            console.log(`===============================NOT VALID USER`);
            res.redirect(`/`)
        }

    } catch (e) {
        console.log(`=================== LOGIN ERROR================ `, e);
        res.redirect("/")
    }


}

const userHomePage = (req, res) => {
    const {
        firstname,
        lastname
    } = req.session.user


    res.render("user/userhome", {
        ...navLayout,
        locals: {
            title: `${firstname} ${lastname}'s Home Page`,
            firstname,
            lastname,

        }
    })
}





const logout = (req, res) => {
    console.log(`LOGOUT`);

    req.session.destroy(() => {
        res.redirect("/")
    })
}

module.exports = {
    newUser,
    processNewUser,
    processLogin,
    userHomePage,
    logout
}