import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

import {Chess} from 'chess.js';
import * as ChessBoard from 'chessboardjs';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {initialized: false};
  }
  
  componentDidMount() {
    // set up sockets
    console.log(this.props.oppId);
    // data: fen (for opponent's fen)
    this.props.socket.on('receive fen', data => {
      this.props.receiveMove(data.fen);
    });
    
    // set up chess platform
    this.chess = new Chess(this.props.oppFen);
    
    this.board = ChessBoard({
      draggable: this.props.canMove,
      position: this.props.oppFen,
      onDrop: this.onDrop,
      orientation: this.props.color
    });
  }
  
  componentDidUpdate() {
    
  }
  
  onDrop(source, target, piece, newPos, oldPos, orientation) {
    // if target is on board, make move
    
    // was the move valid?
    
    // set self to have already moved
    
    // broadcase move to opponent
  }
  
  render() {
    if (!this.state.initialized) return <div></div>;
    
    
  }
}


function mapStateToProps(state) {
  return {color: state.game.color, socket: state.game.socket,
    oppId: state.game.oppId, oppFen: state.board.oppFen
  };
}

export default connect(mapStateToProps, actions)(PendingGame);

