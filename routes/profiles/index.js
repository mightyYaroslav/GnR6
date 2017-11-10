const express = require('express')
const router = express.Router()
const db = require('../../models/db')
const { checkAdmin } = require('../../middlewares/auth')

router.get('/',
    checkAdmin,
    (req, res) => {
    db.users.getAll()
        .then(users => {
            res.render('profile', { users })

        })
        .catch(err => res.render('error', { errors: [err] }))
})

module.exports = router