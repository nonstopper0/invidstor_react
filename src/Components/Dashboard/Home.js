import React from 'react'
import './Home.scss'

export default class Dashboard extends React.Component {
    constructor() {
        super() 
        this.state = {
            
        }
    }
    componentDidMount() {
        this.getUserData()
    }
    getUserData = async (e) => {
        await fetch(`${process.env.REACT_APP_NODE_URL}/user/info/data?sessionID=${this.props.token}`)
            .then(response => {
                console.log(response)
                return response.json()
            }) 
            .then(json => console.log(json, 'data'))
    }
    render() {
        return (
            <React.Fragment>
                <div className="dashboard-home-container">
                    <h3> Welcome back, </h3>
                </div>
            </React.Fragment>
        )
    }
}