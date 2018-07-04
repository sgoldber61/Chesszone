import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => (
  <div>
    <div>Home page</div>
    <div>Click <Link to="/hello">here</Link> to receive a message from the server</div>
    <div>Click <Link to="/protected">here</Link> to receive a login-protected message from the server</div>
  </div>
);

export default Home;

