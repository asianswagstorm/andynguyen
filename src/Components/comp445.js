import React, { Component } from 'react';
import '../css/Home.css';
import Navbar from  './Navbar';
import Footer from  './Footer';

class comp445 extends Component {
    render = () => {
        const navbar = <Navbar/>
				const footer = <Footer/>
        return (
            <div className="page-wrap">
            {navbar}

            <section id="main">

				
						<header id="header">
							<div className="split-para">UDP Chat App <span>Data Communications and Computer Networks  </span></div>
						</header>

            <div className="inner">
								<header>
									<div className="center">
										<ul className="icons">
                      <li><a target="_blank" rel="noopener noreferrer" href="https://github.com/asianswagstorm/NetworkingStuff/blob/master/code/p2p.js" class="icon fa-github"><span class="label">Github</span></a></li>
											<span>View the code</span>
                    </ul>
									</div>
								</header>
								<h2>What is it</h2>
								<p>This console based application uses UDP4 sockets and Docker containers to enable a multi user chat feature. Using dockers allow for multiple containers (multiple users, 1 container per user) to listen on the same port and IP.
									  Users can chat in private mode, channel mode and general, additionally users can also see who is active in the chatroom.  
									 </p>
									 <section id="one" className="wrapper style1">
									  
									 <article className="feature left">
						<span className="image"><img src="images/projects/UDP2.png" alt="" /></span>
						<div className="content">
							<h4>Example of private messaging between Ben and Jerry</h4>
							<p>Users can start a private chat with other users in the chatroom using the <strong>/private</strong> command, these messages are only visible between the two users. Here we can see Ben and Jerry discussing about the new user Tom who just entered the chatroom.</p>
						
						</div>
					</article>

					<article className="feature right">
						<span className="image"><img src="images/projects/UDP3.png" alt="" /></span>
						<div className="content">
							<h4>Example of channel messaging </h4>
							<p>Channel messaging is messaging only to all users that are in the current channel, similar to private messaging but to a group of users.</p>
						
						</div>
					</article>

					<article className="feature left">
						<span className="image"><img src="images/projects/UDP1.png" alt="" /></span>
						<div className="content">
							<h4>Example of leaving the application </h4>
							<p>When a user leaves the chatroom with <strong>/leave</strong> all users are notified and the users is taken out of the users array.</p>
						
						</div>
					</article>
									 
									 </section>

								<h2>What I learned</h2>
								<p>Working on networking, I learned about TCP and UDP protocols. HTTP Requests, and the 7 layers of the Open System Interconnection Model  </p>
								<ul>
									<li>Application</li>
									<li>Presentation</li>
									<li>Session</li>
									<li>Transport</li>
									<li>Network</li>
									<li>Data Link</li>
									<li>Physical</li>
								</ul>
									
								<p> I was exposed to Docker Terminals which has given me the knowledge/understanding of vitualizion (running localized virtual containers) instead of running apps multiple servers. 
								
								</p>
								
                </div>

           {footer}

                </section>
                </div>
            
            
         );
                 }
                    }
export default comp445;


