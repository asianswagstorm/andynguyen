import React, { Component } from 'react';
import Headers from "./Headers"
import '../css/Home.css';
import '../css/font-awesome.min.css';

class NotFound extends Component {
    render = () => {
        return (
            <section id="main">
              <Headers linkTo = "/" headerTitle="Nothing to see here" origin = "false"/>
                {/* <h1 className="center">Nothing to see here</h1> */}
            </section>
         );
    };};

export default NotFound;

