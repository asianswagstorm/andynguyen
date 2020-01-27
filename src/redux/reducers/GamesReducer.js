const defaultGamesStates = {
    picked_player : false,
    compEnabled : false,  //human vs computer
    player1_score : 0,
    player2_score : 0,
    game_message : "Select opponent type.",
    player_one_turn : true, 
    isTie : false,
    gameOver : false,
    gameType : ""
}


//current positions

const DEFAULT_STATES = {defaultGamesStates: {...defaultGamesStates}};

const gamesReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case 'RESET_GAME':
            return {
                ...state,
                defaultGamesStates: {...state.defaultGamesStates, player_one_turn: defaultGamesStates.player_one_turn, isTie: false, game_message: "Make your move.", gameOver:defaultGamesStates.gameOver }
            };

        case 'PICK_PLAYER_TYPE':
            return {
                ...state,
                defaultGamesStates: {...state.defaultGamesStates, picked_player: action.picked_player}
            }; 
        case 'SET_TIE_TRUE':
            return {
                ...state,
                defaultGamesStates: {...state.defaultGamesStates, isTie: action.isTie}
            };
        case 'SET_CURRENT_PLAYER':
            return {
                ...state,
                defaultGamesStates: {...state.defaultGamesStates, player_one_turn: action.player_one_turn }
            };
        case 'SET_PLAYER1_SCORE':
            return {
                ...state, 
                defaultGamesStates: {...state.defaultGamesStates, player1_score: action.player1_score }
            };
        case 'SET_PLAYER2_SCORE':
            return {
                ...state, 
                defaultGamesStates: {...state.defaultGamesStates, player2_score: action.player2_score }
            };
        case 'SET_GAME_MESSAGE':
            return {
                ...state, 
                defaultGamesStates: {...state.defaultGamesStates, game_message: action.game_message }
            };
        case 'SET_COMP_ENABLED':
            return {
                ...state, 
                defaultGamesStates: {...state.defaultGamesStates, compEnabled: action.compEnabled }
            };
        case 'SET_GAME_OVER': 
            return {
            ...state, 
            defaultGamesStates: {...state.defaultGamesStates, gameOver: action.gameOver }
        };
        default:
            return state; //save state
    }; 
};

export default gamesReducer 