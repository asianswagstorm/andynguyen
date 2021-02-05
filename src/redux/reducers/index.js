import {combineReducers} from 'redux';
import gamesReducer from './GamesReducer';
import connectFourReducer from './ConnectFourReducer';
import ticTacToeReducer from './TicTacToeReducer';
import PokemonReducer from './PokemonReducer';
import RecipeReducer from './RecipeReducer';
import MusicMasterReducer from './MusicMasterReducer';
import covidReducer from "./CovidReducer";
const rootReducer = combineReducers({covidReducer,gamesReducer,connectFourReducer,ticTacToeReducer,PokemonReducer,RecipeReducer,MusicMasterReducer});

export default rootReducer;
 