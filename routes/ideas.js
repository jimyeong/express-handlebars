const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/ideas");
const Idea = mongoose.model("idea");

// index
router.get("/", (req, res)=>{
    Idea.find({user:"jimmy"}, (err, ideas)=>{
        if(err)throw err;
        if(!err){
            res.render("ideas/index", {ideas: ideas});
        }
    })
})

// add
router.get("/add", (req, res)=>{
    res.render("ideas/add");
})

router.get("/edit/:id", (req, res)=>{
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
router.put("/:id", (req, res)=>{

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
router.post("/", (req, res)=>{
    let errors =[];
    if(!req.body.title){
        errors.push({text: "please add a title"})

    }
    if(!req.body.detail){
        errors.push({ext: "please add a detail"})
    }
    if(errors.length > 0){
        res.render("ideas/index", {
            // handlebar 에서 객체들 다 까서 열어보는 것 같은데
            errors: errors,
            title: req.body.title,
            detail : req.body.detail
            // user id
        });
    }else{
        /**

         * 로그인하면 이름 채워 넣을것
         * @type {{detail: ({type: StringConstructor, required: boolean}|T|number|T), title: string | {type: *, required: boolean}, user: string}}
         */
        const newIdea = {
            title: req.body.title,
            detail: req.body.detail,
            user: req.username
        }
        new Idea(newIdea)
            .save()
            .then(idea=>{
                // res.flash("sucess_msg", "video idea added");
                res.redirect("/ideas");
            })
    }

    // mongodb connect
    // mongodb model(schema)
    // render data

})


module.exports = router;
