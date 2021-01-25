import { Link } from "@reach/router";
import  "./sideBar.css";

const Sidebar = () => {
    return (<div className="sideBarNav">
       <div className="navMenu active">
       <Link to="/dashboard">
           <div><i className="fas fa-home"></i></div>
           <div className="">Home</div>
        </Link>
       </div>
       <div className="navMenu">
       <Link to="report">
           <div><i className="fas fa-chart-line"></i></div>
           <div>Report</div>
         </Link>
       </div>
       <div className="navMenu">
       <Link to="setting">
           <div><i className="fas fa-cog"></i></div>
           <div>Setting</div>
        </Link>
       </div>
    </div>)
}

export default Sidebar
