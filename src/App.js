import React from 'react';
import { HashRouter, Link, Route, NavLink } from 'react-router-dom'
import Home from './Components/Home.js'
import './App.css';
require('dotenv')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }
  render() {
    return (
      <HashRouter>
          <div class="websiteContainer">
            <div class="left">
                <header>
                  <NavLink exact to="/" activeClassName="active">Home</NavLink>
                  <NavLink exact to="/invest" activeClassName="active">Invest</NavLink>
                  <NavLink exact to="/contact" activeClassName="active">Contact</NavLink>
                  <NavLink exact to="/help" activeClassName="active">Help</NavLink>
                </header>
            </div>
            <Route exact path="/" component={Home} />
          </div>
      </HashRouter>
    );
  }
}
