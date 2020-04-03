const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";
const youtubeAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet";
// const key1 = 'AIzaSyBrS1TQF-LT5yGw115YUaHVKA9TtwZKf_c';//daily limit reached
// const key2 = 'AIzaSyAcXqxP5fOSDrx2uFq_HGc7pkdhsopM7j4';
const key3 = 'AIzaSyC12rqg-RtPR3duIAya_iYKEjkCy0hw_TM';
const YOUTUBEAPIKEY = key3; 

export const fetchArtist = artistQuery => 
    (fetch(`${API_ADDRESS}/artist/${artistQuery}`) 
      .then(response => response.json()));

export const getTopTracks = artistID => (fetch(`${API_ADDRESS}/artist/${artistID}/top-tracks`) //fetch top tracks
      .then(response => response.json()))

export const searchYoutube = async search => await fetch(`${youtubeAPI}&key=${YOUTUBEAPIKEY}&q=${search}&type=video`).then(
      async response => {
            const data = await response.json()
            return await `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`}
);
