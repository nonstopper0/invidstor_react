import React from 'react'
import './Home.css'

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
            .then(response => response.json()) 
            .then(json => console.log(json))
    }
    render() {
        return (
            <React.Fragment>
                <div className="homeDataContainer">
                    <h3> Welcome back, </h3>
                </div>
            </React.Fragment>
        )
    }
}