import {Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function HistoryBar({datas}) {
    const option ={
        plugins: {
            title: {
              display: true,
              text: '수입&지출 금액 현황',
            },
        },
        responsive: true,
        scales: {
            x: {stacked: true},
            y: {stacked: true},
        }
    }
    const labels =  ["식비","주거/통신","생활용품","의복/미용","건강/문화","교통/차량", "용돈/기타","미분류"];

    let moneyCash = [0,0,0,0,0,0,0,0];
    let moneyCharge = [0,0,0,0,0,0,0,0];
    let moneyIn = [0,0,0,0,0,0,0,0];

    datas.forEach((d=>{
        // console.log(d);
        let idx = labels.indexOf(d.category);
        if(d.type ==="수입"){
            moneyIn[idx] += d.inM ;
        }else{
            if(d.cash === "카드"){
                moneyCash[idx] += d.outM??0;
            }else{
                moneyCharge[idx] += d.outM??0;
            }
        }

    }))

    const data = {
        labels,
        datasets : [{
            label : "카테고리별 현금 금액 합",
            data  : moneyCharge,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            stack: 'Stack 0',
        },{
            label : "카테고리별 카드 금액 합산",
            data  : moneyCash,
            backgroundColor: 'rgba(255, 0, 132, 0.5)',
            stack: 'Stack 0',
        },{
            label : "카테고리별 수입 금액 합산",
            data  : moneyIn,
            backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Stack 1',
        }]
    }
    return (<Bar data={data} height={"100"} options={option}/>);
}

export default HistoryBar;