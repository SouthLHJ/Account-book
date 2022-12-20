import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState,useRef } from 'react';


import calender from "../func/calender.js"

function Write(props) {
    const [show, setShow] = useState(false);
    
    const type = useRef(); const date = useRef(); const cash = useRef();
    const price = useRef(); const category = useRef(); const comment = useRef();

    const today =  `${calender.currentYear}-${calender.currentMouth}-${calender.currentDay}`

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = (evt)=> {
        evt.preventDefault();
        let data = {
            userid : props.email,
            type : type.current.value,
            date : date.current.value,
            cash : cash.current.value,
            price : price.current.value,
            category : category.current.value,
            comment : comment.current.value,
        }
        props.historyApi
            .historyInput(data)
             .then(rcv=>{
                if(rcv.result){
                    console.log(rcv)
                    props.setNewCreate(true);
                    handleClose();
                }
             })
    }

    return ( 
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="bi bi-pencil-square"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>새로운 내역</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td>수입/지출</td>
                                    <td>
                                        <Form.Select aria-label="Default select example" ref={type}>
                                            <option value="지출">지출</option>
                                            <option value="수입">수입</option>
                                        </Form.Select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>날짜</td>
                                    <td>   
                                        <Form.Control type="date" ref={date} defaultValue={today}/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>카드/현금</td>
                                    <td>
                                        <Form.Select aria-label="Default select example" ref={cash}>
                                            <option value="카드">카드</option>
                                            <option value="현금">현금</option>
                                        </Form.Select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>금액</td>
                                    <td>
                                        <Form.Control type="number" ref={price}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>종류</td>
                                    <td>
                                        <Form.Select aria-label="Default select example" ref={category}>
                                            <option value="미분류">미분류</option>
                                            <option value="식비">식비</option>
                                            <option value="주거/통신">주거/통신</option>
                                            <option value="생활용품">생활용품</option>
                                            <option value="의복/미용">의복/미용</option>
                                            <option value="건강/문화">건강/문화</option>
                                            <option value="교통/차량">교통/차량</option>
                                            <option value="용돈/기타">용돈/기타</option>
                                        </Form.Select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>메모</td>
                                    
                                    <td>
                                        <Form.Control type="text" ref={comment}/>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button variant="primary" type='submit'>
                            작성완료
                        </Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default Write;