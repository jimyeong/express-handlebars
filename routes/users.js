const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("../models/users");
const User = mongoose.model("user");


router.get("/login", (req, res) => {
    let params = {};
    params.page = "login"
    // 로그인 페이지
    res.render("users/login", params);
})

router.post("/login", (req, res) => {
    // 로그인 이후 처리


})


router.get("/register", (req, res) => {
    // 회원가입 패이지
    let params = {};
    params.page = "register"
    // flash는 Map 과 같은 구조로 동작함
    // 키를 입력하면 데이터를 꺼내올 수 맀음

    params.errors = req.flash("error_msg");
    res.render("users/register", params);
})

router.post("/register", (req, res) => {
    // 회원가입 이후처리
    // validation check
    let errors = [];
    let body = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passwordConferm: req.body.passwordConferm
    }
    const user = new User({
        username: body.username,
        email: body.email,
        password: body.password,
        passwordConferm: body.passwordConferm
    })


    if (body.password.length < 4) {
        errors.push({text: "password is too short"});
    }
    if (body.password !== body.passwordConferm) {
        errors.push({text: "passwords are not matched"});
    }
    if (errors.length > 0) {
        // redirect로 바꾸기 위해서 flash 를 전역변수로 등록해놔야 한다.
        // redirect는 인자를 안받음, 받긴 받는 데, flag 형태로 주어야 한다.

        res.render("users/register", {errors: errors});
    } else {


        console.log(user.email);
        // id check
        User.findOne({email: user.email}, (err, isDuplicatedId) => {

            if (isDuplicatedId) {
                //flash msg should be added
                // flash message save
                req.flash("error_msg", "this accounts already exists");
                res.redirect("/users/register")
            };

            if (!isDuplicatedId) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(user.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
                        user.save((err) => {
                            if (err) throw err;

                            res.redirect("/users/login");
                        })

                    })
                })
            }
        });
    }
    // db 저장
    // redirection to login
})

module.exports = router;