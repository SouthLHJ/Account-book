import {useNavigate} from "react-router-dom"

function Index() {

    // 재 렌더링을 하지않고 path이동하는 router-dom 함수 useNavigate();
    const navigate = useNavigate();
    const moveLogin = (evt)=>{
        navigate("/login")
    }

    return (   
    <div className="card" style={{width:"400px"}}>
        <div className="card-body">
            <h4 className="card-title">가계부</h4>
            <p className="card-text">어서오세요.</p>
            <a onClick={moveLogin} className="btn btn-primary">로그인 화면 이동</a>
        </div>
        {/* <img className="card-img-bottom" src="../bootstrap4/img_avatar6.png" alt="Card image" style={{width:"100%"}}/> */}
    </div>
   );
}

export default Index;