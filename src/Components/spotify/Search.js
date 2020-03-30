import React, { Component } from "react";

class Search extends Component {
  state = { artistQuery: "" };

  updateArtistQuery = event => {
    this.setState({ artistQuery: event.target.value });
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
          <input
            className= "search__input"
            type="search"
            onChange={this.updateArtistQuery}
            onKeyPress={this.handleKeyPress}
            placeholder={" Search for an Artist"}
            required/>
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
