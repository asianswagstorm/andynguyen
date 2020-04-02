const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";

export const fetchArtist = artistQuery => 
    (fetch(`${API_ADDRESS}/artist/${artistQuery}`) 
      .then(response => response.json()));

export const getTopTracks = artistID => (fetch(`${API_ADDRESS}/artist/${artistID}/top-tracks`) //fetch top tracks
      .then(response => response.json()))
