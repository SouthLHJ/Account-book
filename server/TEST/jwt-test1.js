import dotenv from "dotenv";

import jwt from "jsonwebtoken";
/*
    jwt.sign(바디, 암호화키)

    lastpass.com -> how it work -> passwordgenerater
*/
const secret = "3Rw1dWKz3eh$Rp4I6KUwtCi9BiTlQPIT"
const W_secret = "6Rw1dWKz3eh$Rp4I6KUwtCi9BiTlQPIT"

const token = jwt.sign({subject : "backend", title: "jwt"},secret);

console.log(token)

//유효성 검사 (특정 키를 통해서 데이터를 확인해보는 것이라서 키를 모르면 값을 모르게된다.)
const result = jwt.verify(token,secret);
console.log(result);
//임의적으로 손을 댄 토큰값. 
const v_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoiZnJvbnRlbmQiLCJ0aXRsZSI6Imp3dCIsImlhdCI6MTY2MTQwMzU3MH0.h7pzFgBk3LWquVzPkr5eSyQVazTov-hEkEIytRgVy30"
console.log(jwt.verify(v_token,secret)); // < 결과값은 서명형태가 바뀌기때문에 에러가 발생하게 된다. 
                                        // 이 말은 즉, 토큰 값을 손대서 해킹을 하려한다면? 문제가 발생하게된다는 말? 보안이 철저하다는 말.



//원상복구
// jwt.decode
