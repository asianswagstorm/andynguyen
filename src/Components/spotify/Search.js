import React, { Component } from "react";
import {filterArtistByName} from "./filterArtist";
class Search extends Component {
  state = { artistQuery: "", listOfArtist: [] };

  updateArtistQuery = event => {
    const artistQuery = event.target.value;
    this.setState({ listOfArtist : filterArtistByName(artistQuery), artistQuery });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.searchArtist();
    }
  };

  searchArtist = () => {
    this.props.searchArtist(this.state.artistQuery);
  };

  /*
  this.props.noResultsFound !== "" && (this.props.noResultsFound === "false") ? "artist_search_success" : "artist_search_error" 

  */


  render() {
    return (
      <div className="artist__search__section">
        <div className="search__artist" id={this.props.noResultsFound.className}>
          <div className = "spotify__input__section">
        
            <input
              list="artists"
              className= "search__input"
              type="search"
              onChange={this.updateArtistQuery}
              onKeyPress={this.handleKeyPress}
              placeholder={" Search for an Artist"}
              required/>
         
          <datalist id="artists"  className= "search__datalist"> 
            { this.state.listOfArtist.slice(0,7).map((artist, key) =>
               <option id="select__artist__option" key={key} value={artist}> {artist} </option>) 
            }
          </datalist>
         
          </div>
          <button
              className={`search_button ${this.props.noResultsFound.className}`}
              type="submit"
              onClick={this.searchArtist}
            >
              <i className="fa fa-search"> </i>
          </button>
        </div>

        {this.props.noResultsFound.message !== "" && 
          <div className="invalid__search"><strong>{this.props.noResultsFound.message}</strong></div>
        }
      </div>
    );
  }
}

export default Search;
