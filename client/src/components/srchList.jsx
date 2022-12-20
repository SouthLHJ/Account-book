import { useRef, useState } from "react";
import Form from 'react-bootstrap/Form';


function SrchList({data,handleChk,onEdit,saveEditData}) {
   
    const [edit, setEdit] = useState(false);
    const [saveEdit, setSaveEdit] = useState([]);


    if(onEdit !== edit){
        setEdit(onEdit)
        if(!onEdit){
            saveEditData(data._id,saveEdit)
        }
    }

    const handleBlur = (evt)=>{
        let value = evt.target.textContent;
        let field =evt.target.dataset.name;
        let field1;let field2 ;let value1;let value2
        if(field ==="type 수입"){
            field1 =  "type"
            value1 = "수입"
            field2 = "price"  
            value2 = value;
        }else if(field ==="type 지출"){
            field1 =  "type"
            value1 = "지출"
            field2 = "price"  
            value2 = value;
        }else{
            field1 = field;
            value1 = value;
        }   
        let chkData = false;
        if(saveEdit.length !== 0){
            let d = [...saveEdit];
            d.forEach((one)=>{
                if(one.field == field1){
                    one.value = value1;
                    chkData = true;
                }
                if(field2){
                    if(one.field == field2){
                        one.value = value2;
                        chkData = true;
                    }
                }
            })
            console.log(d, chkData);
            if(chkData){
                setSaveEdit(d)
            }else{
                d.push({field : field1, value : value1})
                if(field2){
                    d.push({field : field2, value : value2})
                }
                setSaveEdit(d)
            }
        }else{
            if(field2){
                setSaveEdit([{field : field1,value : value1},{field : field2, value : value2}])
            }else{
                setSaveEdit([{field : field1,value : value1}])
            }
        }
        
    }

    const handleChange = (evt)=>{
        let value = evt.target.value;
        let field = evt.target.dataset.name;

        let chkData = false;
        if(saveEdit.length !== 0){
            let d = [...saveEdit];
            d.forEach((one)=>{
                if(one.field == field){
                    one.value = value;
                    chkData = true;
                }
            })
            console.log(d, chkData);
            if(chkData){
                setSaveEdit(d)
            }else{
                d.push({field : field, value : value})
                setSaveEdit(d)
            }
        }else{
            setSaveEdit([{field : field,value : value}])
        }
    }


    const onChangeBox = (evt)=>{
        handleChk(evt);
    }
    let categoryData;
    let cashData;
    let dateData;
    let y = new Date(data.date).getFullYear();
    let m = `${new Date(data.date).getMonth()+1}`.padStart(2,"0");
    let d = `${new Date(data.date).getDate()}`.padStart(2,"0");
    if(edit){
        categoryData = (<Form.Select aria-label="Default select example"  data-name="category"  className="srchList" onChange={handleChange}>
            <option value="미분류">미분류</option>
            <option value="식비">식비</option>
            <option value="주거/통신">주거/통신</option>
            <option value="생활용품">생활용품</option>
            <option value="의복/미용">의복/미용</option>
            <option value="건강/문화">건강/문화</option>
            <option value="교통/차량">교통/차량</option>
            <option value="용돈/기타">용돈/기타</option>
        </Form.Select>)
        cashData = (
            <Form.Select aria-label="Default select example" data-name="cash" className="srchList" onChange={handleChange}>
                <option value="카드">카드</option>
                <option value="현금">현금</option>
            </Form.Select>
        );
        dateData = (
            <Form.Control type="date" className="srchList" data-name="date" onChange={handleChange} defaultValue={`${y}-${m}-${d}`}/>
        );
    }else{
        categoryData = data.category;
        cashData = data.cash;
        dateData = `${y}-${m}-${d}`
    }

    return ( 

        <>
            <tr>
                <td style={{textAlign : "center"}}><input className="checkBox" type="checkbox" data-id={data._id} onChange={onChangeBox}/></td>
                <td >{dateData}</td>
                <td >{cashData}</td>
                <td contentEditable={edit} suppressContentEditableWarning={true} style={{color : "blue"}} data-name="type 수입" onBlur={handleBlur}>{data.inM}</td>
                <td contentEditable={edit} suppressContentEditableWarning={true} style={{color : "red"}} data-name="type 지출" onBlur={handleBlur}>{data.outM}</td>    
                <td>{categoryData}</td>
                <td contentEditable={edit} suppressContentEditableWarning={true} data-name="comment" onBlur={handleBlur}>{data.comment}</td>
            </tr>
        </>
    );
}

export default SrchList;