import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class PendingGame extends Component {
  componentDidMount() {
    const socket = this.props.socket;
    
    socket.on('agree to game', (data) => {
      this.props.startGame(data.oppId, this.props.history);
    });
  }
  
  render() {
    return <div>Waiting for join...</div>;
  }
}


function mapStateToProps(state) {
  return {socket: state.game.socket};
}

export default connect(mapStateToProps, actions)(PendingGame);


