import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

import $ from 'jquery';

// import {Chess} from 'chess.js';
import Chess from 'chess.js';
import * as ChessBoard from 'chessboardjs';

window.$ = $
window.jQuery = $

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {win: false};
    
    this.onDrop = this.onDrop.bind(this);
  }
  
  
  setupChess(canMove) {
    // set up chess platform
    this.chess = new Chess(this.props.oppFen);
    
    console.log(this.props.oppFen);
    
    this.board = ChessBoard('board', {
      draggable: canMove,
      // position: this.props.oppFen,
      position: this.state.fenOverride || this.props.oppFen,
      onDrop: this.onDrop,
      orientation: this.props.color
    });
  }
  
  componentDidMount() {
    // set up sockets
    console.log(this.props.oppId);
    // data: fen (for opponent's fen)
    this.props.socket.on('receive fen', data => {
      console.log('receiving move...');
      this.props.receiveMove(data.fen, data.checkmate);
    });
    
    const canMove = this.props.color === 'white';
    this.setupChess(canMove);
  }
  
  // upon redux update, which occurs upon websocket signal
  componentDidUpdate() {
    this.setupChess(true);
  }
  
  onDrop(source, target, piece, newPos, oldPos, orientation) {
    // was the target off screen?
    if (target === 'offboard') return 'snapback';
    
    // was the move valid? if not (i.e. this.chess.move is null), return 'snapback'
    if (!this.chess.move({from: source, to: target})) return 'snapback';
    
    // set self to have already moved
    // TO DO WE WILL ADD THIS LATER
    // this.setupChess(false);
    
    // broadcast move to opponent
    const checkmate = this.chess.in_checkmate();
    this.props.socket.emit('send fen', {receivingId: this.props.oppId, fen: this.chess.fen(), checkmate});
    // did we win the game?
    if (checkmate) this.setState({win: true, fenOverride: this.chess.fen()});
  }
  
  renderResults() {
    if (this.state.win)
      return <div>{'Checkmate. You have won the game!'}</div>;
    else if (this.props.checkmate)
      return <div>{'Checkmate. You have lost the game...'}</div>;
    else
      return null;
  }
  
  render() {
    return (<div>
      <div id="board" style={{width: '400px'}}></div>
      {this.renderResults()}
    </div>);
  }
}


function mapStateToProps(state) {
  return {color: state.game.color, socket: state.game.socket,
    oppId: state.game.oppId, oppFen: state.board.oppFen,
    checkmate: state.board.checkmate
  };
}

export default connect(mapStateToProps, actions)(Game);

