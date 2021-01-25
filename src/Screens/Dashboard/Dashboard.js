import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import Home from "../Home/Home";
import Report from "../Report/Report";
import Setting from "../Setting/Setting";

const Dashboard = ({location}) => {
    return (
    <div className="main-page">
        {console.log(location)}
        <div><Sidebar/></div>
        <div className="dashboard-page">
          <Header/>
            <Router>
                    <Home path="/"/>
                    <Report  path="report"/>
                    <Setting  path="setting"/>
            </Router>
        </div>
    </div>)
}

export default Dashboard