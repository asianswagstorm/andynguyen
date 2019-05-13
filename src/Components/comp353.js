import React, { Component } from 'react';
import '../css/Home.css';
import Navbar from  './Navbar';
import Footer from  './Footer';

class comp353 extends Component {
    render = () => {
        const navbar = <Navbar/>
				const footer = <Footer/>
        return (
            <div className="page-wrap">
            {navbar}

            <section id="main">

				
						<header id="header">
							<div class="split-para">Physio Center Database Management App <span>Databases </span></div>
						</header>

            <div class="inner">
								<header>
								<span className="image center"> <a target = "_blank" rel="noopener noreferrer" href="https://github.com/asianswagstorm/comp353"> <img src="images/projects/database1.jpg" alt=""  /></a>   </span>
								</header>
								<h2>What is it?</h2>

								<p>Bahamas Sports Physio Center is a physio center database management application used by 3 types of users (Receptionist, Doctors and Patients). Doctors can view patient information and upcoming appointments.
								Receptionist can see the list of doctors and their availabilities, they can also make appointments for patients and view patient records. Patients can only make appointments and view their upcoming appointments.
								This application was developed using HTML, CSS, Bootstrap, PHP and MYSQL. 

								</p>
								<h2>What I learned</h2>
								<p>This was the second CRUD application that I developed and I learned about ER diagrams, Database Normalization (3NF, BCNF), Denormaliztion, SQL Joins, and Data Definition Language.
									I learned how to connect tables based on foreign keys and got to practice more with SQL queries.  </p>
								
                </div>

            {footer}


                </section>
                </div>
            
            
         );
                 }
                    }

export default comp353;