import React from 'react';
import { HashRouter, Link, Route } from 'react-router-dom'
import Home from './Components/Home.js'
import './App.css';
require('dotenv')

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      active: null
    }
  }
  componentDidUpdate() {
    console.log(window.location.href.match('\#\/(.*)')[1])
  }
  render() {
    return (
      <HashRouter>
          <div class="websiteContainer">
            <div class="left">
                <header>
                  <Link onClick={()=> this.setState({active: 'Home'})} to="/">Home</Link>
                  <Link onClick={()=> this.setState({active: 'Contact'})} to="/Contact">Contact</Link>
                  <Link onClick={()=> this.setState({active: 'Shop'})} to="/Shop">Shop</Link>
                  <Link onClick={()=> this.setState({active: 'Portfolio'})}to="/Portfolio">Portfolio</Link>
                </header>
            </div>
            <Route exact path="/" component={Home} />
          </div>
      </HashRouter>
    );
  }
}
