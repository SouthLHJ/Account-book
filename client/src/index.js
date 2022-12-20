import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//부트스트랩 불러오기
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

/*
  설치할 것들 
  npm i react-router-dom

  npm install react-bootstrap bootstrap
  => 쉽게 구현하기 위한 css 집합이다. (component형으로 만들어야함)

  npm i bootstrap 

*/

/*

*/