import React from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom'


import LogRegister from './Components/LogRegister.js'
import { storeKey, getKey, removeKey } from './Key.js'
import Home from './Components/Home.js'


import './App.css';
import { IoIosSettings } from 'react-icons/io'

require('dotenv').config()

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      token: '',
    }
  }

  // authenticate the users session and that it is still alive.
  authenticateUser = async() => {
    console.log('Authenticating User...')
    const token = await getKey('authtoken')
    if (token) {
      fetch(`${process.env.REACT_APP_NODE_URL}/user/verify`, {
        method: 'POST',
        body: JSON.stringify({token: token}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json()) 
        .then(json => {
          if (json.status) {
            console.log('User authenticated')
            this.setState({
              token: token,
            })
          } else {
            console.log('authentication failed')
            this.setState({
              token: false
            })
          }
        })
    } else {
      console.log('Unable to authenticate.')
      this.setState({token: false})
    }
  }

  // on initial startup of the web application, authenticate the user to avoid making them sign in again.
  componentDidMount = async() => {
    this.authenticateUser()
  }

  // called from LogRegister.js through props. this sends our token back to app so we can store it globally.
  login = (token) => {
    this.setState({
      token: token
    })
    storeKey('authtoken', token)
  }

  // logout function that destroys the session in the database and sends the user back to the LogRegister component.
  logout = async () => {
    console.log('logging out...')
    if (this.state.token) {
      const response = await fetch(`${process.env.REACT_APP_NODE_URL}/user/logout`, {
        method: 'POST',
        body: JSON.stringify({token: this.state.token}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let parsed = await response.json()
      if (parsed.status) {
        removeKey()
        this.setState({
          token: false
        })
      } else {
        alert(parsed.message)
      }
    }
    console.log(this.state)
  }
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        { this.state.token ? 
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
