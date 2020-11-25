import Link from "next/link";
import { useRouter } from 'next/router';
import Router from 'next/router';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
/** 
 * Render Header component
 * @component
 * @returns Footer component
*/
export default () => {
    const router = useRouter()
    useEffect(() => {
      if(sessionStorage.getItem("UserLogin") == 'false' || sessionStorage.getItem("UserLogin") == 'null'){
        sessionStorage.setItem("UserLogin", false);
        notify_success("unauthorized access");
        Router.push('/');
      }
    }, []);

    function notify_success(msg) {
        toast.success(msg, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    
    function  notify_error(msg) {
        toast.error(msg, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    function DoLogout(){
        sessionStorage.setItem("UserLogin", false);
        notify_success("Logout successfull");
        Router.push('/');
    }

    return (
      <>
    <header id="main-header">
        <div id="top-head">
        <div className="container">
        <div className="row justify-content-between">

        <div className="col-lg-6 nav-box">
        <nav className="navbar navbar-expand-lg navbar-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className={'nav-item' + (router.pathname == '/dashboard' ? ' active' : '')}>
                <Link href="/dashboard">
                <a className="nav-link"><i className="fa fa-home" aria-hidden="true"></i> Home</a>
                </Link>
            </li>
            <li className={'nav-item' + (router.pathname == '/reports' ? ' active' : '')}>
                <Link href="/reports">
                <a className="nav-link" ><i className="fa fa-line-chart" aria-hidden="true"></i> Reports</a>
                </Link>
            </li>
            <li className={'nav-item' + (router.pathname == '/settings' ? ' active' : '')}>
                <Link href="/settings">
                <a className="nav-link"><i className="fa fa-cog" aria-hidden="true"></i> Settings</a>
                </Link>
            </li>
            </ul>
        </div>
        </nav>
        </div>
        <div className="col-lg-4 signBox">
        <div className="sign-out-box">
            <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" onClick={DoLogout}><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
            </li>
            </ul>
        </div>
        </div>
        

        </div>
        </div>
        </div>
    </header>
    </>
  )
}