const express = require('express')
const router = express.Router()
const db = require('../../models/db')
const { sha512 } = require('../../helpers/util')
const serverSalt = process.env.SERVER_SALT

const {check, validationResult} = require('express-validator/check')
const {matchedData, sanitize} = require('express-validator/filter')

router.get('/', (req, res) => {
    res.render('register.ejs', {
        error: undefined,
        username: undefined,
        password: undefined
    })
})

router.post('/', [
    check('username', 'Username must exist')
        .exists(),
    check('password', 'Passwords must be at least 5 chars long and contain one number')
        .isLength({min: 5})
        .matches(/\d/),
    check('password2', 'Passwords must match')
        .custom((val, {req}) => val === req.body.password),
    sanitize('*').trim()
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.render('register', {
            error: errors.array()[0].msg,
            username: undefined,
            password: undefined
        })
    } else {
        const { username, password } = matchedData(req)
        const passwordHash = sha512(password, serverSalt).passwordHash
        const user = {
            username,
            passwordHash,
            role: 'user'
        }
        db.users.add(user)
            .then(() => res.redirect(307, '/user/login'))
            .catch(error => {
                res.render('register', {
                    error,
                    username,
                    password
                })
            })
    }

})

module.exports = router