import React, { Component } from 'react';
import '../css/Home.css';
import Navbar from  './Navbar';
import Footer from  './Footer';

class soen487 extends Component {
    render = () => {
        const navbar = <Navbar/>
        const footer = <Footer specialFooter = {true}/>
        return (
            <div className="page-wrap">
            {navbar}

            <section id="main">

				
						<header id="header">
							<div className="split-para">Wikipedia data fetch app <span>	Web Services and Applications </span></div>
						</header>

						<div className= "content">
            <div class="inner">
								<header>
								<span className="image left"><a target = "_blank" rel="noopener noreferrer" href="http://jamdo-487.herokuapp.com/">   <img src="images/projects/jamdo1.jpg" alt=""  /> <strong>Click Image to try yourself </strong> </a> </span>
								</header>
							
								<h3>What Is Jamdo?</h3>
								<p>	 Jamdo is a Restful web application developed as a project for the web services course. The application implements four technical microservices: an application server, resourse gathering server, a caching server and an authentication server.
									This application allows users to search dates and receive a list of events that occured on that date from the <strong>Wikipedia API </strong> response in Json format. 
									 For the authentication, it uses Bcrypt cryptography to hash the user's password, the user's information is then encoded in a <strong>Json Web Token </strong> which is validated by our authentication server. 
									 Finally a caching server is used to reduce the amount of requests to the Wikipedia API, if the searched data was already searched for previously, the data incoming will come from the stored caching database.
									This application was developed using the <strong> Flask framework </strong> with <strong> SQLite</strong> as a relational dbms. 
									Testing was done using PyUnit a unit test framework to test our various unit cases.</p> 
									
										
								<h3>What I learnt</h3>
								<p> In this class and while doing this project, I learned about <strong>microservices vs monolithic </strong> applications. I was exposed to <strong>Python3 and the Flask</strong> framework. 
								 I learned how to communicate with different servers on different ports rather than single server applications. I learned about <strong>Restful </strong> service constraints, and the <strong>OWASP TOP 10</strong> security projects  </p>
                </div>
								</div>
								{footer}
                </section>
                
                </div>
            
         );
                 }
                    }

export default soen487;