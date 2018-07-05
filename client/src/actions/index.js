import axios from 'axios';
import * as types from './types.js';
import io from 'socket.io-client';

// auth actions

export function fetchUser() {
  return function(dispatch) {
    axios.get('/auth/fetchuser', {
      headers: {jwt: sessionStorage.getItem('jwt') || ''}
    }).then(response => {
      dispatch({type: types.FETCH_USER, payload: response.data.username});
    }).catch(error => {
      dispatch(authError(error));
    });
  };
}

export function signinUser({username, password}, history) {
  // redux-thunk: return a function of dispatch from our action creator
  return function(dispatch) {
    axios.post('/auth/signin', {username, password})
      .then(response => {
        dispatch({type: types.AUTH_USER});
        
        // save the jwt
        sessionStorage.setItem('jwt', response.data.jwt);
        
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
        dispatch({type: types.AUTH_USER});
        
        // save the jwt
        sessionStorage.setItem('jwt', response.data.jwt);
        
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
  sessionStorage.removeItem('jwt');
  
  return {
    type: types.LOGOUT_USER
  };
};

export function clearError() {
  return {type: types.CLEAR_AUTH_ERROR};
};


// game actions

export function initPendingGame(username, history) {
  return function(dispatch) {
    const socket = io();
    
    socket.on('connect', () => {
      socket.emit('start room', {username});
      
      // redirect to the chess room!!!
      
      dispatch({type: types.INIT_PENDING});
    });
  };
};


