import React from 'react';

const ArtistSuggestions = (props) => (
   <div className="artist__suggestion">
    <ul className="select-list-group__list">
        {(props.listOfArtist.slice(0, props.listLimit+1)).map((artist, key) =>
            <li className="select-list-group__list-item" id= {key === props.currentSelected ? "list__item__active" : "list__item__inactive"} key={key} onClick={() => props.searchArtist(artist)}
            onMouseEnter = {() => props.hoverArtist(artist, key)} >
                {artist} 
            </li> 
        )}
    </ul>
  </div> 
);

export default ArtistSuggestions;