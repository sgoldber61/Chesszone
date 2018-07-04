import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      // show a link to sign out
      return [
        <li className="nav-item" key={'creategame'}>
          <Link className="nav-link" to="/creategame">Create Game</Link>
        </li>,
        <li className="nav-item" key={'searchgames'}>
          <Link className="nav-link" to="/searchgames">Search Games</Link>
        </li>,
        <li className="nav-item" key={'signout'}>
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>
      ];
    }
    else {
      // show a link to sign in or sign up
      return [
        <li className="nav-item" key={'signin'}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={'signup'}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }
  
  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Chess App</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.auth
  };
}

export default connect(mapStateToProps)(Header);

