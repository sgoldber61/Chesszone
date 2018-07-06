import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class FindGames extends Component {
  componentDidMount() {
    if (!this.props.username)
      this.props.fetchUser();
    else
      this.props.findPendingGames(this.props.username, this.props.history);
  }
  
  componentDidUpdate() {
    this.props.findPendingGames(this.props.username, this.props.history);
  }
  
  joinGame(socketId) {
    this.props.joinPendingGame(socketId, this.props.username, this.props.history);
  }
  
  renderPendingGames() {
    const socketIds = Object.keys(this.props.pendingUsers);
    const data = socketIds.map(socketId => ({socketId, username: this.props.pendingUsers[socketId]}));
    
    return data.map(element => {
      return (
        <li className="list-group-item" key={element.socketId}>
          <button className="btn btn-primary" onClick={() => this.joinGame(element.socketId)}>{element.username}</button>
        </li>
      );
    });
  }
  
  render() {
    return (
      <div>
        <ul className="list-group">
          {this.renderPendingGames()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {username: state.auth.username, pendingUsers: state.game.pendingUsers};
}

export default connect(mapStateToProps, actions)(FindGames);

