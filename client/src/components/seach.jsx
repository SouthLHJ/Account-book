import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';

import calender from "../func/calender.js"
import SrchList from './srchList.jsx';
import HistoryBar from './historybar.jsx';

function Search(props) {

    const srchYear = useRef();
    const srchMouth = useRef();
    const srchSwitch = useRef();
    
    let [chked,setChked] = useState([]);
    let [list, setList] = useState([]);
    let [edit, setEdit] = useState(false);

    useEffect(()=>{
        searchEvent();
    },[])

    //검색 폼데이터
    const handleSubmit = (evt)=>{
        searchEvent();
        evt.preventDefault();
    }

    //삭제
    const handleDelete = (evt)=>{
        console.log(chked);
        props.historyApi
         .historyDelete(chked,localStorage.getItem("token"))
          .then((rcv)=>{
              searchEvent();
            if(rcv.result){
            }
          })
    }


    //체크박스 전체 선택 및 전체해제
    const handleChk = (evt)=>{
        // console.log(evt.target.dataset.id);
        // console.log(chked);
        if(!chked.includes(evt.target.dataset.id)){
            let newchked = [...chked, evt.target.dataset.id];
            setChked(newchked);
        }else{
            let newchked = chked.filter((chk)=>chk!==evt.target.dataset.id)
            setChked([...newchked]);
        }
    }

    const handleAllCheck = (evt)=>{
        let chkBoxs = document.querySelectorAll(".checkBox");
        if(evt.target.checked){
            let newchked = [];
            chkBoxs.forEach((box)=>{
                box.checked = true;
                newchked.push(box.dataset.id);
            })
            setChked([...newchked])
        }else{
            chkBoxs.forEach((box)=>{
                box.checked = false;
            })
            setChked([]);
        }
    }

    // Edit Mode    
    const handleSwith = (evt)=>{
        setEdit(srchSwitch.current.checked);
    }
   
    const saveEditData = (id,saveEdit)=>{
        if(saveEdit.length !== 0){
            console.log(id);
            console.log(saveEdit);
            props.historyApi
             .historyEdit(id,saveEdit,localStorage.getItem("token"))
              .then((rcv)=>{
                if(rcv.result){
                    searchEvent();
                }
              })
        }
    }

    // 검색이벤트
    const searchEvent = ()=>{
        let data  = {token : localStorage.getItem("token"), year : srchYear.current.value, mouth : srchMouth.current.value};
        // console.log(data)
        props.historyApi
            .historySearch(data)
             .then(rcv=>{
                // console.log(rcv)
                if(rcv.result){
                    rcv.datas.forEach(data=>{
                        if(data.type === "지출"){
                            data.outM = data.price;
                        }else{
                            data.inM = data.price;
                        }
                    });
                    setList(rcv.datas);
                }
             })
    }

    //입력상태 보고 재 랜더링용
    if(props.newCreate){
        searchEvent();
        props.setNewCreate(false);
    }


    return ( 
        <div>
            <form className='search selectArea' onSubmit={handleSubmit}>
                <Form.Select className='search Select' aria-label="Default select example" ref={srchYear}>
                    {calender.yearOption}
                </Form.Select>
                <Form.Select className='search Select' aria-label="Default select example" defaultValue={calender.currentMouth} ref={srchMouth}>
                    {calender.mouthOption}
                </Form.Select>
                <Button variant="primary" id='deleteBtn' onClick={handleDelete}>
                    <i className="bi bi-trash3-fill"></i>
                </Button>
                <Button variant="primary" type='submit' id='searchBtn'>
                    <i className="bi bi-search-heart"></i>
                </Button>
            </form>
            <div>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Category Bar</Accordion.Header>
                        <Accordion.Body>
                            <HistoryBar datas={list}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className='searchSwithArea'>
                <Form>
                    <Form.Check 
                        label="Edit Mode"
                        type="switch"
                        id="custom-switch"
                        ref={srchSwitch}
                        onChange={handleSwith}
                    />
                </Form>
            </div>
            <div className='search list'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{textAlign : "center"}}><input type="checkbox" onClick={handleAllCheck}/></th>
                            <th>날짜</th>
                            <th>지출종류</th>
                            <th>수입</th>
                            <th>지출</th>
                            <th>종류</th>
                            <th>메모</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(data=>{
                            return (<SrchList key={data._id} data={data} handleChk={handleChk} onEdit={srchSwitch.current.checked} saveEditData={saveEditData}/>);
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
     );
}

export default Search;