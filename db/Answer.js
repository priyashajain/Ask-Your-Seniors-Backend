const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    // _id: String,
    content: String,
    approved: Boolean,
    notified: Boolean,
    edited: String,
    // userId: String,
    user: {
        _id: String,
        email: String,
        // password: String,
        fName: String,
        lName: String,
        branch: String,
        year: String
    },
    // questionId: String
    question: {
        _id: String,
        content: String,
        category: String,
        user: {
            _id: String,
            email: String,
            // password: String,
            fName: String,
            lName: String,
            branch: String,
            year: String
        }
    }
});

module.exports = mongoose.model("answers", answerSchema);