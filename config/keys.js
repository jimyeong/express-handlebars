const kakaoKeys = {
    clientID: "d783488afb7b9c59832aa6e231582ec2",
    callbackURL: "http://localhost:5000/oauth/",
    clientSecret: "",
    host: "kauth.kakao.com"
}
const sessionConfig = {
    secret: "jimmy",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 180}
}

// kakao keys
let config = {
    kakao: kakaoKeys,
    sessionConfig: sessionConfig
}

module.exports = config;

