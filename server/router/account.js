// const  express = require("express");
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import accountSchema from "../model/account.js";

const router = express.Router();

router.post("/auth",(req,res)=>{
    console.log(req.body);
    console.log(process.env.SECRET_KEY);

    accountSchema.findOne({"email" : req.body.email}).lean()
     .then((rst)=>{
        // console.log("rst : ",rst)
        let check;
        if(rst !== null){
            check = bcrypt.compareSync(req.body.password,rst.password)
        }else{
            check = false;
        }
        return {rst, check}
     })
     .then((snd)=>{
        console.log("snd : ",snd)
        if(snd.check){
            const token = jwt.sign({email:snd.rst.email},process.env.SECRET_KEY,{expiresIn : 60*60*12})
            res.status(200).json({result : true , message : snd.rst, token})


        }else{
            res.status(401).json({result : false , message : "아이디 또는 비밀번호를 잘못 입력했습니다. 입력한 내용을 다시 확인해주세요" })
        }
     })
     .catch((err)=>{
        console.log(err.message);
        res.status(401).json({result : false , message : "오류가 발생했습니다." })
     })
})

router.post("/register",async(req,res)=>{
    console.log(req.body);
    // console.log(process.env.SALT)
    
    if(!req.body){
        res.status(401).json({result : false, message : "정보를 받아오지 못했습니다."})
    }

    if(!req.body.password){
        res.status(401).json({result : false, message : "비밀번호를 입력하세요"})
    }
    const password = await bcrypt.hash(req.body.password,Number(process.env.SALT))
    // console.log(password)
    try{
        const rst = await accountSchema.create({...req.body,password : password})
        console.log(rst)
        res.status(200).json({result : true , message : rst})
    }        
    catch(err){
        // console.log(err);
        if(err.code == 11000){
            res.status(401).json({result : false, message : "이미 있는 이메일입니다."})
        }else if(err.errors.password || err.errors.name){
            res.status(401).json({result : false, message : "비밀번호 또는 이름을 필수로 입력하세요"})
        }else{
            console.log(err.message);
            res.status(401).json({result : false, message : "오류로 인해 다시 가입해주세요"})
        }
    }
})



router.post("/vaild",async(req,res)=>{
    // console.log(req.body);
    try{
        const data = jwt.verify(req.body.token,process.env.SECRET_KEY);
        // console.log(data)
            res.status(200).json({result:true,email :data.email})
    }catch(err){
        console.log(err.message)
        res.status(401).json({result:false})
    }
})

export default router;


/*
email : "dlgpwn2@naver.com"
pw  : "123"
*/