const express = require('express');

const router = express.Router();

// GET welcome page
router.get('/', (req, res) => {
    const username = res.locals.username;
    if(!username) {
        res.render('welcome');
    } else {
        res.redirect('clucks/index');
    }
})

// GET signIn page
router.get('/sign_in', (req, res) => {
    res.render('signIn');
})

// POST sign_in
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post('/sign_in', (req, res) => {
    // console.log(`req.body: ${req.body.username}`);
    res.cookie('username', req.body.username, { maxAge: new Date(COOKIE_MAX_AGE)});
    res.redirect('/');
})

// POST sign_out
router.post('/sign_out', (req, res) => {
    res.clearCookie('username'); 
    res.redirect('/'); 
})

module.exports = router;