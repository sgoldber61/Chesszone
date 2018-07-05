import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class CreateGame extends Component {
  constructor(props) {
    super(props);
    
    this.initGame = this.initGame.bind(this);
  }
  
  componentDidMount() {
    if (!this.props.username)
      this.props.fetchUser();
  }
  
  initGame() {
    this.props.initPendingGame(this.props.username, this.props.history);
  }
  
  render() {
    if (this.props.username) return <div>Create game <button className="btn btn-primary" onClick={this.initGame}>here</button></div>;
    else return <div>Fetching user...</div>;
  }
}

function mapStateToProps(state) {
  return {username: state.auth.username};
}

export default connect(mapStateToProps, actions)(CreateGame);

