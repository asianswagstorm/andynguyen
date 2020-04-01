import React, { Component } from "react";
import {filterArtistByName} from "./filterArtist";
// import 'antd/dist/antd.css';

class Search extends Component {
  state = { artistQuery: "", listOfArtist: [], hidden: true};

  fetchArtistList = (event) => {
    const artistQuery = event.target.value;
    const listOfArtist =  filterArtistByName(artistQuery);
    this.setState({ listOfArtist, artistQuery,hidden: false });
  };

  //DNW!!
  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.searchArtist();
    }
  };

  setArtist = (artistQuery) =>  this.setState({ artistQuery });

  searchArtist = () => {
    this.setState({ hidden : true })
    this.props.searchArtist(this.state.artistQuery);
  };

//this.state.

  render() {

    // const options =  (this.state.listOfArtist.slice(0,7)).map((artist, key) =>
    //   <option key={key} value={artist}> {artist} </option> 
    // );

    const artists = (<ul className="select-list-group__list" data-toggle="false">
                        {(this.state.listOfArtist.slice(0,7)).map((artist, key) =>
                              <li className="select-list-group__list-item" key={key} data-display="true" data-highlight="false" onClick={() => this.setArtist(artist) }> {artist} </li> 
                          )}
                    </ul>)
    // {typeof(artist)}
    return (
      <div className="artist__search__section">
        <div className="search__artist" id={this.props.noResultsFound.className}>
          <div className = "spotify__input__section">
          <input
              list="artists"
              className= "search__input"
              type="search"
              onChange={this.fetchArtistList}
              onKeyPress={this.handleKeyPress}
              placeholder={" Search for an Artist"}
              required
              value={this.state.artistQuery}/>
         {(this.state.listOfArtist.length > 0 &&  this.state.hidden === false) && 
              <div className="artist__suggestion"> 
                <button className="close__suggestion" onClick={() => this.setState({ hidden: true }) }> X </button>
                {artists}
              </div>
          }
          {/* <datalist id="artists"  className= "search__datalist"> 
           <select id="artists" className= "search__select">
            { options }
            </select>
          </datalist> */}
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
// {artist is type array???? }