import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/soen387.css';
import '../css/font-awesome.min.css';
import Navbar from  './Navbar';

class soen387 extends Component {
    render = () => {
        const navbar = <Navbar/>
        return (
            <div className="page-wrap">
            {navbar}
            <div className="box">
            <h1>Login</h1>
            <div className="form">
              <label>Email</label>
              <input type="text" placeholder="Enter your Email"/>
              <label>Password</label>
              <input type="password" placeholder="Enter your password"/>
              <a href="#">Forgot password?</a>
              <button>Login</button>
            </div>
            </div>
            </div>
            
         );
                 }
                    }

export default soen387;

