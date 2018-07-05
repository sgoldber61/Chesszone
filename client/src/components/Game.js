import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Game extends Component {
  componentDidMount() {
    // set up sockets...
    const socket = this.props.socket;
    
    // initialize the board state
    this.props.initBoard(this.props.color);
  }
  
  render() {
    if (!this.props.initialized) return <div></div>;
    
    
  }
}


function mapStateToProps(state) {
  return {initialized: state.board.initialized, color: state.game.color, socket: state.game.socket};
}

export default connect(mapStateToProps, actions)(PendingGame);


