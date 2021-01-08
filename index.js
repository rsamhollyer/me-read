require('dotenv').config(); // don't forget to require dotenv

const http = require('http');
const express = require('express');
const morgan = require('morgan');
const es6Renderer = require('express-es6-template-engine');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const {
    requireLogin
} = require("./utilityfiles/utils")

const app = express();
const server = http.createServer(app);

const PORT = 3000;
const HOST = 'localhost';

const logger = morgan('tiny');

const {
    homeRouter,
    userRouter,
    authorRouter,
    bookRouter
} = require("./routers")


app.use(express.static("public"))

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(session({
    store: new FileStore(), // no options for now
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: {
        maxAge: 604800000 //1 Week in milli
    }
}));

app.use(express.urlencoded({
    extended: true
}));

app.use(logger);


app.use(homeRouter)

app.use("/user", userRouter)

app.use(requireLogin)

app.use("/author", authorRouter)

app.use("/book", bookRouter)

server.listen(PORT, HOST, () => {
    console.log(`Listening at http://${HOST}:${PORT}`);
});