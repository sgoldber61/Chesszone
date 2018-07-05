import * as types from '../actions/types.js';

const initState = {oppFen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'};

export default function(state = initState, action) {
  switch (action.type) {
    case types.RECEIVE_MOVE:
      return {...state, oppFen: action.payload};
    default:
      return state;
  }
}

