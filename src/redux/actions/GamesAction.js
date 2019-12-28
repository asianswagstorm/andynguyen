import {TICTACTOE_TYPE} from "./types";

const setOpponentSuccess = compEnabled => {
    return {
        type: TICTACTOE_TYPE.SET_COMP_ENABLED,
        compEnabled 
    };
};

export const setOpponent = compEnabled => dispatch =>{
    dispatch(setOpponentSuccess(compEnabled))
};

export const setGameMessage = game_message => {
    return {
        type: TICTACTOE_TYPE.SET_GAME_MESSAGE,
        game_message
    };
};

export const setPlayer1Score = player1_score => {
    return {
        type: TICTACTOE_TYPE.SET_PLAYER1_SCORE,
        player1_score: player1_score++ //
    };
};

export const setPlayer2Score = player2_score => {
    return {
        type: TICTACTOE_TYPE.SET_PLAYER2_SCORE,
        player2_score: player2_score++ 
    };
};

export const setTicTacToeCell = tictactoe_boxes => {
    return {
        type: TICTACTOE_TYPE.SET_TIC_TAC_TOE_CELLS,
        tictactoe_boxes 
    };
};


