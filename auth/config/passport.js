var bCrypt = require("bcrypt-nodejs"); //bCrypt is the what secures the password by hashing


module.exports = function(passport, user) { //here we initialize our passport strategies(authentication mechanisms)


    var User = user; //initalize the user model

    var LocalStrategy = require("passport-local").Strategy; //initialize and define the passport strategy (we'll customize it to our purposes later)

    //serialize //required by passport js so that a user.id is created and passport js uses this id to grab the user to authenticate
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // deserialize user -->puts it in to a format p
    passport.deserializeUser(function(id, done) {

        User.findById(id).then(function(user) { //uses the sequelize 'findByID' promise to grab the user and if successful starts a sequelize instance of the user model
            if (user) {
                done(null, user.get()); //gets the object from the sequelize instance
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use("local-register", new LocalStrategy( //.use in passport == define
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
            var generateHash = function(password) { //creates the hash password-->scrambles it
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.findOne({ //finds a user based on email
                where: {
                    email: email
                }
            }).then(function(user) {
                if (user) {
                    return done(null, false, {
                        message: "That email is already taken" //add modal here
                    });

                } else {
                    var userPassword = generateHash(password); //sets userPassword to the hashed password to protect info

                    var data = //data object for the user
                        {
                            email: email,
                            password: userPassword,
                            firstname: req.body.firstname,
                            lastname: req.body.lastname
                        };

                    User.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }
    ));

    //first argument = a string that identifies the strategy and  the 2nd argument the new strategy
    passport.use("local-login", new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
            var User = user;
            var isValidPassword = function(userpass, password) { //compares the passwords
                return bCrypt.compareSync(password, userpass);
            };

            User.findOne({
                where: {
                    email: email
                }
            }).then(function(user) {
                if (!user) {
                    return done(null, false, {
                        message: "Email does not exist" //create modal
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: "Incorrect password." //create modal
                    });
                }

                var userinfo = user.get();
                return done(null, userinfo);

            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: "Something went wrong with your Signin" //creat modal
                });
            });
        }
    ));
};

