
const KakaoStrategy = require('passport-kakao').Strategy;
const config = require("../config/keys");

module.exports = function (passport) {
    passport.use(new KakaoStrategy({
        clientID: config.kakao.clientID,
        clientSecret: "", // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
        callbackURL: config.kakao.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);

    }))
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
}