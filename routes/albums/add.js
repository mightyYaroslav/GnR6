const express = require('express')
const path = require('path')
const router = express.Router()

const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

const db = require('../../models/db')
const { checkAdmin } = require('../../middlewares/auth')

router.get('/',
    checkAdmin,
    (req, res) => {
    res.render('add.ejs')
})

router.post('/',
    checkAdmin, [
    check('title', 'Invalid title')
        .exists(),
    check('description', 'Invalid description')
        .exists(),
    check('rating', 'Invalid rating')
        .exists()
        .matches(/\d\.\d/),
    check('release_date', 'Invalid date')
        .exists()
        .matches(/\d{4}-\d{2}-\d{2}/)
], (req, res) => {
    let errors = validationResult(req)
    const fileIsOk = req.files.cover && /.*(\.png)|(\.jpe?g)|(\.gif)/.test(req.files.cover.name)
    if (!errors.isEmpty() || !fileIsOk) {
        if (fileIsOk)
            errors = errors.array()
        else
            errors = errors.array().concat([{ msg: "Image is invalid" }])
        res.render('error.ejs', { errors })
    } else {
        const album = matchedData(req)
        db.albums.add({ ...album, image: req.files.cover.data })
            .then(() => res.redirect('/albums/all'))
            .catch(err => {
                res.render('error.ejs', {errors: [err]})
            })
    }
})

module.exports = router