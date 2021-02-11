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
const config = require("./config/keys");
const path = require("path");


// routes
const ideas = require("./routes/ideas");
const users = require("./routes/users");
const oauth = require("./routes/oauth");


const db = require("./config/database");

const app = express();

// 전역 스코프에 등록하고 싶은 게 있으면
// req.locals 에 등록하면 된다.


// mongodb connected
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("mongo db is connected")
}).catch(err => console.log("error: " + err));

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
app.use(session(config.sessionConfig));
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
    console.log("state: ", state);
    res.render("index", state);
})

app.get("/about", (req, res) => {
    res.render("about");
})

// ideas route set up
app.use("/ideas", ideas);
app.use("/users", users);
app.use("/oauth", oauth);

// users routes set up
// app.use("/users", users);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})



