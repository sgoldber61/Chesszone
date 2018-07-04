import axios from 'axios';
import * as types from './types.js';

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


// ---------------------------------------------------------------------

/*
export function fetchUser() {
  return function(dispatch) {
    axios.get('/auth/get_user')
      .then(response => {
        console.log(response.data.username);
        dispatch({type: types.FETCH_USER, payload: response.data.username});
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}
*/

