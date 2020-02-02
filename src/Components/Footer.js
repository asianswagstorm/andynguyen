import React, { Component } from 'react';
import '../css/Home.css';

class Footer extends Component {
    render = () => {
      
        return (
        <footer id="footer">
                <div className="copyright">
                   <strong> &copy; 2020<span > Andy Nguyen</span></strong>
                </div>
        </footer>   
        );
    };
};

export default Footer;