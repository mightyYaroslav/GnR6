const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../models/db')
const { sha512 } = require('../helpers/util')
const serverSalt = process.env.SERVER_SALT

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    db.users.getById(id)
        .then(users => {
            const user = users[0]
            if(!user) done("No user")
            else done(null, user)
        })
})

passport.use('local-login', new LocalStrategy((username, password, done) => {
    const passwordHash = sha512(password, serverSalt).passwordHash
    db.users.getForCredentials(username, passwordHash)
        .then(users => {
            const user = users[0]
            if(!user) {
                console.log('Here')
                return done("No user", false)
            } else {
                console.log('There')
                return done(null, user)
            }
        })
        .catch(err => done(err, false))
}))