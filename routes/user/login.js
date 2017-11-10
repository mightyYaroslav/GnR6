const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../models/db')

router.get('/', (req, res) => {
    res.render('login', {
        error: undefined,
        username: undefined,
        password: undefined
    })
})

router.post('/', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if(!user) return res.render('login', {
                error: "No such user",
                username: undefined,
                password: undefined
            })
        if(err) return res.render('login', {
            error: err,
            username: user.username,
            password: user.password
        })
        req.logIn(user, err => {
            if(err) return res.render('login', {
                error: err,
                username: user.username,
                password: user.password
            })
            return res.redirect('/albums/all')
        })
    })(req, res, next)
})

module.exports = router