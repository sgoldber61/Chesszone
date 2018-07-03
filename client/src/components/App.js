import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header.js';
import Home from './Home.js';
import Hello from './Hello.js';
import Protected  from './Protected.js';

import RequireAuth from './RequireAuth.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/hello" component={Hello} />
            <Router path="/protected" component={RequireAuth(Protected)} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
