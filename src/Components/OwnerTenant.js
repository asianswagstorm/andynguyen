import React, { Component } from 'react';

class OwnerTenant extends Component{
   /* constructor(props){
        super(props);
      }*/

    render =() => {
        return(
            <div className="column" >
								
            <span className="image left">   <img src={this.props.src} id={this.props.index}  alt="" /> </span>
            <h3>{this.props.view}</h3>
            <p> {this.props.description}            </p>
            
             </div>
                );}
}
export default OwnerTenant;