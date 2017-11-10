module.exports = {
    checkAuth: function(req, res, next) {
        if(!req.user) return res.sendStatus(401)
        next();
    },
    checkAdmin: function(req, res, next) {
        if (!req.user) return res.sendStatus(401);
        if (req.user.role !== 'admin') return res.sendStatus(403);
        next();
    }
}