import React from 'react';
import { HashRouter, Link, Route, NavLink } from 'react-router-dom'
import Fire from './Fire.js'
import Home from './Components/Home.js'
import './App.css';
require('dotenv')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userLogged: true,
      userLoggedName: 'nathaniel redmon'
    }
  }
  render() {
    return (
      <HashRouter>
          <div class="websiteContainer">
            <div class="left">
                <div class="leftText">
                  <h1>InVIDstor</h1>
                  <p>Investing in content</p>
                </div>
                <header>
                  <NavLink exact to="/" activeClassName="active">Dashboard</NavLink>
                  <NavLink exact to="/invest" activeClassName="active">Invest</NavLink>
                  <NavLink exact to="/profile" activeClassName="active">My Profile</NavLink>
                </header>
            </div>
            <Route exact path="/" component={Home} />
          </div>
      </HashRouter>
    );
  }
}
