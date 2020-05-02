import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom'
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
            <header>
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/portfolio">Portfolio</Link>
            </header>
            <div class="right">
              <Route exact path="/" component={Home} />
            </div>
          </div>
      </HashRouter>
    );
  }
}
