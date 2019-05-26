import React, { Component } from 'react';
import '../css/Home.css';

class Footer extends Component {
    render = () => {
       const specialFooter = this.props.specialFooter;
        if(specialFooter === true){
            return(
                <footer id="footer1">
                <div className="copyright">
                    &copy; 2019<span > Andy Nguyen</span>
                </div>
                </footer>   
            );
        }
        else
        return (
      <footer id="footer">
            <div className="copyright">
                &copy; 2019<span > Andy Nguyen</span>
            </div>
        </footer>   
    
        );
                 }
                    }

export default Footer;