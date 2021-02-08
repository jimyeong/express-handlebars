const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userKakaoSchema = new Schema({
    id:{
        type:String,
        required:true
    },
    _raw:{
        type: String,
        required: true
    },
    _json: {
        type: String,
        required: true
    }
})


mongoose.model("kakaoUser", userKakaoSchema);