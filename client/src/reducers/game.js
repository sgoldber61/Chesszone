import * as types from '../actions/types.js';

const initState = {gamePending: false, gameActive: false};

export default function(state = initState, action) {
  switch (action.type) {
    case types.INIT_PENDING:
      return {...state, gamePending: true};
    default:
      return state;
  }
}

