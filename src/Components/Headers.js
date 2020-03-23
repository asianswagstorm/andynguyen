import React from 'react';

const Headers = props => (
        <header className="MyHeader"> 
            <h1 id="my-games">
                <a href= {props.linkTo}>
                {props.headerTitle}
                </a>
            </h1>
            {(props.origin || props.notFound) && 
            <h2 id="my-games">{props.origin ? "Written in React with Redux" : "Go back to homepage!" }</h2>}
        </header>
);

export default Headers;