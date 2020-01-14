import {TICTACTOE_TYPE} from "./types";
import {tictactoe_boxes} from "../../Components/constants/Games";

const setOpponentSuccess = compEnabled => {
    return {
        type: TICTACTOE_TYPE.SET_COMP_ENABLED,
        compEnabled 
    };
};

export const adjust_number_of_turns = remaining_turns => {
    return {
        type: TICTACTOE_TYPE.DECREMENT_NUMBER_OF_TURNS,
        remaining_turns
    };
};

export const setTie = isTie => {
    return {
        type: TICTACTOE_TYPE.SET_TIE_TRUE,
        isTie
    };
};

export const setWinIndex = winIndex => {
    return {
        type: TICTACTOE_TYPE.SET_WIN_INDEX,
        winIndex
    };
};

export const setGameOver = (gameOver) => {
    return {
        type: TICTACTOE_TYPE.SET_GAME_OVER,
        gameOver
    };
};

export const resetTicTacToeCell = () => dispatch => {
    dispatch(resetTicTacToeCellSuccess(tictactoe_boxes));
};

export const resetTicTacToeCellSuccess = (tictactoe_boxes) => {
    return {
        type: TICTACTOE_TYPE.RESET_TICTACTOEGAME,
        tictactoe_boxes
    };
};

export const setCurrentPlayer = player_one_turn => {
    return {
        type: TICTACTOE_TYPE.SET_CURRENT_PLAYER,
        player_one_turn
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
        player1_score: player1_score //
    };
};

export const setPlayer2Score = player2_score => {
    return {
        type: TICTACTOE_TYPE.SET_PLAYER2_SCORE,
        player2_score: player2_score 
    };
};

export const setTicTacToeCell = tictactoe_boxes => {
    return {
        type: TICTACTOE_TYPE.SET_TIC_TAC_TOE_CELLS,
        tictactoe_boxes 
    };
};


