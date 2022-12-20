import bcrypt from "bcrypt";


!async function(){
    const plain = "1q2w3e4r";
    //hash알고리즘을 이용해서 원문을 특수한 문자로 전환한다. salt는 .env에 저장

    // bcrypt.hash(plain,11,(err,data)=>{
    //     console.log("err : ",err)
    //     console.log("data : ",data)
    // });
    let salt = 10;
    const rst = await bcrypt.hash(plain, salt);
    console.log("rst : ", rst )

    //체크하는 방법
    const check = await bcrypt.compare(plain,rst);
    console.log(check)

}()