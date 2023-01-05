const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
    // _id: String,
    googleId: String,
    email: String,
    password: String,
    fName: String,
    lName: String,
    branch: String,
    year: String,
    noOfDoubtsAsked: Number,
    noOfDoubtsAnswered: Number,
    isAdmin: Boolean,
    avatar: String
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model("users", userSchema);

// const userSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     fName: {
//         type: String,
//         required: true,
//     },
//     lName: {
//         type: String,
//         required: true,
//     },
//     branch: {
//         type: String,
//         required: true,
//     },
//     year: {
//         type: String,
//         required: true,
//     },
// })

// module.exports = mongoose.model("users", userSchema);