import {MUSICMASTER_TYPE} from "./types";
import {fetchArtist,getTopTracks} from "../../Components/spotify/spotifyServices";

export const getArtist = artistQuery => dispatch => {
    fetchArtist(artistQuery).then(json => {
        if (Object.keys(json.artists.items).length !== 0) {
            const artist = json.artists.items[0];
            const noResultsFound = {    className: "artist_search_success",
                                        message : "" };
            dispatch(setArtist(artist));
            dispatch(setErrorObject(noResultsFound));
    
            getTopTracks(artist.id).then(json =>  dispatch(setTracks(json.tracks))
            ).catch(error => Error(error));
        } 
        else{
            const noResultsFound= {  className: "artist_search_error",
                                     message : `No artist found of the name ${artistQuery} ! Please Try another artist.` };
            dispatch(setErrorObject(noResultsFound))
        }
      }).catch(error => {
          const message = (artistQuery.trim() === "") ? "Input cannot be blank" : "Input cannot have special characters!"; 
          
          const noResultsFound = {  className: "artist_search_error",
                                    message : message };
          dispatch(setErrorObject(noResultsFound))
          Error(error);
      });
};

export const setPreviousYoutube = previousYoutubeSeach => ({
    type: MUSICMASTER_TYPE.SET_YOUTUBE_SEARCH,
    previousYoutubeSeach
});

export const setPreviousYoutubeLink = previousYoutubeLink => ({
    type: MUSICMASTER_TYPE.SET_PREVIOUS_YOUTUBE_LINK,
    previousYoutubeLink
});

const setArtist = artist => ({
    type: MUSICMASTER_TYPE.SET_ARTIST,
    artist
});

const setErrorObject = noResultsFound => ({
    type: MUSICMASTER_TYPE.SET_NORESULTS_OBJECT,
    noResultsFound
});

const setTracks = tracks => ({
    type: MUSICMASTER_TYPE.SET_TRACKS,
    tracks
});

    
