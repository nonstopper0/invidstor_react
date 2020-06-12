import React from 'react'
import './Home.css'
import LogRegister from '../LogRegister.js'

export default class LandingHome extends React.Component {
    constructor() {
        super()
        this.state = {
            login: false
        }
    }
    render() {
        return (
            <React.Fragment>
                { !this.state.login ?
                <div>
                    <div className="landing-header">
                        <h1 id="landing-header-invidstor">InVIDstor</h1>
                        <button id="landing-header-button" onClick={()=> this.setState({login:true})}>Log in / Sign up</button>
                    </div>
                </div>
                :
                <LogRegister />
                }
            </React.Fragment>
        )
    }
}