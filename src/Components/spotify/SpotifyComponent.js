import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import "./spotifyApp.css";
import Headers from "../Headers";
import Search from "./Search";
import Artist from "./Artist";
import Tracks from "./Tracks";

class SpotifyComponent extends Component {
  componentDidMount = () => {
    window.scrollTo(0, 0);
  }
  
  render = () => {
   
    const headerTitle = this.props.artist !== null ? "Music Master" : "Welcome to Music Master";
    return (
      <div className="Spotify">
        <Headers linkTo = "#/" headerTitle = {headerTitle} origin = "spotify" artist = {this.props.artist} />   
        <Search  action_props={this.props.action_props} />
        <div className="spotify__content">    
          {this.props.artist !== null ? (
            <div className="artist__section">
                <Artist artist={this.props.artist}/>
                <Tracks action_props={this.props.action_props}/>
            </div>
          ) : (
            <div className="initial__spotify__messages">
              <h3> Search for an artists to preview their top 10 songs. </h3>
              <h4>
                This app uses a Spotify API Wrapper to show artists information.
                It also uses the Youtube API to link the song on Youtube.
              </h4>
              <p>
                For the best experience possible have the Spotify desktop
                application open or Spotify App installed. (Chrome Browser is recommended.)
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
};

const mapStateToProps = state => { 
  const musicProps  = state.MusicMasterReducer.defaultMusicStates; 
  const {artist} = musicProps;

  return {artist};
};

export default withRouter(connect(mapStateToProps)(SpotifyComponent));
