require("dotenv").config();
const express = require("express");
require("./db/config");
const User = require("./db/User");
const Question = require("./db/Question");
const Answer = require("./db/Answer");
const session = require('express-session');
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
// const bcrypt = require("bcrypt");


const app = express();
app.use(express.json());              //middleware
app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', 1);

app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
        sameSite: "none",
        secure: true
	})
);

// app.use(session({
//     secret: "Our little secret.",
//     resave: false,
//     saveUninitialized: false
//   }));

app.use(passport.initialize());
app.use(passport.session());



app.use(
	cors({
		origin: "https://ask-your-seniors.vercel.app",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);



// app.use(cors());

const saltRounds = 10;

app.use("/auth", authRoute);








app.get("/", (req, res) => {
    res.send("app is working");
});





app.get("/user/:id", async (req, res) => {
    // let result = await User.findOne({ email: req.params.id });
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }

});

app.get("/question/:id", async (req, res) => {
    let result = await Question.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No question found" });
    }

});

app.get("/answers/:questionid", async (req, res) => {
    let answers = await Answer.find({ 'question._id': req.params.questionid });
    // if (answers.length>0) {
    //     res.send(answers);
    // }
    // else {
    //     res.send({ "result": "No answers found" });
    // }



    res.send(answers);

});


app.get("/questions-from-user-id/:userid", async (req, res) => {                              //for my questions
    let questions = await Question.find({ 'user._id': req.params.userid });
    // if (questions.length>0) {
    //     res.send(questions);
    // }
    // else {
    //     res.send({ "result": "No answers found" });
    // }



    res.send(questions);

});


app.get("/answers-from-user-id/:userid", async (req, res) => {                                //???????????????
    let answers = await Answer.find({ 'user._id': req.params.userid });
    // if (answers.length>0) {
    //     res.send(answers);
    // }
    // else {
    //     res.send({ "result": "No answers found" });
    // }


    res.send(answers);

});


app.get("/question-from-answer-id/:answerid", async (req, res) => {                                  //i think this one's not needed???????????????
    let question = await Question.findOne({ 'user._id': req.params.answerid });
    if (question) {
        res.send(question);
    }
    else {
        res.send({ "result": "No answers found" });
    }

});



app.get("/users", async (req, res) => {
    let users = await User.find();
    if (users.length > 0) {
        res.send(users);
    }
    else {
        res.send({ result: "No users found" });
    }

});

app.get("/questions", async (req, res) => {
    let questions = await Question.find();
    // if (questions.length>0) {
    //     res.send(questions);
    // }
    // else {
    //     res.send({ result: "No users found" });
    // }


    res.send(questions);


});

app.get("/all-answers", async (req, res) => {
    let answers = await Answer.find();
    res.send(answers);

});


app.delete("/delete-answer/:id", async (req, res) => {
    let result = await Answer.deleteOne({ _id: req.params.id });
    res.send(result);
});


app.delete("/delete-question/:id", async (req, res) => {
    let result = await Question.deleteOne({ _id: req.params.id });
    res.send(result);
});


app.put("/update-answer/:id", async (req, res) => {
    let result = await Answer.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})


app.put("/update-question-approved/:id", async (req, res) => {
    let result = await Question.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})


app.put("/update-answer-approved/:id", async (req, res) => {
    let result = await Answer.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})

app.put("/update-answer-solved/:id", async (req, res) => {
    let result = await Answer.updateOne(
        { _id: req.params.id },
        {
            // $set : {content: req.body}
            $set: req.body
        }
    );

    res.send(result);
})


app.post("/createquestion", async (req, res) => {
    let question = new Question(req.body);             //???????if req.body.user.fName, then only save???????
    let result = await question.save();
    result = result.toObject();
    // delete result.password;      
    res.send(result);
})


app.post("/createanswer", async (req, res) => {
    let answer = new Answer(req.body);
    let result = await answer.save();
    result = result.toObject();
    // delete result.password;      
    res.send(result);
})


// app.post("/login", async (req, res) => {         
    
//     if (req.body.email && req.body.password) {       
        

//         let user = await User.findOne({email: req.body.email});
//         if (user) {
//             bcrypt.compare(req.body.password, user.password, function (err, resultBycrypt) {
//                 if (resultBycrypt === true) {
                    
//                     res.send(user);
//                 }
//                 else {
//                     res.send({ result: "No user found" });
//                 }

//             });
           
//         }
//         else {                                             
//             res.send({ result: "No user found" });
//         }



//     }
//     else {
//         res.send({ result: "No user found" });
//     }
// });


app.put("/user/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})



app.put("/update-user-approved/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})









app.put("/user-increment-noOfDoubtsAsked/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { 
            $inc: { noOfDoubtsAsked: 1 } 
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})



app.put("/user-increment-noOfDoubtsAnswered/:id", async (req, res) => {
    let result = await User.updateOne(
        { _id: req.params.id },
        { 
            $inc: { noOfDoubtsAnswered: 1 } 
        }
    );

    if (result) {
        res.send(result);
    }
    else {
        res.send({ "result": "No user found" });
    }
})



// app.post("/register", async (req, res) => {             

//     bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
//         let user = new User({
//             email: req.body.email,
//             password: hash,
//             isAdmin: false                   
//         });
//         let result = await user.save();
//         result = result.toObject();
//         delete result.password;
//         res.send(result);
//     });

// });


app.listen(5000, () => {
    console.log('App is running at port: 5000')
});

