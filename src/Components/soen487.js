import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/soen487.css';
import Navbar from  './Navbar';

class soen487 extends Component {
    
    render = () => {
        const navbar = <Navbar/>
        return (
            <div className="page-wrap">
  
            {navbar}
            </div>
         );
                 }
                    }

export default soen487;