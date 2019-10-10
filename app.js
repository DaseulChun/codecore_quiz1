const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

// Accessing to the database
const knex = require('./db/client');

// Router
const rootRouter = require('./routes/root');
const clucksRouter = require('./routes/clucks');

const app = express();

app.use(express.urlencoded({ exteded: true}));

// Using username stored in cookies globally
function getUsernameMiddleware(request, response, next) {
    console.log(`getUsernameMiddleware fired!`);
    response.locals.username = request.cookies.username;
    next();
}

app.use(cookieParser());

app.use(getUsernameMiddleware);

// Serving static assets
app.use(express.static(path.join(__dirname, 'public')));

// Logging middleware
app.use(logger('dev'));

// Using view engine
app.set('view engine', 'ejs'); 

// Connecting with routes
app.use(rootRouter);
app.use('/clucks', clucksRouter);

// // Root Page
// // GET welcome page
// app.get('/', (req, res) => {
//     const username = res.locals.username;
//     if(!username) {
//         res.render('welcome');
//     } else {
//         res.redirect('clucks/index');
//     }
// })

// // GET signIn page
// app.get('/sign_in', (req, res) => {
//     res.render('signIn');
// })

// // POST sign_in
// const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
// app.post('/sign_in', (req, res) => {
//     // console.log(`req.body: ${req.body.username}`);
//     res.cookie('username', req.body.username, { maxAge: new Date(COOKIE_MAX_AGE)});
//     res.redirect('/');
// })

// // POST sign_out
// app.post('/sign_out', (req, res) => {
//     res.clearCookie('username'); 
//     res.redirect('/'); 
// })

// // Clucks Page
// app.get('/clucks/new', (req,res) => {
//     res.render('clucks/new');
// })

// app.post('/clucks/index', (req,res) => {
//     const clucksParams = {
//         content: req.body.content,
//         image_url: req.body.imgUrl,
//         username: res.locals.username
//     }

//     knex('clucks')
//         .insert(clucksParams)
//         .returning('*')
//         .then(([cluck]) => {
//             res.redirect('/clucks/index');
//         })
// })

// app.get('/clucks/index', (req, res) => {
//     knex('clucks')
//         .select('*')
//         .orderBy('created_at', 'desc')
//         .then((clucks) => {
//             res.render('clucks/index', { clucks })
//     })
// })



const PORT = 4545;
const ADDRESS = '127.0.0.1';

app.listen(PORT, ADDRESS, () => {
    console.log(`Express Server started on ${ADDRESS}:${PORT}`);
})