const express = require('express')
const db = require('../../models/db')
const { checkAuth } = require('../../middlewares/auth')
const router = express.Router()

router.get('/',
    checkAuth,
    (req, res) => {
    db.albums.getAll()
        .then(data => {

            res.render('albums.ejs', {
                albums: data,
                searchText: "",
                user: req.user
            })
        })
        .catch(err => {
            res.render('error.ejs', {errors: [err]})
        })
})

router.get('/:id(\\d+)',
    checkAuth,
    (req, res) => {
    db.albums.getById(req.params.id)
        .then(data => {

            res.render('album.ejs', {...data[0], release_year: data[0].release_date.substring(0,4)})
        })
        .catch(err => {

            res.render('error.ejs', {errors: [err]})
        })

})

router.post('/',
    checkAuth,
    (req, res) => {
    db.albums.getByTitle(req.body.searchTitle)
        .then(data => {
            res.render('albums.ejs', {
                albums: data,
                searchText: req.body.searchTitle,
                user: req.user
            })
        })
        .catch(err => {
            res.render('error.ejs', {errors: [err]})
        })
})

module.exports = router