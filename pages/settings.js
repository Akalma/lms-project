import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';

import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {toast} from 'react-toastify';
import Router from 'next/router';
import React, {useState, useEffect} from 'react'

export default function Home() {

  async function SubmitForm(FormData) {
    FormData['UserID'] = sessionStorage.getItem("UserID");
    const Response = await axios.post(process.env.API_URL + "/chnage-password", FormData);
    // If all good, redirect to meeting page.
    if (Response.data.status == "success") {
        notify_success(Response.data.message);
    } else {
        notify_error(Response.data.message);
    }
  }

  function notify_success(msg){
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
	
	  function notify_error(msg){
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

  return (
    <div>
      <Head>
        <title>Settings</title>
        <link rel="icon" href="/favicon.ico" />
		<link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
		<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" />
	        
		<script src="js/jquery-3.3.1.slim.min.js"></script>
		<script src="js/popper.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/jquery.nice-select.min.js"></script>
	  </Head>
      <Header/>



	  <section id="home-section">
      
	  <div className="container">
    <h1>Settings</h1><hr/>

    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <Formik enableReinitialize
                                    initialValues={{
                                        current_password: '',
                                        new_password: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        current_password: Yup.string()
                                            .required('Enter current password'),
                                        new_password: Yup.string()
                                            .required('Enter new password')
                                    })}

                                    onSubmit={(fields, {resetForm}) => {
                                        SubmitForm(fields);
                                        resetForm();
                                    }}
                            >
                                {({
                                      errors, status, touched, handleSubmit
                                  }) => (
                                    <Form>
                                        <div className="controls">
                                           
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <label>Current Password</label>
                                                    <div className="form-group">
                                                        <Field type="tel" required="required"
                                                               className={'form-control' + (errors.current_password && touched.current_password ? ' is-invalid' : '')}
                                                               name="current_password" id="current_password"/>
                                                        <ErrorMessage name="current_password" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>New Password</label>
                                                    <div className="form-group">
                                                        <Field type="text" required="required"
                                                               className={'form-control' + (errors.new_password && touched.new_password ? ' is-invalid' : '')}
                                                               name="new_password" id="new_password"/>
                                                        <ErrorMessage name="new_password" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>

                                            

                                            <div className="row">
                                                <div className="col-md-12 mt-3">
                                                    <ul className="btnlist text-right">
                                                        <li><input type="submit" value="Reset" className="lightBtn"/>
                                                        </li>
                                                        <li><input type="submit" value="Update" className="darkBtn"/></li>
                                                    </ul>

                                                </div>
                                            </div>


                                        </div>
                                        <Field type="hidden" name="added_by" id="added_by"/>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>

   </div>
  </section>


	 
	  <Footer/>
    </div>
  )
}
