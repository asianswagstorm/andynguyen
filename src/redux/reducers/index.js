import {combineReducers} from 'redux';
import gamesReducer from './GamesReducer';
import connectFourReducer from './ConnectFourReducer';
import ticTacToeReducer from './TicTacToeReducer';
const rootReducer = combineReducers({gamesReducer,connectFourReducer,ticTacToeReducer});//tictactoe reducer

export default rootReducer;
 