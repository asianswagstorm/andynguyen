import {tictactoe_boxes} from "../../Components/constants/Games";

const defaultTicTacToeStates = 
{
    picked_player : false,
    tictactoe_boxes,
    compEnabled : false,  //human vs computer
    player1_score : 0,
    player2_score : 0,
    game_message : "Select opponent type.",
    player_one_turn : true, 
    gameOver : false,
    winIndex : '',
    remaining_turns : 9,
    isTie : false,
    current_positions : [],
    possible_winning_combo : [ //if player 1 has any of these , pop the combo
        [[0,0],[0,1],[0,2]],// 0
        [[0,0],[1,0],[2,0]],// 1
        [[0,0],[1,1],[2,2]],// 2
        [[1,0],[1,1],[1,2]],// 3
        [[2,0],[2,1],[2,2]],// 4
        [[0,1],[1,1],[2,1]],// 5
        [[0,2],[1,2],[2,2]],// 6
        [[0,2],[1,1],[2,0]]  // 7
    ],
    next_moves : []
};

//current positions

const DEFAULT_STATES = {defaultTicTacToeStates: {...defaultTicTacToeStates}};

const gamesReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case 'RESET_TICTACTOEGAME':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, next_moves: [], player_one_turn: defaultTicTacToeStates.player_one_turn, current_positions: [], possible_winning_combo:defaultTicTacToeStates.possible_winning_combo, remaining_turns: 9, isTie: false, tictactoe_boxes: [...tictactoe_boxes], game_message: "Make your move.", gameOver:defaultTicTacToeStates.gameOver, winIndex: '' }
            };
        case 'UPDATE_NEXT_MOVE': 
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, next_moves: action.next_moves}
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
        case 'PICK_PLAYER_TYPE':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, picked_player: action.picked_player}
            }; 
        case 'SET_TIE_TRUE':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, isTie: action.isTie}
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
        case 'SET_CURRENT_PLAYER':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, player_one_turn: action.player_one_turn }
            };
        case 'SET_TIC_TAC_TOE_CELLS':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, tictactoe_boxes: action.tictactoe_boxes }
            };
        case 'SET_PLAYER1_SCORE':
            return {
                ...state, 
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, player1_score: action.player1_score }
            };
        case 'SET_PLAYER2_SCORE':
            return {
                ...state, 
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, player2_score: action.player2_score }
            };
        case 'SET_GAME_MESSAGE':
            return {
                ...state, 
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, game_message: action.game_message }
            };
        case 'SET_COMP_ENABLED':
            return {
                ...state, 
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, compEnabled: action.compEnabled }
            };
        case 'SET_GAME_OVER': 
            return {
            ...state, 
            defaultTicTacToeStates: {...state.defaultTicTacToeStates, gameOver: action.gameOver }
        };
        default:
            return state; //save state
    }; 
};

export default gamesReducer 