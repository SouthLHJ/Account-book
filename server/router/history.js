import express from "express";
import jwt from "jsonwebtoken";

import accountBookShema from "../model/AccountBook.js";

const router = express.Router();

//미들웨어
//auth token checking
/*
router.use((req,res,next)=>{
    // console.log(req.headers)
    const authorizaion = req.get("Authorization");

    // 토큰이 정상적으로 들어왔는지 확인
    if(!authorizaion || !authorizaion.startsWith("Bearer")){
        //401 : 권한없음
        return res.status(401).json({result : false, message : "unauthorized error"});
    }

    //토큰이 유효한 토큰인지 확인
    const token = authorizaion.split(" ")[1];
    try{
        const payload = jwt.verify(token,process.env.SECRET_KEY);
        req.logonEmail = payload.email;
    }
    catch(err){
        return res.status(401).json({result : false, message : "invaild token"});
    }


    next();
})
*/

//라우터
router.post("/search",(req,res)=>{
    // console.log(req.body);
    //클라이언트가 비동기이므로 토큰을 받아서 처리하게 만들기
    const data = jwt.verify(req.body.token,process.env.SECRET_KEY);

    let startdate = new Date(req.body.year,Number(req.body.mouth)-1)
    let enddate = new Date(req.body.year,Number(req.body.mouth))
    // console.log(startdate,enddate)

    accountBookShema.find({userid : data.email}).where("date").gte(startdate).lte(enddate).sort("date").lean()
     .then(rst =>{
        // console.log(rst)
        return res.status(200).json({result : true, datas: rst});
     })
     .catch(err=>{
        return res.status(200).json({result : false, datas: err.message});
     })
})

router.post("/write",(req,res)=>{
    // console.log(req.body);

    accountBookShema.create(req.body.data).then((rst)=>{
        // console.log(rst);
        return res.status(200).json({result : true, datas: rst});
    }).catch(err=>{
        console.log(err.message);
    })

})
router.post("/delete",(req,res)=>{
    // console.log(req.body);
    const data = jwt.verify(req.body.token,process.env.SECRET_KEY);
    const dltList = req.body.data;

    dltList.forEach(list => {
        accountBookShema.deleteOne({_id:list}).then(rst=>{
        })
        .catch((err)=>{
            return res.status(200).json({result : false})
        })
    });
    return res.status(200).json({result : true})
})

router.route("/report")
    .get((req,res)=>{
        console.log(req.query);
        const data = jwt.verify(req.query.token,process.env.SECRET_KEY);
        let startDate = Date.parse(req.query.startDate);
        let endDate = Date.parse(req.query.endDate);
        // console.log("시작날짜 끝 날짜 : ",startDate,endDate);
        accountBookShema.find({userid: data.email}).where("date").gte(startDate).lte(endDate).sort("date").lean()
            .then(rst=>{
                return res.status(200).json({result : true, datas:rst})
            })
    })
    .post((req,res)=>{
        // console.log(req.body)
        const data = jwt.verify(req.body.token,process.env.SECRET_KEY);
        let startDate = Date.parse(req.body.startDate);
        let endDate = Date.parse(req.body.endDate);
        let category = req.body.category;
        let cash = req.body.cash;
        let search  = {
            userid : data.email,
        }
        if(category.length !== 0){
            search.category = {$in : category};
        }

        if(cash.length !== 0){
            search.cash = {$in : cash};
        }
        // console.log(search);
        accountBookShema.find(search).where("date").gte(startDate).lte(endDate).sort("date").lean()
            .then(rst=>{
                return res.status(200).json({result : true, datas:rst})
            })
    })

// Edit
router.post("/edit",(req,res)=>{
    // console.log(req.body);
    let editDatas = {};
    req.body.datas.forEach((data)=>{
        editDatas[data.field] = data.value;
    })
    // console.log(editDatas);
    accountBookShema.findByIdAndUpdate(req.body.id,editDatas,{returnDocument : "after"})
    .then((rst)=>{
        return res.status(200).json({result : true, datas:rst})
    })
})

export default router;