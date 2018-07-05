import * as types from '../actions/types.js';

const initState = {
  gamePending: false,
  gameActive: false,
  pendingUsers: {},
  socket: null,
  oppId: null,
  color: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case types.INIT_PENDING:
      return {...state, gamePending: true, socket: action.payload};
    case types.FIND_PENDING:
      return {...state, pendingUsers: action.payload};
    case types.JOIN_PENDING_AND_BEGIN:
      return {...state, gameActive: true, socket: action.payload.socket, color: 'black', oppId: action.payload.oppId};
    case types.BEGIN_GAME:
      return {...state, gameActive: true, gamePending: false, color: 'white', oppId: action.payload};
    default:
      return state;
  }
}

