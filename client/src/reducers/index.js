import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth.js';
import gameReducer from './game.js';
import boardReducer from './board.js';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  game: gameReducer,
  board: boardReducer
});

export default rootReducer;

