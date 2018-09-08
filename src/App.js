import React, { Component } from 'react';
import Layout from './app/Layout';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Layout />
      </Router>
    );
  }
}

export default App;
