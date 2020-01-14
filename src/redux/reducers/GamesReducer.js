import {tictactoe_boxes} from "../../Components/constants/Games";

const defaultTicTacToeStates = 
{
    tictactoe_boxes,
    compEnabled : false,  //human vs computer
    player1_score : 0,
    player2_score : 0,
    game_message : "Make your move.",
    player_one_turn : true, 
    gameOver : false,
    winIndex : '' //temp
};

const DEFAULT_STATES = {defaultTicTacToeStates: {...defaultTicTacToeStates}};
//tictactoe_boxes doesnt reset

const gamesReducer = (state = DEFAULT_STATES, action) => {
    switch(action.type) {
        case 'RESET_TICTACTOEGAME':
            return {
                ...state,
                defaultTicTacToeStates: {...state.defaultTicTacToeStates, player_one_turn: defaultTicTacToeStates.player_one_turn, tictactoe_boxes: action.tictactoe_boxes, game_message: defaultTicTacToeStates.game_message, gameOver:defaultTicTacToeStates.gameOver, winIndex: '' }
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