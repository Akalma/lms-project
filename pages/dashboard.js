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
    const [added_by, setAddedBy] = useState("");

    useEffect(() => {
        setAddedBy(sessionStorage.getItem("UserID"));
    }, []);


    async function SubmitForm(FormData) {
        const Response = await axios.post(process.env.API_URL + "/create-data", FormData);
        // If all good, redirect to meeting page.
        if (Response.data.status == "success") {
            notify_success(Response.data.message);
        } else {
            notify_error(Response.data.message);
        }
    }

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

    function notify_error(msg) {
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
                <title>Dashboard</title>
                <link rel="icon" href="/favicon.ico"/>
                <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                      rel="stylesheet"
                      integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                      crossorigin="anonymous"></link>
                <link
                    href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
                    rel="stylesheet"/>

                <script src="js/jquery-3.3.1.slim.min.js"></script>
                <script src="js/popper.min.js"></script>
                <script src="js/bootstrap.min.js"></script>
                <script src="js/jquery.nice-select.min.js"></script>
            </Head>
            <Header/>
            
            <section id="home-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Home</h1>
                            <hr/>
                        </div>
                    </div>


                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <Formik enableReinitialize
                                    initialValues={{
                                        first_name: '',
                                        last_name: '',
                                        mobile: '',
                                        area: '',
                                        existing_broadband: '',
                                        lead_type: '',
                                        added_by: added_by,
                                        remarks:''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        first_name: Yup.string()
                                            .required('First name required'),
                                        // last_name: Yup.string()
                                        // 	.required('Last name required'),
                                        mobile: Yup.string()
                                            .required('Mobile number required'),
                                        area: Yup.string()
                                            .required('Area required'),
                                        existing_broadband: Yup.string()
                                            .required('Existing broadband required'),
                                        lead_type: Yup.string()
                                            .required('Lead type required'),
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
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label>First Name</label>
                                                        <Field type="text" required="required"
                                                               className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')}
                                                               name="first_name"/>
                                                        <ErrorMessage name="first_name" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Last Name (Optional)</label>
                                                    <div className="form-group">
                                                        <Field type="text" 
                                                               className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')}
                                                               name="first_name" name="last_name" id="last_name"/>
                                                        <ErrorMessage name="last_name" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">

                                                <div className="col-md-12">
                                                    <label>Mobile</label>
                                                    <div className="form-group">
                                                        <Field type="tel" required="required"
                                                               className={'form-control' + (errors.mobile && touched.mobile ? ' is-invalid' : '')}
                                                               name="mobile" id="mobile"/>
                                                        <ErrorMessage name="mobile" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>Area</label>
                                                    <div className="form-group">
                                                        {/*<Field as="select"
                                                               className={'form-control form-select' + (errors.area && touched.area ? ' is-invalid' : '')}
                                                               name="area">
                                                            <option value=""> Select</option>
                                                            <option>HSR Layout</option>
                                                            <option>Rajaji Nagar</option>
                                                            <option>Koramangala</option>
                                                        </Field>*/}
                                                        <Field type="text" required="required"
                                                               className={'form-control' + (errors.area && touched.area ? ' is-invalid' : '')}
                                                               name="area" id="area"/>
                                                        <ErrorMessage name="area" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>Existing Broadband</label>
                                                    <div className="form-group">
                                                        <Field as="select" name="existing_broadband"
                                                               className={'form-control form-select' + (errors.existing_broadband && touched.existing_broadband ? ' is-invalid' : '')}>
                                                            <option value=""> Select</option>
                                                            <option>NONE</option>
                                                            <option>AIRTEL</option>
                                                            <option>BSNL</option>
                                                            <option>ACT</option>
                                                            <option>HATHWAY</option>
                                                            <option>OTHERS</option>
                                                        </Field>
                                                        <ErrorMessage name="existing_broadband" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12">
                                                    <label>Lead Type</label>
                                                    <div className="form-group">
                                                        <Field as="select" name="lead_type"
                                                               className={'form-control form-select' + (errors.lead_type && touched.lead_type ? ' is-invalid' : '')}>
                                                            <option value=""> Select</option>
                                                            <option value="HOT">HOT</option>
                                                            <option value="WARM">WARM</option>
                                                            <option value="COLD">COLD</option>
                                                            <option value="CLOSED">CLOSED</option>
                                                        </Field>
                                                        <ErrorMessage name="lead_type" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="row">

                                                <div className="col-md-12">
                                                    <label>Remarks (Optional)</label>
                                                    <div className="form-group">
                                                        <Field component="textarea"
                                                               className={'form-control' + (errors.remarks && touched.remarks ? ' is-invalid' : '')}
                                                               name="remarks" id="remarks"/>
                                                        <ErrorMessage name="remarks" component="div" className="invalid-feedback"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-12 mt-3">
                                                    <ul className="btnlist text-right">
                                                        <li><input type="submit" value="Reset" className="lightBtn"/>
                                                        </li>
                                                        <li><input type="submit" value="Save" className="darkBtn"/></li>
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
