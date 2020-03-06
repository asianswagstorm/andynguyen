import React, { Component } from 'react';
import '../css/Home.css';

class Footer extends Component {
    render = () => {
      
        return (
        <footer id="footer">
                <div className="copyright">
                   
                    <span id="siteseal">
                        <img id = "seal-img" src="https://seal.godaddy.com/images/3/en/siteseal_gd_3_h_d_m.gif" alt="security_seal"></img>
                    </span>
                   <strong>  &copy; 2020<span > Andy Nguyen</span></strong>
                </div>
        </footer>   
        );
    };
};

export default Footer;