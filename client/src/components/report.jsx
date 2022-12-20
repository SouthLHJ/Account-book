import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import calender from "../func/calender.js"

import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,    LinearScale,    BarElement,    Title, } from 'chart.js';
import { Doughnut, Pie, Bar } from 'react-chartjs-2';
import { useEffect,useState } from 'react';
import { useRef } from 'react';
ChartJS.register(ArcElement,CategoryScale,LinearScale, BarElement, Title, Tooltip, Legend);




function Report(props) {

    const [list,setList] = useState([]);
    const [view, setView] = useState(false);
    const startDate = useRef();
    const endDate = useRef();
    
    const today =  `${calender.currentYear}-${calender.currentMouth}-01`
    const lastDay = calender.lastMonthDay;

    const handleSubmit = (evt)=>{
        evt.preventDefault();
        let cte = Array.from(evt.target.category)

        let category = [];
        cte.forEach((one)=>{
            if(one.checked == true){
                category.push(one.value)
            }
        })
        let ca = Array.from(evt.target.cash);
        let cash = [];
        ca.forEach((one)=>{
            if(one.checked == true){
                cash.push(one.value)
            }
        })
        let data = {
            startDate : startDate.current.value,
            endDate : endDate.current.value,
            category,
            cash
        }
        // console.log(startDate.current.value);
        props.historyApi
            .ReportPostSearch(data,localStorage.getItem("token"))
            .then((rcv)=>{
                console.log(rcv)
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

    useEffect(()=>{
        let data = {
            startDate : today,
            endDate : lastDay,
        }
        props.historyApi
            .ReportGetSearch(data)
            .then((rcv)=>{
                console.log(rcv)
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
    },[])


    //검색 리스트 표 
    let reportList=[];
    reportList = list.map(data=>{
        return (
        <tr data-id={data._id}>
            <td>{new Date(data.date).toLocaleDateString()}</td>
            <td>{data.cash}</td>
            <td>{data.inM}</td>
            <td>{data.outM}</td>    
            <td>{data.category}</td>
            <td>{data.comment}</td>
        </tr>
        )
    })

    // 바 차트 설정
    let barData1 =0;
    let barData2 =0;
    list.forEach(d=>{
        console.log(d);
            if(d.type == "지출"){
                barData1 += d.price;
            }else{
                barData2 += d.price;
            }
        }
    )
    // console.log("가격",barData1,barData1)
    const Bardata = {
        labels : "검색된 수입 지출",
        datasets: [
          {
            label: '지출',
            data: barData1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: '수입',
            data: barData2,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    const Baroptions = {
        indexAxis:'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      };

    

    // 파이 차트 설정
    const labels =  ["식비","주거/통신","생활용품","의복/미용","건강/문화","교통/차량", "용돈/기타","미분류"];
    let money = [0,0,0,0,0,0,0,0];
    list.forEach((d=>{
        let idx = labels.indexOf(d.category);
            if(d.type === "지출"){
                money[idx] += d.outM;
            }
        }
    ))

    const Piedata = {
        labels :  labels,
        datasets: [
            {
              label: '# of Votes',
              data: money,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(182,255,249,0.2)',
                "rgba(26, 5, 255, 0.43)"
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                "rgba(0, 138, 126, 0.9)",
                "rgba(11, 0, 133, 1)"
              ],
              borderWidth: 1,
            },
        ]
    }
    const Pieoption = {
        plugins: {
            title: {
              display: true,
              text: '지출 금액 현황',
            },

        },
        responsive: true,
    }

    return ( 
        <>
            <div className="reportSearchArea">
                <form className='reportSearch' onSubmit={handleSubmit}>
                    <Table striped bordered>
                        <tbody>
                            <tr>
                                <td>날짜</td>
                                <td className='reportSrchDateArea'>
                                    <Form.Control className='reportSearchDate' type="date" name="startDate" defaultValue={today} ref={startDate}/>
                                    <Form.Control className='reportSearchDate' type="date" name="endDate" defaultValue={lastDay} ref={endDate}/>
                                </td>
                            </tr>

                            <tr>
                                <td>분류</td>
                                <td>
                                    <Form.Check inline label="미분류" name="category" value="미분류" type='checkbox' className="reportSearchChkBox"/>
                                    <Form.Check inline label="식비" name="category" value="식비" type='checkbox'  className="reportSearchChkBox"/>
                                    <Form.Check inline label="주거/통신" name="category" value="주거/통신" type='checkbox' className="reportSearchChkBox"/>
                                    <Form.Check inline label="생활용품" name="category" value="생활용품" type='checkbox' className="reportSearchChkBox"/>
                                    <Form.Check inline label="의복/미용" name="category" value="의복/미용" type='checkbox' className="reportSearchChkBox"/>
                                    <Form.Check inline label="건강/문화" name="category" value="건강/문화" type='checkbox' className="reportSearchChkBox"/>
                                    <Form.Check inline label="교통/차량" name="category" value="교통/차량" type='checkbox' className="reportSearchChkBox"/>
                                    <Form.Check inline label="용돈/기타" name="category" value="용돈/기타" type='checkbox' className="reportSearchChkBox"/>
                                </td>
                            </tr>
                            <tr>
                                <td>소비유형</td>
                                <td>
                                    <Form.Check inline label="카드" name="cash" value="카드" type='checkbox' className="reportSearchChkBox"/>
                                    <Form.Check inline label="현금" name="cash" value="현금" type='checkbox' className="reportSearchChkBox"/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <div style={{textAlign : "right"}}>
                        <Button variant="primary" type='submit' id='searchBtn'>
                            <i className="bi bi-search-heart"></i>
                        </Button>
                    </div>
                </form>
            </div>

            <div className='reportListArea'>
                <div className='report table'>
                    <Form.Check inline label="차트보기" type='checkbox' onChange={()=>{setView(!view)}}/>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>지출종류</th>
                                <th>수입</th>
                                <th>지출</th>
                                <th>종류</th>
                                <th>메모</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportList}
                        </tbody>
                    </Table>
                </div>
                {view ? 
                    <div className='reportChart'>
                        <div>
                            <Bar options={Baroptions} data={Bardata} />
                        </div>
                        <div className='pieChart'>
                            <Doughnut data={Piedata} options={Pieoption}/>
                        </div>
                    </div>
                    :
                    <></>     
                }
            </div>
        </>
    );
}

export default Report;