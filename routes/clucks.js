const express = require('express');
const knex = require('../db/client');
const router = express.Router();

router.get('/new', (req,res) => {
    res.render('clucks/new');
})

router.post('/index', (req,res) => {
    let imgUrl = '/images/placeholder.png';
    if (req.body.imgUrl) {
        imgUrl = req.body.imgUrl;
    }

    const clucksParams = {
        content: req.body.content,
        image_url: imgUrl,
        username: res.locals.username
    }

    knex('clucks')
        .insert(clucksParams)
        .returning('*')
        .then(([cluck]) => {
            res.redirect('/clucks/index');
        })
})

router.get('/index', (req, res) => {
    knex('clucks')
        .select('*')
        .orderBy('created_at', 'desc')
        .then((clucks) => {
            res.render('clucks/index', { clucks })
    })
})

module.exports = router;
