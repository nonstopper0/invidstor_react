import React, {useState} from 'react'
import Invest from './Components/Dashboard/Invest.js'
import MyProfile from './Components/Dashboard/MyProfile.js'
import Home from './Components/Dashboard/Home.js'
import { HashRouter, Route, NavLink, Redirect, Switch } from 'react-router-dom'
import { IoIosSettings, IoIosHome, IoIosCash, IoIosLogOut, IoIosArrowBack } from 'react-icons/io'

export default function Dashboard(props) {
    console.log(props);
    return (
        <div className="dashboard-container">
              <div className="dashboard-left">
                  <div className="dashboard-text">
                    <h1>InVIDstor</h1>
                    <p>Investing in content</p>
                  </div>
                  <header>
                    <NavLink exact to="/dashboard/home" activeClassName="dashboard-header-active"><IoIosHome className="dashboard-icons" />Dashboard</NavLink>
                    <NavLink exact to="/dashboard/invest" activeClassName="dashboard-header-active"><IoIosCash className="dashboard-icons" />Invest</NavLink>
                    <NavLink exact to="/dashboard/profile" activeClassName="dashboard-header-active"><IoIosSettings className="dashboard-icons" />My Profile</NavLink>
                    <a onClick={props.logout}><IoIosLogOut className="dashboard-icons" />Logout</a>
                  </header>
                  <footer>
                    <NavLink exact to="/"><IoIosArrowBack className="dashboard-back-button"/>Home Page</NavLink>
                  </footer>
              </div>

              <div className="dashboard-right">
                <div className="dashboard-right-container">
                    <Route exact path="/dashboard/home" component={() => <Home token={props.token} /> } />
                    <Route exact path="/dashboard/invest" component={Invest} />
                    <Route exact path="/dashboard/profile" component={() => <MyProfile token={props.token}/>} />
                </div>
              </div>
        </div> 
    )
}

