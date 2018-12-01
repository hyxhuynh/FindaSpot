
// function signUp(req, res) {
//     res.render('signup');
// }

// function signIn(req, res) {
//     res.rendfer('signin');
// }

function logOut(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/");
    });
}

function auth(req, res) {
    res.render("auth", {});
}

module.exports = function(app, passport) {
    app.get("/auth", auth);
    // app.get('/signup', signUp);
    // app.get('/signin', signIn);
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/auth#signup"
    }));
    app.post("/signin", passport.authenticate("local-signin", {
        successRedirect: "/",
        failureRedirect: "/auth#signin"
    }
    ));
    app.get("/logout", logOut);
};