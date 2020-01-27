import {GAMES_TYPE} from "./types";

export const resetGame = () => ({type: GAMES_TYPE.RESET_GAME});

export const pickedPlayer = picked_player => {
    return {
        type: GAMES_TYPE.PICK_PLAYER_TYPE,
        picked_player
    };
};

export const setTie = isTie => {
    return {
        type: GAMES_TYPE.SET_TIE_TRUE,
        isTie
    };
};

export const setCurrentPlayer = player_one_turn => {
    return {
        type: GAMES_TYPE.SET_CURRENT_PLAYER,
        player_one_turn
    };
};

const setOpponentSuccess = compEnabled => {
    return {
        type: GAMES_TYPE.SET_COMP_ENABLED,
        compEnabled 
    };
};

export const setOpponent = compEnabled => dispatch =>{
    dispatch(setOpponentSuccess(compEnabled))
};

export const setGameOver = (gameOver) => {
    return {
        type: GAMES_TYPE.SET_GAME_OVER,
        gameOver
    };
};

export const setGameMessage = game_message => {
    return {
        type: GAMES_TYPE.SET_GAME_MESSAGE,
        game_message
    };
};

export const setPlayer1Score = player1_score => {
    return {
        type: GAMES_TYPE.SET_PLAYER1_SCORE,
        player1_score: player1_score //
    };
};

export const setPlayer2Score = player2_score => {
    return {
        type: GAMES_TYPE.SET_PLAYER2_SCORE,
        player2_score: player2_score 
    };
};

