import React, { Component } from 'react';
import '../css/Home.css';
import Navbar from  './Navbar';
import Footer from  './Footer';

class comp345 extends Component {

    render = () => {
        const navbar = <Navbar/>
				const footer = <Footer specialFooter = {true}/>
        return (
            <div className="page-wrap">
            {navbar}

            <section id="main">

				
						<header id="header">
							<div class="split-para">Powergrid <span>Advanced Program Design with C++ </span></div>
						</header>

            <div class="inner">
								<header>
								<div className="center">
										<ul className="icons">
                      <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/asianswagstorm/Powergrid" class="icon fa-github"><span class="label">Github</span></a></li>
											<span>View the code</span>
                    </ul>
									</div>
								</header>
								<h2>What is Powergrid?</h2>
								<p>Powergrid is a boardgame where users buy materials and try to power the most amount of cities at the end of the game. The task was to transform this boardgame into a C++ program.
									This project uses an abundance of design patterns (Singleton, Observer and Strategy). 
								</p>
								<h3>What I learned</h3>
								<p>I learned about C++ Pointers and the difference between static and dynamic arrays in C++. This project heavily used input/output streams so I quickly became familiar with writing and reading to files. In a sense I was using the text files as a mock database that enabled the game to be saved and loaded.
								</p>
							
                </div>

               {footer}

                </section>
                </div>
            
            
         );
                 }
                    }

export default comp345;