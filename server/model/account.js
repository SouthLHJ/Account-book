import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
    // unique 설정을하면 집어넣으려고하면 겹치는게 있으면 error가 발생한다. 
    // 이것을 이용해서 사용 중인 이메일이라는 것을 판단하기 편해짐.
    email : {type : String, unique : true},
    password : {type : String, required : true},
    name : {type : String, required : true},
    nick : String,
    gender  : String,
    birth : String,
    createdAt : {type:Date,default: Date.now}
});
 
export default mongoose.model("account",accountSchema)