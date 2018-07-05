import * as types from '../actions/types.js';

const initState = {initialized: false};

export default function(state = initState, action) {
  switch (action.type) {
    case types.INIT_BOARD:
      return {...state, initialized: true, oppFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', canMove: action.payload};
    case types.MAKE_MOVE:
      return {...state, canMove: false};
    case types.RECEIVE_MOVE:
      return {...state, oppFen: action.payload};
    default:
      return state;
  }
}

