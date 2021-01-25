import Login from "./Screens/Auth/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/App.css'
import './Assets/css/main.css'
import './Assets/css/main_app.css'
import Dashboard from "./Screens/Dashboard/Dashboard";

import { Router } from "@reach/router";
import { Fragment } from "react";

function App() {
  return (
      <Router basepath="/" component={Fragment}>
         <Login path="/"/>
         <Dashboard path="dashboard/*"/>
        
      </Router>
  );
}

export default App;
