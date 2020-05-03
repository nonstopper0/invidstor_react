import React from 'react';
import { HashRouter, Route, NavLink, Link } from 'react-router-dom'


import Authentication from './Authentication.js'
import LogRegister from './Components/LogRegister.js'
import { storeKey, getKey } from './Key.js'
import Fire from './Fire.js'
import Home from './Components/Home.js'


import './App.css';
import { IoIosSettings } from 'react-icons/io'

require('dotenv').config()

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      userLogged: true,
      token: '',
      isLoading: true
    }
  }
  componentDidMount = async() => {
    const token = await getKey('authtoken')
    console.log(token)
    if (token) {
      fetch(`${process.env.REACT_APP_NODE_URL}/user/verify?token=` + token)
        .then(res => res.json()) 
        .then(json => {
          if (json.status) {
            console.log('token authenticated')
            this.setState({
              token: token,
            })
          } else {
            console.log('authentication failed with', token)
            this.setState({
              userLogged: false,
              token: ''
            })
          }
        })
    } else {
      this.setState({userLogged: false})
    }
  }
  login = (token) => {
    this.setState({
      userLogged: true,
      token: token
    })
    storeKey('authtoken', token)
  }
  logout = async () => {
    if (this.state.token && this.state.userLogged) {
      const response = await fetch(`${process.env.REACT_APP_NODE_URL}/user/logout`, {
        method: 'POST',
        body: JSON.stringify({token: this.state.token}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let parsed = await response.json()
      this.setState({
        userLogged: false,
        token: ''
      })
    }
  }
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        { this.state.userLogged ? 
          <div className="websiteContainer">
            <div className="left">
                <div className="leftText">
                  <h1>InVIDstor</h1>
                  <p>Investing in content</p>
                </div>
                <header>
                  <NavLink exact to="/" activeClassName="active">Dashboard</NavLink>
                  <NavLink exact to="/invest" activeClassName="active">Invest</NavLink>
                  <NavLink exact to="/profile" activeClassName="active">My Profile</NavLink>
                </header>
                <button onClick={this.logout}></button>
            </div>
          </div>
          :
          <LogRegister login={this.login} />
        }
      </HashRouter>
    );
  }
}
