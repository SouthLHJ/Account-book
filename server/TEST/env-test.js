import dotenv from "dotenv";

//현재 환경의 워킹디렉토리를 알 수 있는 변수
console.log(process.cwd())

//상위폴더가 따로 열려있지않
dotenv.config({path : `${process.cwd()}/server/.env`});
//환경변수 (process)
console.log(process.env.MONGODB_URI);
console.log(process.env.SECRET_KEY);