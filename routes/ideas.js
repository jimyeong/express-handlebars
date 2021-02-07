const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/ideas");
const Idea = mongoose.model("idea");
const {checkIfAuthenticated}  = require("../helper/auth");

// index
// ideas page
router.get("/", checkIfAuthenticated,(req, res)=>{
    let state = {};
    state.error_msg = req.flash("error_msg");
    state.success_msg = req.flash("success_msg");
    state.errors = req.flash("req");
    Idea.find({user:"jimmy"}, (err, ideas)=>{
        if(err)throw err;
        if(!err){
            state.ideas = ideas;
            res.render("ideas/index", state);
        }
    })
})

// add
router.get("/add", checkIfAuthenticated,(req, res)=>{
    res.render("ideas/add");
})

router.get("/edit/:id", checkIfAuthenticated,(req, res)=>{
   Idea.findOne({_id: req.params.id}, (err, idea)=>{
       if(err)throw err;
       if(!err){
           // db 탐색을 했으니깐, 찾은경우 못찾은 경우 나눠야 함.
           // session이 없다면,
           /**
            * @here
            * 로그인 기능을 붙인 후에, 이부분을 이어간다.
            */
           if(idea){
               // edit/ 쓰면 틀린다.
               res.render("ideas/edit", idea);
           }
       }
   })
})

// put
router.put("/:id", checkIfAuthenticated,(req, res)=>{

    // url 창에서 치는건 get 메서드이기 떄문에 put메서드 스코프로 들어올 수 가 없다.
    // 즉 새로고침을 통해서는 put 메서드를 사용할 수 없다는 뜻

    const id = req.params.id;
    const newIdea = {
        title: req.body.title,
        detail:req.body.detail,
        user: "jimmy",
        date: Date.now()
    }
    console.log(`newIdea: ${newIdea.detail}`);

    // db 에서 아이디를 가지고 조회해야 한다.
        // 해당 id가 있는 경우와 없는 경우
    Idea.findOne({_id: id}, (err, idea)=>{
        if (err)throw err;
        if(!err){
            idea.title=newIdea.title;
            idea.detail = newIdea.detail;
            idea.user = newIdea.user;
            idea.date = newIdea.date;
            idea.save().then(idea=>{
                // req.flash
                res.redirect("/ideas");
            })
        }
    })
    // 조회를 해서, 해당 아이디의 데이터를 수정해야 한다.
})

// post
router.post("/", checkIfAuthenticated,(req, res)=>{
    let errors =[];
    if(!req.body.title){
        errors.push({text: "please add a title"})
    }
    if(!req.body.detail){
        errors.push({ext: "please add a detail"})
    }
    if(errors.length > 0){
        let request = {
            // handlebar 에서 객체들 다 까서 열어보는 것 같은데
            errors: errors,
            title: req.body.title,
            detail : req.body.detail
            // user id
        };
        req.flash("error_msg", "error occurs!")
        req.flash("res", request);

        res.redirect("/ideas");


        // res.render("ideas/index", );

    }else{
        /**
         * 로그인하면 이름 채워 넣을것
         * @type {{detail: ({type: StringConstructor, required: boolean}|T|number|T), title: string | {type: *, required: boolean}, user: string}}
         */
        const newIdea = {
            title: req.body.title,
            detail: req.body.detail,
            user: req.user.username
        }
        console.log(newIdea);

        new Idea(newIdea)
            .save()
            .then(idea=>{
                // res.flash("sucess_msg", "video idea added");
                res.redirect("/ideas");
            })
    }
})

router.delete("/delete/:id", (req, res)=>{
    Idea.findOne({_id: req.params.id})
        .then(idea=>{
            idea.delete();
            req.flash("success_msg", "the post has been deleted");
            res.redirect("/ideas");
        })
        .catch(err=>{
            req.flash("error_msg", "any message has even found")
            res.redirect("/ideas");
        })

    // 데이터베이스에서 찾는다
    // 있으면 지운다.
    // 없으면 에러



})


module.exports = router;
