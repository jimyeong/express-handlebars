const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// provider,email,username,displayName,avatar,id
const UserKakaoSchema = new Schema({
    provider: {
        type: String,
        required: true
    },
    email: {
        type: String,

    },
    username: {
        type: String,
        required: true
    },
    displayName: {
        type: String,

    },
    avatar: {
        type: String,
    },
    id: {
        type: String,
        required: true
    },
    _raw: {
        type: String,
    },
    _json: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


// mongoose.model("kakaoUser", UserKakaoSchema);