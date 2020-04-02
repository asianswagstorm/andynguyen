import React, { Component } from "react";
import {fetchArtist,getTopTracks} from "./spotifyServices";
import "./spotifyApp.css";
import Headers from "../Headers";
import Search from "./Search";
import Artist from "./Artist";
import Tracks from "./Tracks";

class SpotifyComponent extends Component {
  state = { artist: null, tracks: [], noResultsMessage: {className: "",message:""}};
  //Add Redux!!! 
  searchArtist = artistQuery => {
    fetchArtist(artistQuery).then(json => {
      if (Object.keys(json.artists.items).length !== 0) {
        const artist = json.artists.items[0];
        this.setState({ artist ,noResultsMessage: { className: "artist_search_success",
                                                      message : "" }});
        getTopTracks(artist.id).then(json => this.setState({ tracks: json.tracks })).catch(error => Error(error));
      } 
      else{
        this.setState({ noResultsMessage: { className: "artist_search_error",
                                              message : `No artist found of the name ${artistQuery} ! Please Try another artist.` }});
      }
    }).catch(error => {
        const message = (artistQuery.trim() === "") ? "Input cannot be blank" : "Input cannot have special characters!"; 
        
        this.setState({  noResultsMessage: { className: "artist_search_error",
                                            message : message } })
        Error(error);
    });
  };

  render = () => {
    const headerTitle =
      this.state.artist !== null ? "Music Master" : "Welcome to Music Master";

    return (
      <div className="Spotify">
        <Headers linkTo = "#/" headerTitle = {headerTitle} origin = "spotify" artist = {this.state.artist} />   
        <Search searchArtist={this.searchArtist} noResultsFound = {this.state.noResultsMessage} />
      
        <div className="spotify__content">    
          {this.state.artist !== null ? (
            <div className="artist__section">
                <Artist artist={this.state.artist} />
                <Tracks tracks={this.state.tracks} artist={this.state.artist} />
            </div>
          ) : (
            <div>
              <h3> Search for an artists to preview their top 10 songs. </h3>
              <h4>
                This app uses a Spotify API Wrapper to show artists information.
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

export default SpotifyComponent;
