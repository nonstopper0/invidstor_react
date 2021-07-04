import React from 'react';
import { HashRouter, Route, NavLink, Redirect, Switch } from 'react-router-dom'

//components
import { storeKey, getKey, removeKey } from './Key.js'
import Dashboard from './Dashboard.js'
import LandingHome from './Components/Landing/Home.js'
import LogRegister from './Components/LogRegister.js'

//styling
import './App.scss';

require('dotenv').config()

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      token: false,
      credits: '',
      userName: '',
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
              userInfo: '',
              token: token,
              loading: false
            })
          } else {
            console.log('authentication failed')
            this.setState({
              token: false,
              loading: false,
            })
          }
        })
        .catch(err => this.setState({
          token: false,
          loading: false
        }))
    } else {
      console.log('Unable to authenticate.')
      this.setState({
        token: false,
        loading: false,
      })
    }
  }

  // get users credits 
  // runningAuthentication = async() => {
  //   if (this.state.token) {
  //     fetch(`${process.env.REACT_APP_NODE_URL}/user/info/minimal?sessionID=${this.state.token}`)
  //     .then(response => response.json())
  //     .then(json => {
  //       if (json.status === false) {
  //         this.setState({
  //           token: false
  //         })
  //       } else {
  //         console.log(json)
  //       }
  //     })
  //   } else {
  //     console.log('user not signed in')
  //   }
  // }

  // on initial startup of the web application, authenticate the user to avoid making them sign in again.
  componentDidMount = async() => {
    await this.authenticateUser()
  }

  // called from LogRegister.js through props. this sends our token back to app(this component) so we can store it globally.
  login = (token) => {
    this.setState({
      token: token
    })
    storeKey('authtoken', token)
  }

  // Redirect users not signed in to the home page after confirming they arent logged in by waiting for auth.
  InitialRedirect = () => {
    if (!this.state.loading) {
      if (!this.state.token) {
        return (
          <Redirect to="/"/>
        )
      }
    }
  }

  // logout function that destroys the session in the database and sends the user back to the LogRegister component.
  logout = async () => {
    console.log('logging out...')

    if (!this.state.token) { 
      return
    }

    const response = await fetch(`${process.env.REACT_APP_NODE_URL}/user/logout`, {
        method: 'POST',
        body: JSON.stringify({token: this.state.token}),
        headers: {
          'Content-Type': 'application/json'
      }
    })

    let parsed = await response.json()
    if (parsed.status) {
      removeKey('authtoken')
      this.setState({
        token: false
      })
    }
  }


  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={() => <LandingHome logout={this.logout} token={this.state.token} name={this.state.name} history={this.props.history}/>}/>
          <Route exact path="/login" component={() => <LogRegister login={this.login}/>} />
          { this.state.token ?
          <Route path="/dashboard">
            <Dashboard token={this.state.token} logout={this.logout} />
            </Route>
            :
            this.InitialRedirect()
          }
        </Switch>

      </HashRouter>
    );
  }
}
