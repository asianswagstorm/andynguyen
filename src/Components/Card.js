import React, { Component } from 'react';

class Card extends Component {
  
    render = () => {
        return (
            <div className="media">
                <a target = {this.props.linkType === "external" ? "_blank" : "_self"} rel="noopener noreferrer" href={this.props.href}><img src={this.props.imgSrc} alt="" title={this.props.href} /> </a>
            </div>
        );
    };
};

export default Card;
