const crypto = require('crypto')

module.exports = {
    strncmp: function (a, b, n) {
        return a.substring(0, n) === b.substring(0, n)
    },
    getExtension: function(filename) {
        return s.substring(filename.lastIndexOf('.') + 1)
    },
    sha512: function(password, salt) {
        const hash = crypto.createHash('sha512', salt)
        hash.update(password)
        const passwordHash = hash.digest('hex')
        return { salt, passwordHash }
    }
}