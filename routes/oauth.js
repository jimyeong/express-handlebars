const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../passport/passport-kakao")(passport);


// const REDIRECT_URI = "localhost:3000/oauth/kakao/callback";
// const query = `${HOST}/oauth/authorize?client_id=${passport.kakao.clientID}&redirect_uri=${passport.callbackURL}&response_type=code HTTP/1.1`

// kakao login
router.get("/kakao", passport.authenticate("kakao"));

// 내가 로그인 구현할 때는 post 로 날렸지만
// 카카오에서 데이터 보내줄 떄는 get으로 온다.
router.get("/", passport.authenticate("kakao", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    failureFlash: true
}));


module.exports = router;
