
import React from 'react'
import './Home.css'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import Rellax from 'rellax'

import DeskMan from "./SVG/Asset 2.svg"
import LightBulbs from './SVG/Asset 1.svg'
import InvestPlant from './SVG/invest.svg'
import row3Addon from './SVG/Asset 3.svg'

class LandingHome extends React.Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }
    componentDidMount() {
        this.rellax = new Rellax('.rellax')
    }
    logout = (e) => {
        e.preventDefault()
        this.props.logout()
    }
    render() {
        const {
            token,
        } = this.props
        return (
            <React.Fragment>
                <div>

                    {/* desktop header */}
                    <div className="landing-header-desktop">
                        <h1 id="landing-header-invidstor">InVIDstor</h1>

                        { !token ? 

                        <div className="landing-header-navigation-fullscreen">
                            <NavLink exact to="/home" className="landing-header-button" activeClassName="landing-header-button-active">Home</NavLink>
                            <NavLink exact to="/home/contact" className="landing-header-button" activeClassName="landing-header-button-active">Contact</NavLink>
                            <NavLink exact to="/login" className="landing-header-button" activeClassName="landing-header-button-active">Login / Register</NavLink>
                        </div>

                        :

                        <div className="landing-header-navigation-fullscreen">
                            <NavLink exact to="/home" className="landing-header-button" activeClassName="landing-header-button-active">Home</NavLink>
                            <NavLink exact to="/home/contact" className="landing-header-button" activeClassName="landing-header-button-active">Contact</NavLink>
                            <NavLink exact to="/dashboard" className="landing-header-button" id="dashboard-button" activeClassName="landing-header-button-active">Dashboard</NavLink>
                            <NavLink to="/logout" onClick={this.logout} className="landing-header-button" activeClassName="landing-header-button-active">Logout</NavLink>
                        </div>

                        }
                    </div>

                    {/* mobile header */}
                    <div className="landing-header-mobile">

                        <button onClick={()=>this.setState({menuOpen: !this.state.menuOpen})} id="landing-header-mobile-button"><GiHamburgerMenu id="landing-header-mobile-button-hamburger"/></button>

                        <div className="landing-header-mobile-menu" style={{right: this.state.menuOpen ? '0px' : '-200px'}}>

                            { !token ? 

                                <div className="landing-header-mobile-navigation">
                                    <NavLink exact to="/home" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Home</NavLink>
                                    <NavLink exact to="/home/contact" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Contact</NavLink>
                                    <NavLink exact to="/login" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Login / Register</NavLink>
                                </div>

                                :

                                <div className="landing-header-mobile-navigation">
                                    <NavLink exact to="/home" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Home</NavLink>
                                    <NavLink exact to="/home/contact" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Contact</NavLink>
                                    <NavLink exact to="/dashboard" className="landing-header-mobile-button" id="dashboard-button" activeClassName="landing-header-mobile-button-active">Dashboard</NavLink>
                                    <NavLink to="/logout" onClick={this.logout} className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Logout</NavLink>
                                </div>

                            }
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/home">
                            <div className="landing-page-home-background">
                                <div className="landing-page-home-top-container">
                                    <div className="landing-page-home-top-text-container">
                                        <h2>Invest in content.</h2>
                                        <NavLink to={ token ? "/dashboard/invest" : "/login" }className="landing-page-home-top-text-button">Invest now</NavLink>
                                        <img alt="homepage decoration" id="landing-page-home-lightbulbs" src={LightBulbs}/>
                                    </div>
                                </div>
                                <img alt="homepage decoration" id="landing-page-home-desksvg" src={DeskMan}/>
                                <svg className="landing-page-home-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#00d2ff" fillOpacity="1" d="M0,160L80,138.7C160,117,320,75,480,96C640,117,800,203,960,229.3C1120,256,1280,224,1360,208L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                                <svg className="landing-page-home-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#3a63d5" fillOpacity="1" d="M0,128L80,138.7C160,149,320,171,480,165.3C640,160,800,128,960,122.7C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>             
                            </div>
                            <div className="landing-page-home-3row">
                                <img src={row3Addon} alt="homecurve" id="landing-page-home-curve1"/>
                                <img src={row3Addon} alt="homecurve"
                                 id="landing-page-home-curve2"/>
                                <div className="landing-page-home-3row-div" style={{background: 'linear-gradient(20deg, #00d2ff 0%, #3a47d5 100%)'}}>
                                    <h2>Explore</h2>
                                    <p>Find content that YOU like. We have no limitations on content genres or types. Just find what you think will grow. *See time requirements below*
                                    </p>
                                </div>
                                <div className="landing-page-home-3row-div" style={{background: 'linear-gradient(-30deg, #00d2ff 0%, #3a47d5 100%)'}}>
                                    <h2>Invest</h2>
                                    <p>Use our investment tools to assess the content you like and place your bid. We have developed our own Algorithm to estimate content growth and expansion</p>
                                </div>
                                <div className="landing-page-home-3row-div" style={{background: 'linear-gradient(0deg, #00d2ff 0%, #3a47d5 100%)'}}>
                                    <h2>Profit</h2>
                                    <p>If you placed a good bet, you will be rewarded. Beating our Algorithm is something we love and encourage our customers to do.</p>
                                </div>
                            </div>
                            <div className="landing-page-home2-background">
                                <div className="landing-page-home2-body">
                                    <h1>How to Invest</h1>
                                    <li>1. Find a video you love</li>
                                    <li>2. Quickly Create an Account or Login</li>
                                    <li>3. Go to our user Dashboard page</li>
                                    <li>4. Copy and paste the video URL</li>
                                    <li>5. Let our Algorithm return a bet-assessment</li>
                                </div>
                                <img id="landing-page-home2-investsvg" src={InvestPlant} />
                            </div>
                        </Route>
                        <Route exact path="/home/contact">
                            <h1>About page</h1>
                            <h3>djawdid</h3>
                        </Route>
                    </Switch>
                    <footer className="landing-page-footer">
                        <div className="landing-page-footer-container">
                            <div className="landing-page-footer-column">
                                <h3>Explore:</h3>
                                { !token ? 

                                <div className="landing-page-footer-nav-div" activeClassName="active-class">
                                    <NavLink exact to="/home" className="landing-footer-button" activeClassName="active-class">Home</NavLink>
                                    <NavLink exact to="/home/contact" className="landing-footer-button" activeClassName="active-class">Contact</NavLink>
                                    <NavLink exact to="/login" className="landing-footer-button" activeClassName="active-class">Login / Register</NavLink>
                                </div>

                                :

                                <div className="landing-page-footer-nav-div">
                                    <NavLink exact to="/home" className="landing-footer-button" activeClassName="active-class">Home</NavLink>
                                    <NavLink exact to="/home/contact" className="landing-footer-button" activeClassName="active-class">Contact</NavLink>
                                    <NavLink exact to="/dashboard" className="landing-footer-button" activeClassName="active-class">Dashboard</NavLink>
                                    <NavLink to="/logout" onClick={this.logout} className="landing-footer-button" activeClassName="active-class">Logout</NavLink>
                                </div>

                                }
                            </div>
                            <div className="landing-page-footer-column">
                                <h3>Contact the owner:</h3>
                                <p>nathanielredmon@gmail.com</p>
                                <p>www.nathanielredmon.com</p>
                            </div>
                        </div>
                        <p>Copyright Nathaniel Redmon 2020</p>
                    </footer>
                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(LandingHome)