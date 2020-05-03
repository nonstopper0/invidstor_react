import React from 'react'

export default class LogRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            action: 'login',
            message: '',
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.action === 'login') {
            this.login({
                username: this.state.username.toLowerCase(),
                password: this.state.password,
            })
        } else if (this.state.action === "register") {
            this.register({
                username: this.state.username.toLowerCase(),
                password: this.state.password,
                email: this.state.email.toLowerCase(),
            })
        }
    }
    login = async (info) => {
        const response = await fetch(`${process.env.REACT_APP_NODE_URL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let parsed = await response.json()
        if (parsed.status === true) {
            this.setState({
                message: ''
            })
            this.props.login(parsed.token)
        } else {
            this.setState({
                message: parsed.message
            })
        }
    }
    register = async (info) => {
        const response = await fetch(`${process.env.REACT_APP_NODE_URL}/user/register`, {
            method: 'POST',
            body: JSON.stringify(info),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let parsed = await response.json()
        if (parsed.status === true) {
            this.setState({
                message: ''
            })
            this.props.login(parsed.token)
        } else {
            this.setState({
                message: parsed.message
            })
        }
    }
    render() {
        return (
        <React.Fragment>
            { this.state.message ? 
            <h3>{this.state.message}</h3>
            :
            null 
            }
            <form onSubmit={this.handleSubmit}>
            { this.state.action === "register" ? 
                <input 
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                />
            : null }
                <input 
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    name="username"
                />
                <input 
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                />
                <button>Submit</button>
            </form>
        </React.Fragment>
        )
    }
}