import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { navigate } from "@reach/router";
import classNames from "classnames";
import APPCONSTANTS from "../../Constant/AppConstants";
import axios from 'axios';
import './auth.css';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState("");

    /**
     * Fired when user submits the form
     * @param {Object} values - Formik values 
     */
    const onSubmitted = (payload, { setSubmitting }) => {
        try {
            axios.post(APPCONSTANTS.APIS.LOGIN, payload).then(({ data }) => {
                /**
                 * TODO
                 * 1. Hide spinner after 3 sec
                 * 2. Route to dashboard 
                 * 3. setSubmitting(false); - This has to be called after api call whether it's success or not
                 */

                if (data.status = "error") {
                    setErrorMessage(data.message);
                    setSubmitting(false);
                    return;
                } else {
                    setErrorMessage("");
                    // Need to route to dashboard page
                }
            }).catch(err => {
                setErrorMessage(err);
                setSubmitting(false);
            })
        } catch (err) {
            console.error("Exception occurred in onSubmitted -- ", err);
        }
    }

    return <div className="login-master-page">
        <div className="lt-ad">
            <h1>Lead Management System</h1>
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum</p>
        </div>
        <div className="main-content">
            <Formik
                onSubmit={onSubmitted}
                initialValues={{ email: "", password: "" }}
                validationSchema={APPCONSTANTS.SCHEMAS.LOGIN}>
                {
                    ({
                        handleSubmit,
                        isSubmitting,
                        touched,
                        errors,
                        isValid,
                        dirty
                    }) => <form className="form-signin text-center" onSubmit={handleSubmit}>
                            <div className="product-type mb-4">Login to LMS</div>
                            {
                                errorMessage && <div className="alert alert-danger f13" role="alert">
                                    {errorMessage}
                                </div>
                            }
                            <div className="multi-container">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="login-email" className="sr-only">Email</label>
                                        <Field type="text" name="email" placeholder="email" className={classNames("form-control", { "is-invalid": touched.email && errors.email })} />
                                        {touched.email && errors.email && <label className="error" htmlFor="login-email">{errors.email}</label>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="login-password" className="sr-only">Password</label>
                                        <Field type="password" name="password" placeholder="Password" className={classNames("form-control", { "is-invalid": touched.password && errors.password })} />
                                        {touched.password && errors.password && <label className="error" htmlFor="login-password">{errors.password}</label>}
                                    </div>
                                    <button className="btn btn-primary btn-block login-button" type="submit" disabled={isSubmitting || !isValid || !dirty}>
                                        {!isSubmitting && <span>Log in</span>}
                                        {
                                            isSubmitting
                                            && <span>
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> &nbsp;Logging In...
                                            </span>
                                        }
                                    </button>
                                </div>
                            </div>
                        </form>
                }
            </Formik>
            <p className="mt-5 mb-3 text-muted f13">Copyright &#169; Lead Management System 2021. All Rights Reserved</p>
        </div>
    </div>

    // return (
    //     <Formik
    //         initialValues={{ email: '', password: '' }}
    //         validationSchema={validationSchema}
    //         onSubmit={handleSubmit} >
    //         <div className="loginScreen">
    //             <div className="loginLeftScreen">
    //                 <h1>Lead Management System</h1>
    //                 <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum</p>
    //             </div>
    //             <div className="loginRightScreen col-8">
    //                 <div className="login-container">
    //                     <div className="mb-4 ml-5 pl-5">Login to LMS</div>
    //                     <Form>
    //                         <div className="input-group mb-3 ">
    //                             <div className="loginInput">
    //                             <div className="logo-1">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    //                                     <path fill="#8f8d93" class="a" d="M9,10.125A5.063,5.063,0,1,0,3.938,5.063,5.064,5.064,0,0,0,9,10.125Zm4.5,1.125H11.563c-.78.359-1.649-.562-2.563-.562s-1.779.921-2.563.563H4.5A4.5,4.5,0,0,0,0,15.75v.562A1.688,1.688,0,0,0,1.688,18H16.313A1.688,1.688,0,0,0,18,16.313V15.75A4.5,4.5,0,0,0,13.5,11.25Z" />
    //                                 </svg>
    //                             </div>
    //                             <Field name="email" type="text" className="form-control" placeholder="email" />
    //                             <div className="err-msg">
    //                                 <ErrorMessage name="email" />
    //                             </div>
    //                             </div>

    //                         </div>
    //                         <div className="input-group mb-3">
    //                         <div className="loginInput">
    //                             <div className="logo-2">
    //                                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
    //                                     <path fill="#8f8d93" class="a" d="M18,6.188a6.191,6.191,0,0,1-7.342,6.08l-.844.95a.844.844,0,0,1-.631.283H7.875v1.406a.844.844,0,0,1-.844.844H5.625v1.406A.844.844,0,0,1,4.781,18H.844A.844.844,0,0,1,0,17.156V14.412a.844.844,0,0,1,.247-.6L5.935,8.127A6.188,6.188,0,1,1,18,6.188ZM10.813,5.5A1.688,1.688,0,1,0,12.5,3.813,1.687,1.687,0,0,0,10.813,5.5Z" />
    //                                 </svg>
    //                             </div>
    //                             <Field name="password" type="password" className="form-control" placeholder="password" />
    //                             <div className="err-msg">
    //                                 <ErrorMessage name="password" />
    //                             </div>
    //                             </div>

    //                         </div>
    //                         <div>
    //                             <button
    //                                 className="btn btn-primary btn-am btn-block"
    //                                 type="submit"
    //                                 disabled={!Formik.isValid || !Formik.dirty || Formik.isSubmitting}
    //                                 onClick={() => navigate('/dashboard', { replace: true })}>Login</button>
    //                         </div>
    //                     </Form>
    //                 </div>
    //             </div>
    //         </div>
    //     </Formik>
    // );
}

export default Login