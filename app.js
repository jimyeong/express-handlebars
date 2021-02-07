const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const _handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = 5000;
const path = require("path");

// routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");


const app = express();

// 전역 스코프에 등록하고 싶은 게 있으면
// req.locals 에 등록하면 된다.

//  굳이 왜 거기 등록했는 지 모르겠네.

if (app.get("env") === "development") {

    // mongodb connected
    mongoose.connect("mongodb://localhost/jimmy-vidjot-dev", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("mongo db is connected")
    }).catch(err => console.log("error: " + err));
}
if (app.get("env") !== "development") {

}

// handlebars setting
let hbs = exphbs.create({
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    helpers: require("./helper/handlebarsHelper")(_handlebars)
})

// middlewares
app.engine("handlebars", hbs.engine);

app.set("view engine", "handlebars");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: "jimmy",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 180 }
}));
app.use(flash());

// express에 셋팅
// passport middleware
app.use(passport.initialize());
app.use(passport.session());


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// global variables!
app.use(function (req, res,next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
})

app.get("/", (req, res) => {
    // a||b a가 true면 a 를 반환, 아니면 b를 반환
    const state = {};
    const title = "hi there:)"
    state.title = title;
    state.message = req.flash("message");
    state.user = req.user;
    console.log(state);
    res.render("index", state);
})

app.get("/about", (req, res) => {
    res.render("about");
})

// ideas route set up
app.use("/ideas", ideas);
app.use("/users", users);

// users routes set up
// app.use("/users", users);


app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})



