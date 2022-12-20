let yearOption=[];
let currentYear = new Date().getFullYear()
for (let i =1800; i <= currentYear ; i++){
    yearOption.push(<option key={`year${i}`}>{i}</option>);
}
yearOption.reverse();

let mouthOption=[];
for (let i =1; i <= 12 ; i++){
    mouthOption.push(<option key={`moumth${i}`}>{`${i}`.padStart(2,"0")}</option>);
}

let dayOption=[];
for (let i =1; i <= 31 ; i++){
    dayOption.push(<option key={`day${i}`}>{`${i}`.padStart(2,"0")}</option>);
}


let currentMouth  = `${new Date().getMonth()+1}`.padStart(2,"0");
let currentDay = `${new Date().getDate()}`.padStart(2,"0");

let last  = new Date(new Date().getFullYear(),currentMouth,0);
let lastMonth = `${last.getMonth()+1}`.padStart(2,"0");
let lastMonthDay = `${currentYear}-${lastMonth}-${last.getDate()}`




export default {yearOption, mouthOption, dayOption, currentMouth,currentDay, currentYear,lastMonthDay}