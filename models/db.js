const pgp = require('pg-promise')({})
const db = pgp(process.env.DATABASE_URL)

module.exports = {
    albums: {
        getAll: function () {
            return db.query('SELECT * FROM albums')
        },
        getByTitle: function (title) {
            return db.query("SELECT * FROM albums WHERE title ILIKE '%$1:value%'", [title])
        },
        getById: function (id) {
            return db.query('SELECT * FROM albums WHERE id=$1', [id])
        },
        add: function (album) {
            return db.query(
                'INSERT INTO albums(title, description, rating, release_date, image) VALUES($1, $2, $3, $4, $5)',
                [album.title, album.description, album.rating, album.release_date, album.image]
            )
        },
        remove: function (id) {
            return db.query('DELETE FROM albums WHERE id=$1', [id])
        }
    },
    users: {
        getAll: function() {
            return db.query("SELECT * FROM users")
        },
        getForCredentials: function (username, passwordHash) {
            return db.query("SELECT * FROM users WHERE username=$1 AND password_hash=$2", [username, passwordHash])
        },
        getById: function (id) {
            return db.query('SELECT * FROM users WHERE id=$1', [id])
        },
        add: function (user) {
            return db.query(
                'INSERT INTO users(username, password_hash, role) VALUES($1, $2, $3)',
                [user.username, user.passwordHash, user.role]
            )
        }
    }
}