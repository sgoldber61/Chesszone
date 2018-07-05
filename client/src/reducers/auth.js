import * as types from '../actions/types.js';

const initState = {auth: false, username: null, error: null};

export default function(state = initState, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return {...state, username: action.payload};
    case types.AUTH_USER:
      return {...state, auth: true};
    case types.LOGOUT_USER:
      return {...state, auth: false, username: null};
    case types.AUTH_ERROR:
      return {username: null, error: action.payload};
    case types.CLEAR_AUTH_ERROR:
      return {...state, error: null};
    default:
      return state;
  }
}

