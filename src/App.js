import React from 'react';
import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div className="grey-background">
        <img src={logo} lat="logo"/>
        <h2>Let's develop management system!</h2>
      </div>      
    );  
  }
}

export default App;
