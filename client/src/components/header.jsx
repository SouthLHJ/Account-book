import {Link, useNavigate} from "react-router-dom";

function Header(props) {
    const navigate = useNavigate();
    
    let log
    if(props.logged){
        log = (
            <>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/login" onClick={()=>{props.setLogged(false);localStorage.removeItem("token");navigate("/login")}}>Logout</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/history">History</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/history/report">Report</Link>
                    </li>
                    
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="#">{props.email}</Link>
                    </li>
                </ul>
            </>
        )
    }else{
        log = (
            <ul className="navbar-nav">
                {/* 리로딩이 발생하지 않는다 */}
                <li className="nav-item">
                            <Link className="nav-link" to="/login" >Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        )
    }


    return ( <>
        <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <div className="container-fluid">
                    {log}
            </div>
        </nav>
    </> );
}

export default Header;

// {/* 리로딩이 발생한다 */}
// <li className="nav-item">
// <a className="nav-link disabled" href="#">Disabled</a>
// </li>