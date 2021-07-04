import React from 'react'
import './Home.scss'

export default class Dashboard extends React.Component {
    constructor() {
        super() 
        this.state = {
            loading: true,
            data: ''
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
            .then(json => this.setState({
                loading: false,
                data: json
            }))
    }
    
    render() {
        return (
            <React.Fragment>
                <div className="dashboard-home">
                    <h3> Welcome back, </h3>
                        { !this.state.loading ? 
                        <h1>Loaded</h1>
                        :
                        null 
                        }
                </div>
            </React.Fragment>
        )
    }
}