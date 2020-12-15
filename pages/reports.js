import Head from 'next/head'
import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import Pagination from "react-js-pagination";
import CsvDownload from 'react-json-to-csv';
var moment = require('moment');

export default function Home() {

  const today = new Date();

  const [startDate, setStartDate] = useState();
  const [startDate2, setStartDate2] = useState();

  const [activePage, setActivePage] = useState(1);
  const [per_page, setPerPage]     = useState(20);
  const [total_record, setTotalRecord] = useState();
  const [data, setData] = useState([]);
  const [mockData, setMockData ] = useState([]);
  const [loading,setLoading] = useState(false);
  const [filter_start_date, setFilterStartDate] = useState("");
  const [filter_end_date, setFilterEndDate] = useState("");
  
  useEffect(() => {
    LoadData(activePage);
  }, []);

  function handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    setActivePage(pageNumber);
    LoadData(pageNumber);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    //alert(event.target.datepicker.value);

    // setFilterStartDate(event.target.datepicker.value);
    // setFilterEndDate(event.target.datepicker2.value);

    LoadData(activePage);
  }

  async function LoadData(pageNumber) {
    setLoading(true);
    var params = {
      type: sessionStorage.getItem("UserType"),
      added_by: sessionStorage.getItem("UserID"),
      page: per_page * (pageNumber - 1),
      //page: pageNumber,
      limit: per_page,
      start_date: startDate? startDate:"",
      end_date: startDate2? startDate2:""
    };
    var queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    axios.post(process.env.API_URL + "/list-data?" + queryString, {})
      .then((response) => {
        setLoading(false);
        setData(response.data.result);
        setTotalRecord(response.data.totalCount);
        setMockData(response.data.mock_result);
      });
  }

  var renderTableData = [];
  if(data){
    for (let i = 0; i < data.length; i++) {
      renderTableData.push(
        <tr className="Hborder" key={i}>
          <td className = "geeks">{data[i].first_name} {data[i].last_name}</td>
          <td>{data[i].mobile}</td>
          <td>{data[i].area}</td>
          <td>{data[i].existing_broadband}</td>
          <td>{data[i].lead_type}</td>
          <td>{data[i].name}</td>
          <td>{data[i].email}</td>
          <td>{moment(data[i].created_date).format('MMMM Do, YYYY H:mma')}</td>
        </tr>
      );
    }
  }
  if(data.length == 0){
    renderTableData.push(<tr className="Hborder">  <td className = "geeks text-center" colSpan="5">No record found</td>  </tr>);
  }
  

  async function resetSearch(){
    
    setFilterStartDate("");
    setFilterEndDate("");

    LoadData(this.state.activePage);
    document.getElementById("search").reset();
  }

  return (
    <div>
      <Head>
        <title>Report</title>
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


  <form onSubmit= { (e) =>  handleSubmit(e) } id="search">
	  <div className="row">
		<div className="col-lg-3">
		<h1>Reports</h1>
	</div>
	<div className="col-lg-3">
                    <div className="input-group">
                    <DatePicker onCalendarClose={e => setStartDate2("")} dateFormat="dd/MM/yyyy" selected={startDate} onChange={date => setStartDate(date)} classNameName="form-control border-right-0 border from-field bb-0" id="datepicker" name="datepicker" />
                    <span className="input-group-append"> <div className="input-group-text bg-transparent"><i className="fa fa-calendar"></i></div> </span> </div>
      </div>
	  
	  <div className="col-lg-3">
                    <div className="input-group">
                    <DatePicker 
                    
                    minDate={startDate} 
                    dateFormat="dd/MM/yyyy" selected={startDate2} onChange={date => setStartDate2(date)} classNameName="form-control border-right-0 border from-field bb-0" id="datepicker2" name="datepicker2" />
                    <span className="input-group-append">
                      <div className="input-group-text bg-transparent"><i className="fa fa-calendar"></i></div>
                      </span> </div>
      </div>
	  
	  
	  
	  <div className="col-lg-3">
	  <ul className="btnlist text-right">
			<li><input type="submit" value="View" className="lightBtn2"  /></li>
			<li>   <CsvDownload data={mockData} className="lightBtn2">Download</CsvDownload>  </li>
			</ul>
			</div>
			
			
			

	</div>
  </form>

	<hr />
	
	 <div className="row justify-content-center">
	  <div className="col-lg-12 table-responsive">

          <table id='table' className="table gfg">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Area</th>
                <th scope="col">Existing Broadband</th>
                <th scope="col">Lead Type</th>
                <th scope="col">Added By</th>
                  <th scope="col">Login Id</th>
                  <th scope="col">Created Date</th>
              </tr>
            </thead>
            <tbody>
              {renderTableData}
            </tbody>
          </table>
          {total_record > per_page ? <Pagination
            prevPageText='prev'
            nextPageText='next'
            firstPageText='first'
            lastPageText='last'
            activePage={activePage}
            itemsCountPerPage={per_page}
            totalItemsCount={total_record}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
            innerClass="pagination justify-content-center"
          /> : ''}
	  </div>
	</div>
	  
	  
	</div>
	</section>


	 
	  <Footer/>
    </div>
  )
}
