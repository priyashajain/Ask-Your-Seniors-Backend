// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const passport = require("passport");
// const authRoute = require("./routes/auth");
// const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");
// const app = express();

// app.use(
// 	cookieSession({
// 		name: "session",
// 		keys: ["cyberwolve"],
// 		maxAge: 24 * 60 * 60 * 100,
// 	})
// );

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: "GET,POST,PUT,DELETE",
// 		credentials: true,
// 	})
// );

// app.use("/auth", authRoute);

// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listenting on port ${port}...`));





// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");

// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.CLIENT_ID,
// 			clientSecret: process.env.CLIENT_SECRET,
// 			callbackURL: "/auth/google/callback",
// 			scope: ["profile", "email"],
// 		},
// 		function (accessToken, refreshToken, profile, callback) {
// 			callback(null, profile);
// 		}
// 	)
// );

// passport.serializeUser((user, done) => {
// 	done(null, user);
// });

// passport.deserializeUser((user, done) => {
// 	done(null, user);
// });