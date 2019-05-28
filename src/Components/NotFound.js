import React, { Component } from 'react';

import '../css/Home.css';
import '../css/font-awesome.min.css';
import Navbar from  './Navbar';
import Footer from  './Footer';

class NotFound extends Component {
    render = () => {
        const navbar = <Navbar/>
				const footer = <Footer specialFooter = {true} footer2 = {true} />
        return (
            <div className="page-wrap">
            {navbar}

            <section id="main">
				
						<header id="header">
							<div className="split-para">Nothing to see here  <a href="/"><span>Go back to home page </span></a></div>
						</header>

						<h1 className="center">404 ERROR,YOU HAVE REACHED A DEFAULT ROUTE </h1>

              {footer}

                </section>
                </div>
            
         );
                 }
                    }

export default NotFound;

