const API_ADDRESS = "https://api.spotify.com/v1";
const youtubeAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet";
const spotifykey = 'ca3a431547c74569b0752e07aa151da5';
const key1 = 'AIzaSyAwj8j0jYM4pOFeFzLaJubzKjboPs_nwKk';
const key2 = 'AIzaSyBq72gwkgijg4wWbsiIoS7XSR9fdHK0Hso';
const key3 = 'AIzaSyDgY16LgxjrgXdyiPeg8xNtIsjPYfi5WHw';

export const fetchArtist = artistQuery => 
    (fetch(`${API_ADDRESS}/search?q=${artistQuery}&type=artist&limit=1`) 
      .then(response => {
            console.log("fetch artist res is", response);
            return response.json();
      }));

export const getTopTracks = artistID => (fetch(`${API_ADDRESS}/artists/${artistID}/top-tracks?country=US`) //fetch top tracks
      .then(response => response.json()))

const fetchYoutube = async (key, search) => await fetch(`${youtubeAPI}&key=${key}&q=${search}&type=video`).then(
      async response => await response)

const YTLink = async (response) => await `https://www.youtube.com/watch?v=${(await response.json()).items[0].id.videoId}`;

export const searchYoutube = async search =>{
      let response = await fetchYoutube(key1,search); 
      if(response.status === 200){
            return await YTLink(response);
      }else{
            response = await fetchYoutube(key2,search); 
            if(response.status === 200){
                  return await YTLink(response);
            }else{
                  response = await fetchYoutube(key3,search); 
                  if(response.status === 200){
                        return await YTLink(response);
                  }else return "limitReached";
            } 
      }
}; 
           
            
