function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { //checks if someone is authenticated if not it redirects to the auth route
        return next();
    }

    res.redirect("/auth");
}

module.exports = {
    isLoggedIn: isLoggedIn
};