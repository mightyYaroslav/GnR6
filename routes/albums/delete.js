const express = require('express')
const router = express.Router()
const db = require('../../models/db')
const { checkAdmin } = require('../../middlewares/auth')

router.post('/',
    checkAdmin,
    (req, res) => {
    db.albums.remove(req.body.id)
        .then(() => res.redirect('/albums/all'))
        .catch(err => res.render('error.ejs', {errors: [err]}))
})

module.exports = router