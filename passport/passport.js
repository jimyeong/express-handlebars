//
// const LocalStretegy = require("passport-local").Strategy;
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// require("../models/users");
// const User = mongoose.model("user");
//
// module.exports = function (passport) {
//     passport.use(new LocalStretegy({
//         usernameField: 'email',
//         passwordField: 'password'
//     },function (email, password, done) {
//         User.findOne({email: email}, (err, user) => {
//             if (err) return done(err);
//             if (!user) {
//                 return done(null, false, {message: "no user found!"})
//             }
//             if (user) {
//                 bcrypt.compare(password, user.password)
//                     .then(isMatched => {
//                         console.log("isMatched: " + isMatched);
//                         // 일치하는 결과가 있으면 유저를 리턴한다.
//                         if(isMatched){
//                             console.log("user: ", user);
//                             return done(null, user)
//                         };
//                         if(!isMatched) return done(null, false,{message: "password is incorrect!"});
//                     }).catch(err => {
//                     done(err);
//                 })
//             }
//         })
//     }));
//     passport.serializeUser(function (user, done) {
//         done(null, user.id);
//     });
//     passport.deserializeUser(function (id, done) {
//         User.findById(id, function (err, user) {
//             done(err, user);
//         });
//     });
// }
//
//
