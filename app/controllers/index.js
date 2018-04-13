const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const keys = require('../../config/keys');
const moment = require('moment');
const passport = require('passport');
const dateNow = moment().format('YYYY');
const email = require('../components/email');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(require('../../config/keys').news);

let newsData;

newsapi.v2.topHeadlines({
  country: 'us'
}).then(response => {
  newsData = response;
});

module.exports = (app) => {
    app.use('/', router);
};

router.get('/', (req, res, next) => {
	res.render('index', {
		yearNow: dateNow,
        uip: require("ip").address(),
        user: req.user,
        msg: req.flash('info')
	});
});

// send email
router.post('/sendEmail', email )

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/welcome');
});

router.get('/welcome', (req, res, next) => {
    if (!req.user) {
        req.flash('info', 'Please login first!')
        res.redirect('/')

    } else {
        console.log(newsData)
        res.render('index2', {
            yearNow: dateNow,
            uip: require("ip").address(),
            user: req.user,
            news: newsData
        })
    }
})
