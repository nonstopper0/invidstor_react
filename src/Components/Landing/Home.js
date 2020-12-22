
import React from 'react'
import './Home.scss'
import { withRouter, NavLink, Switch, Route } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'

import DeskMan from "./SVG/Asset 2.svg"
import LightBulbs from './SVG/Asset 1.svg'
import Invest from './SVG/icons/invest.svg'
import Profit from './SVG/icons/profit.svg'
import Search from './SVG/icons/search.svg'

class LandingHome extends React.Component {
    constructor() {
        super()
        this.state = {
            menuOpen: false
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.onWindowScroll)
    }
    onWindowScroll = (e) => {
        //3divs onload animation
        if (this.props.location.pathname === '/') {
            const threeRowDiv = document.getElementsByClassName('landing-page-home-3row-div')
            if (threeRowDiv[0].getBoundingClientRect().bottom <= window.innerHeight+150){
                for (let i = 0; i < threeRowDiv.length; i++) {
                    threeRowDiv[i].classList.add('landing-page-home-3row-div-active')
                }
            }
            //body 2 onload animation 
            const body2 = document.getElementsByClassName('landing-page-home2-container')[0]
            if (body2.getBoundingClientRect().bottom <= window.innerHeight+200) {
                body2.classList.add('landing-page-home2-container-active')
            }
            const body3 = document.getElementsByClassName('landing-page-home3-container')[0]
            if (body3.getBoundingClientRect().bottom <= window.innerHeight+100) {
                body3.classList.add('landing-page-home3-container-active')
            }
            const body4 = document.getElementsByClassName('landing-page-home4-container')[0]
            if (body4.getBoundingClientRect().bottom <= window.innerHeight+100) {
                body4.classList.add('landing-page-home4-container-active')
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onWindowScroll)
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
                            <NavLink exact to="/" className="landing-header-button" activeClassName="landing-header-button-active">Home</NavLink>
                            <NavLink exact to="/login" className="landing-header-button" activeClassName="landing-header-button-active">Invest</NavLink>
                            <NavLink exact to="/login" className="landing-header-button" activeClassName="landing-header-button-active">Login / Register</NavLink>
                        </div>

                        :

                        <div className="landing-header-navigation-fullscreen">
                            <NavLink exact to="/" className="landing-header-button" activeClassName="landing-header-button-active">Home</NavLink>
                            <NavLink exact to="/dashboard/home" className="landing-header-button" id="dashboard-button" activeClassName="landing-header-button-active">Dashboard</NavLink>
                            <NavLink to="/logout" onClick={this.logout} className="landing-header-button" activeClassName="landing-header-button-active">Logout</NavLink>
                        </div>

                        }
                    </div>

                    {/* mobile header */}
                    <div className="landing-header-mobile">

                        <button onClick={()=>this.setState({menuOpen: !this.state.menuOpen})} id="landing-header-mobile-button"><GiHamburgerMenu id="landing-header-mobile-button-hamburger"/></button>

                        <div className="landing-header-mobile-menu" style={{top: this.state.menuOpen ? '0px' : '-330px'}}>

                            { !token ? 

                                <div className="landing-header-mobile-navigation">
                                    <NavLink exact to="/home" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Home</NavLink>
                                    <NavLink exact to="/login" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Invest</NavLink>
                                    <NavLink exact to="/login" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Login / Register</NavLink>
                                </div>

                                :

                                <div className="landing-header-mobile-navigation">
                                    <NavLink exact to="/home" className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Home</NavLink>
                                    <NavLink exact to="/dashboard/home" className="landing-header-mobile-button" id="dashboard-button" activeClassName="landing-header-mobile-button-active">Dashboard</NavLink>
                                    <NavLink to="/logout" onClick={this.logout} className="landing-header-mobile-button" activeClassName="landing-header-mobile-button-active">Logout</NavLink>
                                </div>

                            }
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            
                            <div className="landing-page-home-background">
                                <div className="landing-page-home-top-container">
                                    <div className="landing-page-home-top-text-container">
                                        <h2>Invest in content.</h2>
                                        <NavLink to={ token ? "/dashboard/invest" : "/login" }className="landing-page-home-top-text-button">Invest now</NavLink>
                                        <img alt="homepage decoration" id="landing-page-home-lightbulbs" src={LightBulbs}/>
                                    </div>
                                </div>
                                <img alt="homepage decoration" id="landing-page-home-desksvg" src={DeskMan}/>
                                <svg id="curve1" className="landing-page-home-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fillOpacity="1" d="M0,128L80,138.7C160,149,320,171,480,165.3C640,160,800,128,960,122.7C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>             
                                <svg className="landing-page-home-curve" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fillOpacity="1" d="M0,128L80,138.7C160,149,320,171,480,165.3C640,160,800,128,960,122.7C1120,117,1280,139,1360,149.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>             
                            </div>

                            <div className="landing-page-home-3row-container">
                                <div className="landing-page-home-3row">
                                    <div className="landing-page-home-3row-div">
                                        <div className="landing-page-home-3row-svg-container">
                                            <img alt="search" src={Search} className="landing-page-home-3row-svg"></img>
                                        </div>
                                        <h3>Explore</h3>
                                    </div>
                                    <div className="landing-page-home-3row-div">
                                        <div className="landing-page-home-3row-svg-container">
                                            <img alt="invest" src={Invest} className="landing-page-home-3row-svg"></img>
                                        </div>
                                        <h3>Invest</h3>
                                    </div>
                                    <div className="landing-page-home-3row-div">
                                        <div className="landing-page-home-3row-svg-container">
                                            <img alt="profit" src={Profit} className="landing-page-home-3row-svg"></img>
                                        </div>
                                        <h3>Profit</h3>
                                    </div>
                                </div>
                            </div>

                            <div className="landing-page-home3-container">
                                <div className="landing-page-home3-body">
                                    <h1>What is InVIDstor?</h1>
                                    <p>InVIDstor is a platform for people that enjoy competition and content. There is no money involved with our platform. You can almost consider inVIDstor to be a game because of its non-risk nature. Our platform is a way for people to compete with eachother using their own predictions and knowledge on the growth of content.</p>
                                </div>
                            </div>

                            <div className="landing-page-home4-container">
                                <div className="landing-page-home4-body">
                                    <h1>Why I created InVIDstor? </h1>
                                    <p>InVIDstor is an idea spawned from Tik-Tok. Scrolling through Tik-Tok you will often see users commenting on how they would like to invest on a video with very low views. Users comment this because they understand investing and know that the video in question will grow as they predict. This is a concept I see catching on within the industry. Instead of a just liking a video that you really enjoy, what if you could invest in it?</p>
                                </div>
                            </div>

                            <div className="landing-page-home2-background">
                                <div className="landing-page-home2-container">
                                    <div className="landing-page-home2-body">
                                        <h1>How to Invest</h1>
                                        <li>1. Find a video you love</li>
                                        <li>2. Quickly Create an Account or Login</li>
                                        <li>3. Go to our user Dashboard page</li>
                                        <li>4. Copy and paste the video URL in the Investor</li>
                                        <li>5. Let our Algorithm return a bet-assessment</li>
                                    </div>
                                </div>
                            </div>


                        </Route>
                    </Switch>
                    <footer className="landing-page-footer">
                        <div className="landing-page-footer-container">
                            <div className="landing-page-footer-column">
                                <h3>Explore:</h3>
                                { !token ? 

                                <div className="landing-page-footer-nav-div" activeClassName="active-class">
                                    <NavLink exact to="/home" className="landing-footer-button" activeClassName="active-class">Home</NavLink>
                                    <NavLink exact to="/login" className="landing-footer-button" activeClassName="active-class">Login / Register</NavLink>
                                </div>

                                :

                                <div className="landing-page-footer-nav-div">
                                    <NavLink exact to="/home" className="landing-footer-button" activeClassName="active-class">Home</NavLink>
                                    <NavLink exact to="/dashboard/home" className="landing-footer-button" activeClassName="active-class">Dashboard</NavLink>
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