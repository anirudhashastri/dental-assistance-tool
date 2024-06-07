// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user && req.session.user) {
        return next();
    }
    res.redirect('/auth/login');
}

module.exports = {
    isAuthenticated
};