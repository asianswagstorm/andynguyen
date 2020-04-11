import {winCombos} from "../../Components/constants/TicTacToeConstants";

export const defaultTicTacToeStates = 
{
    tictactoe_boxes : [ 
        ['','',''],
        ['','',''],
        ['','','']
    ],
    winIndex : '',
    remaining_turns : 9,
    current_positions : [],
    possible_winning_combo : winCombos,
    player_one_possible_winning_combo : winCombos ,
    next_moves : [],
    player1IndexPossibleWin : []
};

const DEFAULT_STATES = {defaultTicTacToeStates: {...defaultTicTacToeStates}};

const ticTacToeReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case 'RESET_TICTACTOEGAME':
            return {
                ...state,
                defaultTicTacToeStates: {   ...state.defaultTicTacToeStates, next_moves: [], 
                                            player1IndexPossibleWin: defaultTicTacToeStates.player1IndexPossibleWin,
                                            player_one_possible_winning_combo: defaultTicTacToeStates.player_one_possible_winning_combo,
                                            current_positions: [],
                                            possible_winning_combo:defaultTicTacToeStates.possible_winning_combo, remaining_turns: 9,
                                            tictactoe_boxes: [...action.tictactoe_boxes], winIndex: '' }
            };
        case 'UPDATE_INDEX_POSSIBLE_WIN':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, player1IndexPossibleWin: action.player1IndexPossibleWin}
            }; 
        case 'UPDATE_NEXT_MOVE': 
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, next_moves: action.next_moves}
            }; 
        case 'UPDATE_PLAYER_ONE_POSSIBLE_WIN_COMBO':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, player_one_possible_winning_combo: action.player_one_possible_winning_combo}
            }; 
        case 'UPDATE_POSSIBLE_WIN_COMBO':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, possible_winning_combo: action.possible_winning_combo}
            }; 
        case 'UPDATE_CURRENT_POSITIONS':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, current_positions: action.current_positions}
            }; 
        case 'DECREMENT_NUMBER_OF_TURNS':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, remaining_turns: action.remaining_turns}
            };
        case 'SET_WIN_INDEX':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, winIndex: action.winIndex}
            };
        case 'SET_TIC_TAC_TOE_CELLS':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, tictactoe_boxes: action.tictactoe_boxes }
            };
        default:
            return state; //save state
    }
};

export default ticTacToeReducer 