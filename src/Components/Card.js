import React from 'react';

const Card = (props) => (
            <div className="media">
                <a target = {props.linkType === "external" ? "_blank" : "_self"} rel="noopener noreferrer" href={props.href}><img src={props.imgSrc} alt="" title={props.href} /> </a>
            </div>
);

export default Card;
