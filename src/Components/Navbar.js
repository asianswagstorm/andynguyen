import React, { Component } from 'react';

import '../css/Home.css';

class Navbar extends Component {
    render = () => {
        return (
            <nav id="nav">
            <ul>
              <li><a href="#/" className="active"><span className="icon fa-home"></span></a></li>
            </ul>
             </nav>
         );
                 }
                    }

export default Navbar;