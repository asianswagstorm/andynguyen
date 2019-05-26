import React, { Component } from 'react';

import '../css/Home.css';
import '../css/font-awesome.min.css';
import Navbar from  './Navbar';
import Footer from  './Footer';

class soen387 extends Component {
    render = () => {
        const navbar = <Navbar/>
				const footer = <Footer/>
        return (
            <div className="page-wrap">
            {navbar}

            <section id="main">

						<header id="header">
							<div className="split-para">Pokemon Web App <span>Web-based Enterprise Application Design </span></div>
						</header>
					
            <div className="inner">
								<header>
								<span className="image center">  <img src="images/projects/pokemon1.jpg" alt=""  />  </span>
								</header>
								<h3>What this app is about?</h3>
								<p>This project was created using Java Enterprise Servlets that uses HTTP servlet  requests and response. Users can challenge other players to a card battle and once the other user accepts the challenge a game is invoked.  
								The DBMS used was mysql, and the output response had to be in json format to be tested on against the test cases provided. Therefore because the application had to pass the test cases given, it was my first Test Driven Development application that I developed.
									Two iterations of this project was done using various design patterns:
									 <li> <strong>Primitive Page Controllers, Transaction Scripts and Row Data Gateway</strong></li> 
									 Each feature has their own page controller file that processes requests using the HttpServletRequest and HttpServletResponse. 
									 <li> <strong>Front Controllers, Dispatchers, Commands, Template View, Domain Object, Input / Output Mapper, Finder, Table Data Gateway, Proxy (Lazy Load), Identidy Map, Factory, UOW, Optimistic Concurrency Management </strong></li> 
								Each feature were seperated by Dispatchers, Commands and Models (Finder, TDG , InputMapper, OutputMapper, Proxy, Interface, Factory)
							
								</p>
								<h3>What I learned</h3>
								<p> This was the first Java Web Developement project I did, I learned how <strong>Java Servlets, JSP, Apache Tomcat servers</strong> worked. Learned to use design patterns in the form of MVC (Presentation, Domain, DataSource), design class diagrams and system sequence diagrams.
									This class heavily emphasied on <strong>Martin Fowler's Enterprise Patterns</strong>, which uses various design patterns listed above. Overall I learned how Java Enterprise Edition architectures worked, with servlet components and POJO's.
									The framework used was called SONEA, a framework developed by the professor teaching the course. Eventually I would like to try the Spring Boot Framework for future Java Web Development projects. </p>
								
                </div>
							
              {footer}

                </section>
                </div>
            
            
         );
                 }
                    }

export default soen387;

