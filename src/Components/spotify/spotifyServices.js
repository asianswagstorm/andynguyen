const API_ADDRESS = "https://spotify-api-wrapper.appspot.com";
const youtubeAPI = "https://www.googleapis.com/youtube/v3/search?part=snippet";
const key1 = 'AIzaSyAwj8j0jYM4pOFeFzLaJubzKjboPs_nwKk';
const key2 = 'AIzaSyBq72gwkgijg4wWbsiIoS7XSR9fdHK0Hso';
const key3 = 'AIzaSyDgY16LgxjrgXdyiPeg8xNtIsjPYfi5WHw';

export const fetchArtist = artistQuery => 
    (fetch(`${API_ADDRESS}/artist/${artistQuery}`) 
      .then(response => response.json()));

export const getTopTracks = artistID => (fetch(`${API_ADDRESS}/artist/${artistID}/top-tracks`) //fetch top tracks
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
           
            
