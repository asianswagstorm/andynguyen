const defaultMusicStates = {
    tracks : [],
    artist : null,
    previousYoutubeSeach : "",
    previousYoutubeLink : "",
    noResultsFound : {}
};

const DEFAULT_STATES = {defaultMusicStates: {...defaultMusicStates}};

const MusicMasterReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case "SET_TRACKS":
            return {
                ...state,
                defaultMusicStates: {...state.defaultMusicStates, tracks : action.tracks}
            };
        case "SET_ARTIST":
            return {
                ...state,
                defaultMusicStates: {...state.defaultMusicStates, artist : action.artist}
            };
        case "SET_NORESULTS_OBJECT":
            return {
                ...state,
                defaultMusicStates: {...state.defaultMusicStates, noResultsFound : action.noResultsFound}
            }
        case "SET_YOUTUBE_SEARCH":  
            return {
                ...state,
                defaultMusicStates: {...state.defaultMusicStates, previousYoutubeSeach : action.previousYoutubeSeach }
            };
        case "SET_PREVIOUS_YOUTUBE_LINK":  
            return {
                ...state,
                defaultMusicStates: {...state.defaultMusicStates, previousYoutubeLink : action.previousYoutubeLink }
            };
        default:
            return state;
    }
};

export default MusicMasterReducer