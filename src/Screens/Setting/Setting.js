import React from 'react';
import {Formik,Field,Form,ErrorMessage, yupToFormErrors}from 'formik';
import * as Yup from 'yup';

const lowercase=/(?=.*[a-z])/;
const uppercase=/(?=.*[A-Z])/;
const Numaric=/(?=.*[0-9])/;



const Setting = () => {
    return (<Formik
    initialValues={{currentpassword:'',enternewpassword:''}}
    validationSchema={Yup.object({
        currentpassword:Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        newpassword: Yup.string() 
            .matches(lowercase, 'Password should be 1 lowercase')
            .matches(uppercase, 'Password should be 1 uppercase')
            .matches(Numaric, 'Password should be 1 Numariccase')
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .max(10,'password is too long-should be 10 chars maximum')
            .required('No password provided.') ,

    })}>
        <Form>
        <div className="row p-4">
            <div className="col-6">
            <div className="row">
                <div className="form-group col">
                <label htmlFor="currentpassword">Enter Current password</label>
                <Field name="currentpassword" type="password"  className="form-control"/>
                <ErrorMessage name="currentpassword" />
                </div>
            </div>
            <div className="row">
            <div className="form-group col">
                <label htmlFor="enternewpassword">Enter New password</label>
                <Field name="enternewpassword" type="password"  className="form-control"/>
                <ErrorMessage name="enternewpassword" />
                </div>
            </div>
            <div className="d-flex justify-content-end">
       <button  className="mr-2 sm"type="reset">Reset</button>
       <button className="primary"type="update"  disabled = {!Formik.isValid} >Update</button>
      </div>
      
            </div>
            
        </div>
    </Form>
    </Formik>)
}

export default Setting