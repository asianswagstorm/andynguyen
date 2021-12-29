import React, { Component } from "react";
import {filterArtistByName} from "./filterArtist";
import ArtistSuggestions from "./ArtistSuggestions";
import { withRouter } from "../../helpers";
import { connect } from 'react-redux';
const listLimit = 6;

class Search extends Component {
  state = { artistQuery: "", listOfArtist: [], hidden: true, currentSelected: -1}; 

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
    const {dispatch} = this.props;
    const {getArtist} = this.props.action_props.music_master_action;
    dispatch(getArtist(artistQuery));
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
    const {listOfArtist,artistQuery,hidden,currentSelected} = this.state;
    
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
                value={artistQuery}/> 

            {(listOfArtist.length > 0 &&  hidden === false) && 
                  <ArtistSuggestions  listOfArtist={listOfArtist} 
                                      currentSelected= {currentSelected} 
                                      searchArtist={this.searchArtist} 
                                      hoverArtist= {this.hoverArtist} 
                                      listLimit={listLimit}/>
            }
          </div>
          <button
              className={`search_button ${this.props.noResultsFound.className}`}
              type="submit"
              onClick={() => this.searchArtist(artistQuery)}
            >
              <span className="search__icon"> <i className="fa fa-search"> </i> </span>
          </button>
        </div>

        {this.props.noResultsFound.message !== "" && 
          <div className="invalid__search"><strong>{this.props.noResultsFound.message}</strong></div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => { 
  const musicProps  = state.MusicMasterReducer.defaultMusicStates; 
  const {noResultsFound} = musicProps;

  return {noResultsFound};
};

export default withRouter(connect(mapStateToProps)(Search));
