import React, { Component } from 'react';
import Posts from './Posts';
import UserDetails from './UserDetails';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
// import Button from './Button';




class App extends Component {
  render() {
    return (
      <div className="App">
        <React.StrictMode>
          <UserDetails name='Shreya' surname='Mahajan'></UserDetails>
          <ErrorBoundary><Posts name='Shreya' /></ErrorBoundary>
        </React.StrictMode>
      </div>
    );
  }
}

export default App;
