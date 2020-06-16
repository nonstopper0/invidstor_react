import React from 'react'
import './Home.css'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'

class LandingHome extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    logout = (e) => {
        e.preventDefault()
        this.props.logout()
    }
    render() {
        const {
            token,
            name
        } = this.props
        const stars = []

        return (
            <React.Fragment>
                <div>
                    <div className="landing-header">
                        <h1 id="landing-header-invidstor-desktop">InVIDstor</h1>

                            { !token ? 

                            <div className="landing-header-navigation-fullscreen">
                                <NavLink exact to="/home" className="landing-header-button" activeClassName="landing-header-button-active">Home</NavLink>
                                <NavLink exact to="/home/about" className="landing-header-button" activeClassName="landing-header-button-active">About</NavLink>
                                <NavLink exact to="/home/contact" className="landing-header-button" activeClassName="landing-header-button-active">Contact</NavLink>
                                <NavLink exact to="/login" className="landing-header-button" activeClassName="landing-header-button-active">Login / Register</NavLink>
                            </div>

                            :

                            <div className="landing-header-navigation-fullscreen">
                                <NavLink exact to="/home" className="landing-header-button" activeClassName="landing-header-button-active">Home</NavLink>
                                <NavLink exact to="/home/about" className="landing-header-button" activeClassName="landing-header-button-active">About</NavLink>
                                <NavLink exact to="/dashboard" className="landing-header-button" activeClassName="landing-header-button-active">Dashboard</NavLink>
                                <NavLink to="" onClick={this.logout} className="landing-header-button" activeClassName="landing-header-button-active">Logout</NavLink>
                            </div>

                            }
                    </div>
                    <Switch>
                        <Route exact path="/home">
                            <div className="landing-page-home-background">
                                <div className="landing-page-home-top-container">

                                    <div className="landing-page-home-top-container">
                                        <div className="landing-page-home-top-text-container">
                                            <h2>Invest in content.</h2>
                                            { token? 
                                            <NavLink to="/dashboard" className="landing-page-home-top-text-button">Invest now</NavLink>
                                            :
                                            <NavLink to="/login" className="landing-page-home-top-text-button">Invest now</NavLink>
                                            }
                                        </div>
                                    </div>

                                    <div className="landing-page-home-3row">
                                        <div className="landing-page-home-3row-div">
                                            <h2>Invest</h2>
                                        </div>
                                        <div className="landing-page-home-3row-div">
                                            <h2>Profit</h2>
                                        </div>
                                        <div className="landing-page-home-3row-div">
                                            <h2>Support</h2>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </Route>
                        <Route exact path="/home/about">
                            <h1>About page</h1>
                            <h3>djawdid</h3>
                        </Route>
                    </Switch>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(LandingHome)