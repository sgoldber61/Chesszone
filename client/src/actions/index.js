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
      
      dispatch({type: types.INIT_PENDING, payload: socket});
      
      // redirect to the pending room. define socket behavior within the pendinggame
      history.push('/pendinggame');
    });
    
  };
};

export function findPendingGames(username, history) {
  return function(dispatch) {
    axios.get('/api/rooms', {
      headers: {jwt: sessionStorage.getItem('jwt') || ''}
    }).then(response => {
      dispatch({type: types.FIND_PENDING, payload: response.data.pendingUsers});
    }).catch(error => {
      dispatch(authError(error));
    });
  };
}

export function joinPendingGame(pendingId, joiningUsername, history) {
  return function(dispatch) {
    const socket = io();
    
    socket.on('connect', () => {
      socket.emit('join room', {pendingId, joiningUsername});
      
      dispatch({type: types.JOIN_PENDING_AND_BEGIN, payload: {socket, oppId: pendingId});
      
      // redirect to the game room
      history.push('/game');
    });
  };
}

export function startGame(oppId, history) {
  return function(dispatch) {
    dispatch({type: types.BEGIN_GAME, payload: oppId});
    
    // redirect to the game room
    history.push('/game');
  }
}


