import React from 'react'
import './Home.css'

export default class LandingHome extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="landing-header">
                        <h1 id="landing-header-invidstor">InVIDstor</h1>
                        <button id="landing-header-button" onClick={()=> this.props.history.push('/login')}>Log in / Sign up</button>
                        <button id="landing-header-button" onClick={()=> this.props.history.push('/dashboard')}>Dashboard</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}