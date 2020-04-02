import React, { Component } from "react";
import {filterArtistByName} from "./filterArtist";
// import 'antd/dist/antd.css';
const listLimit = 6;

class Search extends Component {
  state = { artistQuery: "", listOfArtist: [], hidden: true, currentSelected: -1}; //, hoveredIndex : -1

  fetchArtistList = (event) => {
    const artistQuery = event.target.value;
    const listOfArtist =  filterArtistByName(artistQuery);
    this.setState({ listOfArtist, artistQuery,hidden : false, currentSelected: -1 });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.searchArtist(this.state.artistQuery);
    }
  };

  selectArtist = (artistQuery, currentSelected) =>  this.setState({ artistQuery, hidden : true ,currentSelected});
  hoverArtist = (artistQuery, currentSelected) =>  this.setState({ artistQuery,  currentSelected});

  searchArtist = (artistQuery) => {
    this.setState({ hidden : true , currentSelected : -1 })
    this.props.searchArtist(artistQuery);
  };

  handleKeyDown = (event) => {
      //event.keyCode (down) 40 , (up) 38
     if (this.state.hidden === false && (event.keyCode === 40 || event.keyCode === 38) ) {
          const currentKey = event.keyCode === 40 ? (this.state.currentSelected === listLimit ? 0 : this.state.currentSelected + 1) : 
          (event.keyCode === 38  ? ((this.state.currentSelected <= 0) ? listLimit : this.state.currentSelected - 1) : this.state.currentSelected);
          this.setState({
            currentSelected : currentKey,
            artistQuery : this.state.listOfArtist[currentKey]
          });
    }
  };

  render() {

    const artists = (<ul className="select-list-group__list">
                        {(this.state.listOfArtist.slice(0, listLimit+1)).map((artist, key) =>
                              <li className="select-list-group__list-item" id= {key === this.state.currentSelected ? "list__item__active" : "list__item__inactive"} key={key} onClick={() => this.searchArtist(artist)}
                              onMouseEnter = {() => this.hoverArtist(artist, key)} >
                                  {artist} 
                              </li> 
                          )}
                    </ul>)
    return (
      <div className="artist__search__section">
        <div className="search__artist" id={this.props.noResultsFound.className}>
          <div className = "spotify__input__section">
          <input
              onKeyDown = {this.handleKeyDown}
              list="artists"
              className= "search__input"
              type="search"
              onChange={this.fetchArtistList}
              onKeyPress={this.handleKeyPress}
              onFocus = { () => this.setState({ hidden : true, currentSelected : -1 })}
              placeholder={" Search for an Artist"}
              required 
              value={this.state.artistQuery}/> 

         {(this.state.listOfArtist.length > 0 &&  this.state.hidden === false) && 
              <div className="artist__suggestion"> 
                {artists}
              </div>
          }
       
          </div>
          <button
              className={`search_button ${this.props.noResultsFound.className}`}
              type="submit"
              onClick={() => this.searchArtist(this.state.artistQuery)}
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
// {artist is type array???? }