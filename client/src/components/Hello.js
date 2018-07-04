import React, { Component } from 'react';
import axios from 'axios';

class Hello extends Component {
  constructor(props) {
    super(props);
    
    this.state = {message: '', error: null};
  }
  
  componentDidMount() {
    axios.get('/api/hello')
      .then(response => {
        console.log(response);
        this.setState({message: response.data.message});
      })
      .catch(error => {
        this.setState({error: error.message})
      });
  }
  
  renderError() {
    if (!this.state.error) return null;
    return <div>{this.state.error.message}</div>;
  }
  
  render() {
    return (
      <div>
        <div>{this.state.message || 'loading...'}</div>
        {this.renderError()}
      </div>
    );
  }
}

export default Hello;

