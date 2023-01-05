require("./db/config");
const User = require("./db/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            // callbackURL: "http://localhost:5000/auth/google/callback",
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        function (accessToken, refreshToken, profile, cb) {
            // callback(null, profile);
            console.log(profile);
            User.findOrCreate({ googleId: profile.id },{ email: profile.emails[0].value, avatar: profile.photos[0].value }, function (err, user) {
                return cb(err, user);
            });
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });


passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});