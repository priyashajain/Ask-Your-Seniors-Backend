const mongoose = require("mongoose");

// mongoose.connect("mongodb+srv://admin-priyasha:test100@cluster0.whdvt.mongodb.net/cb10ver10");
mongoose.connect(`${process.env.MONGO_URI}`);