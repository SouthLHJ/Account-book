import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";


function Login(props) {
    localStorage.removeItem("token")
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const [error,setError] = useState();

    //로그인 버튼
    const handleSubmit = (evt)=>{
        evt.preventDefault();
        props.accountApi
            .auth(email.current.value,password.current.value)
            .then(rcv =>{
                // console.log(rcv);
                if(rcv.result){
                    props.setLogged(true)
                    localStorage.setItem("token",rcv.token);
                    setError(null);
                    navigate("/history");
                }else{
                    setError(rcv.message);
                }

            })
    }


    //회원가입 버튼
    const handleRegister = ()=>{
        navigate("/register");
    }

    return ( 
        <div id="loginArea">
            <p className="login title">로그인</p>
            <form action="/Main" onSubmit={handleSubmit}>
                <div className="form-floating mb-3 mt-3">
                    <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" ref={email}/>
                    <label htmlFor="email">이메일</label>
                </div>
                <div className="form-floating mt-3 mb-3">
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd" ref={password}/>
                    <label htmlFor="pwd">비밀번호</label>
                </div>
                <p>{error}</p>
                <button type="submit" className="login  btn btn-primary btn-block login">Submit</button>
                <br/>
            </form> 
                <button className="login btn btn-primary btn-block register" onClick={handleRegister}>Register</button>
        </div>
    );


}

export default Login;