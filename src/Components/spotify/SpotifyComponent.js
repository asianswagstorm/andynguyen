import React, { Component } from "react";
import "./App.css";
import Headers from "../Headers";
import Search from "./Search";
import Artist from "./Artist";
import Tracks from "./Tracks";

const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";

class SpotifyComponent extends Component {
  state = { artist: null, tracks: [], noResultsMessage: ""};

  /* I am using an API wrapper, no API authentication token required. This API limits to one search 
  {"artists":
      {
            "href":"https://api.spotify.com/v1/search?query=${artistQuery}&type=artist&offset=0&limit=1",
            "items":[
                      "external_urls":
                        {
                           "spotify":,
                           "followers":{"href", "total"},
                           "genres":[],
                           "href":,
                           "id":,
                           "images":[ ... 3 different height same image],
                           "name":,
                           "popularity":,
                           "type":,
                           "uri":
                        }
                    ],
            "limit":1,
            "next":null,
            "offset":0,
            "previous":null,
            "total":0
      }
  }
  */

  // clean this up!!!
  searchArtist = artistQuery => {
    fetch(`${API_ADDRESS}/artist/${artistQuery}`) //fetch artist , returns a Promise
      .then(response => response.json())
      .then(json => {
        if (Object.keys(json.artists.items).length !== 0) {

          //"https://api.spotify.com/v1/search?query=michael&type=artist&offset=0&limit=1" official api requires a token
          const artist = json.artists.items[0];

          this.setState({ artist ,noResultsMessage:""});

          fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`) //fetch top tracks
            .then(response => response.json())
            .then(json => this.setState({ tracks: json.tracks })) //top 10 tracks
            .catch(error => alert(error.message));
        } else{
          let noResultsFound = `No artist found of the name ${artistQuery} ! Please Try another artist.`;
          this.setState({ noResultsMessage:noResultsFound });
          //alert(noResultsFound);
        }
      })
      .catch(error => alert(error.message));
  };

  render() {

    const headerTitle =
      this.state.artist !== null ? "Music Master" : "Welcome to Music Master";

    return (
      <div className="Spotify">
          <Headers linkTo = "#/" headerTitle = {headerTitle} origin = "spotify" artist = {this.state.artist} />   

          {/* {console.log("searchArtist", this.state.searchArtist)} */}
          <hr className="horizontal" />
          <Search searchArtist={this.searchArtist} noResultsFound = {this.state.noResultsMessage} />
          {/* {console.log("artist", this.state.artist)} */}
        
        <hr className="horizontal" />
        <div className="content">
          {/* make it a card */}
          {this.state.artist !== null ? (
            <div>
              <div className="artist-section">
                <Artist artist={this.state.artist} />
              </div>
              {/* {console.log("tracks", this.state.tracks)} */}
              <hr className="horizontal" />
              <div>
                <Tracks tracks={this.state.tracks} artist={this.state.artist} />
              </div>
            </div>
          ) : (
            <div>
              <h3> Search for an artists to preview their top 10 songs. </h3>
              <h4>
                This app uses a Spotify API Wrapper to show artists information.
              </h4>
              <p>
                For the best experience possible have the Spotify desktop
                application open or Spotify App installed.
              </p>
            </div>
          )}
        </div>

      </div>
    );
  }
}

export default SpotifyComponent;