import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function Home() {
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
  <h1>Settings</h1>
   </div>
  </section>


	 
	  <Footer/>
    </div>
  )
}
