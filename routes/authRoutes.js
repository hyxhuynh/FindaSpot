function logOut(req, res) {
    req.session.destroy(function() {
        res.redirect("/");
    });
}

function auth(req, res) {
    var obj = {};
    if (req.session && req.session.messages) {
        obj.failMessage = req.session.messages;
        delete req.session.messages;
    }
    res.render("auth", obj);
}

module.exports = function(app, passport) {
    app.get("/auth", auth);

    app.post("/register", passport.authenticate("local-register", {
        successRedirect: "/",
        successMessage: true,
        failureRedirect: "/auth",
        failureMessage: true//this causes the message property of the final object passed to done() in passport.js to be added to req.session.messages
    }));

    app.post("/login", passport.authenticate("local-login", {
        successRedirect: "/",//not setting this causes the user to be redirected to the page they originally requested upon completion of authentication
        successMessage: true,
        failureRedirect: "/auth",
        failureMessage: true//this causes the message property of the final object passed to done() in passport.js to be added to req.session.messages
        //failureRedirect: "/auth?action-login-fail",
    }));
    app.get("/logout", logOut);
};