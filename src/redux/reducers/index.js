import {combineReducers} from 'redux';
import gamesReducer from './GamesReducer';
import connectFourReducer from './ConnectFourReducer';
import ticTacToeReducer from './TicTacToeReducer';
import PokemonReducer from './PokemonReducer';
const rootReducer = combineReducers({gamesReducer,connectFourReducer,ticTacToeReducer,PokemonReducer});

export default rootReducer;
 