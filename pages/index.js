import Head from 'next/head'
import Footer from '../components/Footer';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import Router from 'next/router';
export default function Home() {

	async function SubmitForm(FormData){
		const Response = await axios.post(process.env.API_URL+"/login", FormData);
		// If all good, redirect to meeting page.
		if (Response.data.status == "success") {
			  sessionStorage.setItem("UserLogin", true);
			  sessionStorage.setItem("UserID", Response.data.result.id);
			  sessionStorage.setItem("UserType", Response.data.result.type);
			  sessionStorage.setItem("LoginUserName", Response.data.result.name);
			Router.push('/dashboard');
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
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"></link>
		<link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" />
	  
		<script src="js/jquery-3.3.1.slim.min.js"></script>
		<script src="js/popper.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
	  
	  </Head>

      <section id="login-section">
	<div className="container">
	  <div className="row justify-content-center">
		<div className="col-lg-5">
		
		<div className="sign-box">
		<h2>Lead Management System</h2>
		<Formik
                      initialValues={{
                        email: '',
                        password: ''
                      }}
                      validationSchema={Yup.object().shape({
                          email: Yup.string()
                              // .email('Enter valid email address')
                              .required('User id required'),
                          password: Yup.string()
                              .min(6, 'Password must be at least 6 characters')
                              .required('Password is required')
                      })}
                      onSubmit={fields => {
                          SubmitForm(fields);
                        }}
                      >
                      {({
                        errors, status, touched, handleSubmit
                      }) => (
						<Form>
					<p className={'cd-signin-modal__fieldset' + (errors.email && touched.email ? ' is-invalid' : '')}>
						<label className="cd-signin-modal__label cd-signin-modal__label--email cd-signin-modal__label--image-replace" htmlFor="signin-email">E-mail</label>
						<Field type="text" className='form-control cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border'  id="signin-email" name="email" placeholder="User ID" />
						<ErrorMessage name="email" component="span" className= {errors.email && touched.email ? ' cd-signin-modal__error' : ''} />
					</p>

					<p className={'cd-signin-modal__fieldset' + (errors.password && touched.password ? ' is-invalid' : '')}>
						<label className="cd-signin-modal__label cd-signin-modal__label--password cd-signin-modal__label--image-replace" htmlFor="signin-password">Password</label>
						<Field type="password" className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border" id="signin-password" name="password" placeholder="Password" />
						<ErrorMessage name="password" component="span" className= {errors.password && touched.password ? ' cd-signin-modal__error' : ''} />
					</p>					
					
					<p className="cd-signin-modal__fieldset text-center">
						<input type="submit" className="cd-signin-modal__input hmcar-bookBtn" value="Login" />
					</p>
					</Form>
                      )}
                      </Formik>
	</div>
	</div>
	
	
	
	</div>
	</div>
	</section>

      <Footer/>
    </div>
  )
}
