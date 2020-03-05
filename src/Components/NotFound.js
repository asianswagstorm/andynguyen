import React, { Component } from 'react';
import '../css/Home.css';
import '../css/font-awesome.min.css';

class NotFound extends Component {
    render = () => {
        return (
            <section id="main">
              <header id="header">
                <div className="split-para">Nothing to see here  <a href="#/"><span>Go back to home page </span></a></div>
              </header>

						  <h1 className="center">404 ERROR,YOU HAVE REACHED A DEFAULT ROUTE </h1>
            </section>
         );
    };};

export default NotFound;

