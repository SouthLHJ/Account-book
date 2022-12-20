// const express = require("express")
// const apiRouter = require( "./router/api.js")

// package.json = > "type": "module", 추가하면 import from 사용가능하게된다.
import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import account from "./router/account.js";
import history from "./router/history.js";

const app = express();

app.use(cors());
app.use(morgan("[Server] :method :url :status (:response-time ms)"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/account",account);
app.use("/api/history",history);



app.listen(8080,()=>{
    console.log("[Server] Start");
})


!async function(){
    dotenv.config({path : `${process.cwd()}/.env`});
    const uri = process.env.MONGODB_URI;
    // console.log(uri)
    await mongoose.connect(uri, {dbName : "exam"})
}();

/*  사용하는 npm

    cors : 외부에서 통신을 신청할 때 보안에 걸리지않게 풀어주는 용도
    morgan : 외부에서 통신을 접속했을 때 그 상태값을 알기위한 용도
    express
    mongoose
    mongodb
    bcrypt  : 받아온 정보를 암호화하는 모듈
    dotenv : 중요한 키값들을 숨기기위한 파일
    jsonwebtoken : 로그인이 성공했을 때, logged상태를 session에 저장하지않고 토큰에 저장해놓고 사용하게한다.
                   서버에서 토큰을 클라이언트에게 보내고(권한), 
                   클라이언트가 나중에 요청을 보낼때마다 권한도 같이 보내서 서버에서 권한을 체크해서 처리를 하게 한다.
                   장점 : 
                    - 서버에서 권한을 저장할 필요가 없어진다.
                    - 한 개의 서버가 여러개의 권한이 필요한 사이트를 관리하게 되면, 클라이언트가 각자 다른 기기로 통신을 하려할 때 통과상태인 것을 
                      관리하기 편해진다.
                   단점 : 
                    -  

*/