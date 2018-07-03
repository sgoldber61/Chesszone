import * as types from '../actions/types.js';

export default function(state = {username: null, error: null}, action) {
  switch (action.type) {
    case types.AUTH_USER:
      return {...state, username: action.payload};
    case types.LOGOUT_USER:
      return {...state, username: null};
    case types.AUTH_ERROR:
      return {...state, error: action.payload};
    case types.CLEAR_AUTH_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
}

