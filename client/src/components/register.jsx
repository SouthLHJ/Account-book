import { useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import calender from "../func/calender.js"

function Register(props) {
    const [register, setRegister] =useState(false);

    const email = useRef();    
    const password = useRef();   
    const name = useRef();    
    const nick = useRef();    
    const birthY = useRef();    const birthM = useRef();    const birthD = useRef();
    const gender = useRef();
    const navigate = useNavigate();
    // let account = accountApi("192.168.4.35:8080");

    const handleSubmit = (evt)=>{
        evt.preventDefault();
        let birth = `${birthY.current.value}-${birthM.current.value}-${birthD.current.value}`
        props.accountApi
            .accountRegister(email.current.value,password.current.value,name.current.value,nick.current.value,gender.current.value,birth)
            .then(rcv =>{
                console.log(rcv);
                if(rcv.result){
                    setRegister(true);
                }
            })
    }

    if(register){
        return(
            <div>
                <h3>회원가입에 성공했습니다. 버튼을 누르면 로그인 창으로 넘어갑니다.</h3>
                <button onClick={()=>{setRegister(false);navigate("/login");}}>확인</button>
            </div>
        )

    }else{
        return ( 
            <div>
                <p className="register title">회원가입</p>
                <form action="/login" onSubmit={handleSubmit}>
                    {/* 이메일 */}
                    <div className="form-floating mb-3 mt-3">
                        <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" ref={email}/>
                        <label htmlFor="email">이메일(필수)</label>
                    </div>
                    {/* 비밀번호 */}
                    <div className="form-floating mt-3 mb-3">
                        <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" ref={password}/>
                        <label htmlFor="pwd">비밀번호(필수)</label>
                    </div>
                    {/* 이름 */}
                    <div className="form-floating mt-3 mb-3">
                        <input type="text" className="form-control" id="name" placeholder="Enter name" name="name" ref={name}/>
                        <label htmlFor="name">이름</label>
                    </div>
                    {/* 별명 */}
                    <div className="form-floating mt-3 mb-3">
                        <input type="text" className="form-control" id="nick" placeholder="Enter nick" name="nick" ref={nick}/>
                        <label htmlFor="nick">별명</label>
                    </div>
                    {/* 성별 */}
                    <div className="form-floating mt-3 mb-3">
                        <p>성별</p>
                            <select className="form-select gender" ref={gender}>
                                <option>선택안함</option>
                                <option>남성</option>
                                <option>여성</option>
                            </select>
                    </div>
                    {/* 생년월일 */}
                    <div className="form-floating mt-3 mb-3">
                        <p>생년월일</p>
                        <div className="registerSelect">
                            <select className="form-select register" ref={birthY}>
                                {calender.yearOption}
                            </select>
                            <select className="form-select register" ref={birthM}>
                                {calender.mouthOption}
                            </select>
                            <select className="form-select register" ref={birthD}>
                                {calender.dayOption}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="login  btn btn-primary btn-block login">Submit</button>
                    <br/>
                </form> 
            </div>
        );
    }
}

export default Register;