
import React from 'react';
import{Router,Link}from "@reach/router";
import { Formik, Field, Form } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Yup from 'yup';
import Select from 'react-select';
import "yup-phone";



const Schema=Yup.object().shape(
  {
    firstName:Yup.string().required('enter name')
  .min(2),
  lastName:Yup.string().required('enter Last Name')
  .min(3),
  Mobile:Yup.string().phone().required('enter Number')
  .min(10).max(10),
  
}
)


function Home() {
  return (
    <div className="App">
    <Formik 
    initialValues={{
      firstName:'',
      lastName:'',
      Mobile:'',
      Area:'',
      ExistingBroadband:'',
      LeadType:''
    }}
    validationSchema={Schema}
    onSubmit={(values)=>
    console.log(values)}>

    {({
      handleSubmit,
      errors, 
      touched,
      handleBlur,
      handleChange,
      value,
    
    }) =>{
      return(
      <Form onSubmit={handleSubmit}>
       <div className="row p-4 ">
       <div className="col-8">
        <div className="row">
        <div className="form-group col-6">
        <label htmlFor="firstName">First Name</label>
        <Field className="form-control" name="firstName" placeholder="FirstName" />
        {errors.firstName && touched.firstName && <div className="text-danger">{errors.firstName}</div>}
        </div>
        <div className="form-group col-6">
        <label htmlFor="lastName">Last Name</label>
        <Field className="form-control" name="lastName" placeholder="LastName" />
        {errors.lastName && touched.lastName && <div className="text-danger">{errors.lastName}</div>}
      </div>
      </div>
      <div className="row">
      <div className="col-12">
      <div className="form-group ">
      <label htmlFor="Mobile">Mobile</label>
        <Field className="form-control" name="Mobile" placeholder="Number" />
        {errors.Mobile && touched.Mobile && <div className="text-danger">{errors.Mobile}</div>}
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-12">
      <div className="form-group ">
      <label htmlFor="Area">Area</label>
      <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        {errors.Area && touched.Area&& <div className="text-danger">{errors.Area}</div>}
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-12">
      <div className="form-group ">
      <label htmlFor="Existing Broadband">Existing Broadband</label>
      <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        {errors.ExistingBroadband && touched.ExistingBroadband&& <div className="text-danger">{errors.ExistingBroadband}</div>}
      </div>
      </div>
      </div>
      <div className="row">
      <div className="col-12">
      <div className="form-group ">
      <label htmlFor="LeadType">Lead Type</label>
      <Select
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
        />
        {errors.LeadType && touched.LeadType&& <div className="text-danger">{errors.LeadType}</div>}
      </div>
      </div>
      </div>
      <div className="d-flex justify-content-end">
       <button  className="mr-2 sm"type="reset">Reset</button>
       <button className="primary"type="save"  disabled = {!Formik.isValid} >Save</button>
      </div>
      
      </div>
      
    </div>
       
        </Form>
      )
    }}
    </Formik>
      
    </div>
  );
}

export default Home;