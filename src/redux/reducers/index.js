import {combineReducers} from 'redux';
import {gamesReducer} from './GamesReducer';

const rootReducer = combineReducers({gamesReducer});

export default rootReducer;
 