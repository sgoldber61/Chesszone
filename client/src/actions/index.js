import axios from 'axios';
import * as types from './types.js';

export function signinUser({username, password}, history) {
  // redux-thunk: return a function of dispatch from our action creator
  return function(dispatch) {
    axios.post('/auth/signin', {username, password})
      .then(response => {
        dispatch({type: types.AUTH_USER, payload: username});
        
        // redirect to the home route
        history.push('/');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  };
};

export function signupUser({username, password}, history) {
  // redux-thunk: return a function of dispatch from our action creator
  return function(dispatch) {
    axios.post('/auth/signup', {username, password})
      .then(response => {
        dispatch({type: types.AUTH_USER, payload: username});
        
        // redirect to the home route
        history.push('/');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  };
};

export function authError(error) {
  return {type: types.AUTH_ERROR, payload: error.message};
};

export function signoutUser() {
  // redux-thunk: return a function of dispatch from our action creator
  return function(dispatch) {
    axios.post('/auth/signout')
      .then(response => {
        dispatch({type: types.LOGOUT_USER});
        
      })
      .catch(error => {
        dispatch(authError(error));
      });
  };
};

export function clearError() {
  return {type: types.CLEAR_AUTH_ERROR};
};


