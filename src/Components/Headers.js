import React from 'react';

const secondHead = (props) => {

    if(props.origin === "spotify"){
        return (props.artist !== null && 
        <h3 id="app-header">
            Click on the <i className="fab fa-spotify" /> icon to play on Spotify
            <br />
            or <i className="fab fa-youtube" /> icon to play on YouTube
        </h3>)
    }
    else {
        return (<h2 id="app-header">{props.origin !== "false" ? "Written in React with Redux" : "Go back to homepage!" }</h2>)
    }
};

const Headers = props => (
        <header className="MyHeader"> 
            <h1 id="app-header">
                <a href= {props.linkTo}>
                {props.headerTitle}
                </a>
            </h1>
            {props.origin && secondHead(props)}
        </header>
);

export default Headers;
