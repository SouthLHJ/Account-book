import dotenv from "dotenv";

import jwt from "jsonwebtoken";

const secret = "3Rw1dWKz3eh$Rp4I6KUwtCi9BiTlQPIT"

// 토큰 유효값 설정 (단위 : 5초)
const token = jwt.sign({subject : "backend"},secret,{expiresIn:5});

setInterval(() => {
    const r = jwt.verify(token,secret);
    console.log(r)
}, 1000);

