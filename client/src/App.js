import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';

import Header from './components/header';
import Index from './components';
import Login from './components/login';
import Register from './components/register';
import History from './components/history';

import AccountApi from "./api/accountApi.js";
import HistoryApi from "./api/historyApi.js";
import { Alert, Button } from 'react-bootstrap';
import Report from './components/report';
// cmd -> ipconfig

// import {networkInterfaces} from "os"; -> node.js 용이라서 react에서 안되는건가..ㅠㅠ
// console.log(networkInterfaces())
// const accountApi = new AccountApi(`http://:8080`);
// const historyApi = new HistoryApi(`http://${networkInterfaces()["이더넷"][1].address}:8080`);

// 3.35.132.235 aws server IP
const accountApi = new AccountApi(`http://192.168.4.35:8080`);
const historyApi = new HistoryApi(`http://192.168.4.35:8080`);



function App() {
  const [logged, setLogged]=useState(false);
  const [email, setEmail]=useState();

  let alert;
  useEffect(()=>{
    if(localStorage.getItem("token")){
      accountApi.vaild(localStorage.getItem("token"))
        .then(rcv=>{
          if(rcv.result){
            setEmail(rcv.email);
            setLogged(true);
            // console.log(rcv);
          }else{
            setEmail(null);
            setLogged(false);
            localStorage.removeItem("token")
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }else{
      alert = (
        <>
          <Alert key={"alert"} variant='danger'>유효하지않은 토큰입니다. 확인 버튼 누르시면 로그인 화면으로 넘어갑니다.
              <Alert.Link className='alertBtn' href="/login">확인</Alert.Link>
          </Alert>
        </>
      )
    }
  })

  return (
    <>
      <div className='container'>
        {/* 중요한 점은 react-router-dom을 이용하는 함수들을 사용할려면 BrowserRouter컴포넌트 안에서 사용해야한다. */}
        <BrowserRouter>
          <Header logged={logged} setLogged={setLogged} email={email}/>
          {alert}
          <Routes>
            <Route path='/'>    
              <Route index element={<Index/>}/>
              <Route path='login' element={<Login setLogged={setLogged} accountApi={accountApi}/> }/>
              <Route path='register' element={<Register accountApi={accountApi}/>}/>
            </Route>
            <Route path='/history'>    
              <Route index element={<History historyApi={historyApi} email={email}/>}/>
              <Route path='report' element={<Report historyApi={historyApi} email={email}/>}/>
            </Route>
          </Routes> 
          
        </BrowserRouter>

      </div>


      {/* <div className="alert alert-success">
          Bootstrap을 적용한 리액트 앱
      </div> */}
      {/* react-bootstrap 으로 만드는 component형 부트스트랩
      <Alert variant='danger'>
        Bootstrap을 적용한 리액트 앱
      </Alert> */}
    </>
  );
}

export default App;
