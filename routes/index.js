const express = require('express')
const router = express.Router()

router.use('/albums', require('./albums'))
router.use('/user', require('./user'))
router.use('/profiles', require('./profiles'))

router.get('/', (req, res) => {
    res.render('index.ejs', { user: req.user })
})

module.exports = router