import React, { Component } from 'react';

class Card extends Component {
  
    render() {
        return (
            <div className="media">
                <a target = "_blank" rel="noopener noreferrer" href={this.props.href}><img src={this.props.imgSrc} alt="" title={this.props.href} /> </a>
            </div>
        );
    }

}

export default Card;
