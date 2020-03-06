import {TICTACTOE_TYPE} from "./types";

export const adjust_number_of_turns = remaining_turns => {
    return {
        type: TICTACTOE_TYPE.DECREMENT_NUMBER_OF_TURNS,
        remaining_turns
    };
};

export const setWinIndex = winIndex => {
    return {
        type: TICTACTOE_TYPE.SET_WIN_INDEX,
        winIndex
    };
};

export const updateNextMove = next_moves => {
    return {
        type : TICTACTOE_TYPE.UPDATE_NEXT_MOVE,
        next_moves
    };
};

export const updatePlayerOnePossibleWinIndex = player1IndexPossibleWin => {
    return {
        type : TICTACTOE_TYPE.UPDATE_INDEX_POSSIBLE_WIN,
        player1IndexPossibleWin
    };
};

export const updatePlayerOnePossibleWinCombo = player_one_possible_winning_combo => {
    return {
        type : TICTACTOE_TYPE.UPDATE_PLAYER_ONE_POSSIBLE_WIN_COMBO,
        player_one_possible_winning_combo
    };
};

export const updatePossibleWinCombo = possible_winning_combo => {
    return {
        type : TICTACTOE_TYPE.UPDATE_POSSIBLE_WIN_COMBO,
        possible_winning_combo
    };
};

export const updateCurrentPositions = current_positions => {
    return {
        type: TICTACTOE_TYPE.UPDATE_CURRENT_POSITIONS,
        current_positions
    };
};

export const resetTicTacToeCell = () => dispatch => {
    dispatch(resetTicTacToeCellSuccess());
};

export const resetTicTacToeCellSuccess = () => {

    return {
        type: TICTACTOE_TYPE.RESET_TICTACTOEGAME,
        tictactoe_boxes: [['','',''],['','',''],['','','']]
    };
};

export const setTicTacToeCell = tictactoe_boxes => {
    return {
        type: TICTACTOE_TYPE.SET_TIC_TAC_TOE_CELLS,
        tictactoe_boxes 
    };
};

