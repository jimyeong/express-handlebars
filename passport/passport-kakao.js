
const KakaoStrategy = require('passport-kakao').Strategy;
const config = require("../config/keys");

// TypeError: OAuth2Strategy requires a clientID option
// kakaoStrategy passport 를 잘 전달해주지 않으면 이렇게 된다.


module.exports = function (passport) {
    passport.use(new KakaoStrategy({
        clientID: config.kakao.clientID,
        clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL: config.kakao.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        console.log(`access Token: ${accessToken}`);
        console.log(`refesh Token: ${refreshToken}`);
        console.log(profile);
        done(null, profile);
    }))
}