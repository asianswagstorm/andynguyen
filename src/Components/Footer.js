import React, { Component } from 'react';
import '../css/Home.css';
//Clean this up!!! 
class Footer extends Component {
    render = () => {
       const specialFooter = this.props.specialFooter;
       const footer2 = this.props.footer2;
        if(specialFooter === true && footer2 !== true){
            return(
                <footer id="footer1">
                <div className="copyright">
                    &copy; 2020<span > Andy Nguyen</span>
                </div>
                </footer>   
            );
        }
        else if(footer2 === true){
            return(
                <footer id="footer2">
                <div className="copyright">
                    &copy; 2020<span > Andy Nguyen</span>
                </div>
                </footer>   
            );
        }
        else
        return (
      <footer id="footer">
            <div className="copyright">
                &copy; 2020<span > Andy Nguyen</span>
            </div>
        </footer>   
    
        );
                 }
                    }

export default Footer;