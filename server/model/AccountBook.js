import mongoose from "mongoose";

const accountBookShema = new mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    type : String,
    date : {type : Date},
    cash : {type : String, default : "charge"},
    price : Number,
    category : {
        type : String,
        default : "미분류"
    },

    comment : String


})

export default new mongoose.model("book",accountBookShema)