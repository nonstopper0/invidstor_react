import React from 'react'
import './LogRegister.scss'
import { withRouter } from 'react-router-dom'

class LogRegister extends React.Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            email: '',
            action: 'login' || this.props.action,
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

        if (!this.state.password || !this.state.username) {
            this.setState({ message: "Please enter your information below"})
            return
        }
        
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
        console.log(parsed)
        if (parsed.status === true) {
            this.setState({
                message: ''
            })
            this.props.login(parsed.token)
            this.props.history.push('/dashboard/home')
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
            this.props.history.push('/dashboard')
        } else {
            this.setState({
                message: parsed.message
            })
        }
    }
    render() {
        return (
            <div className="login-page-container">
                <div className="login-form-container">
                    <div style={{margin: 20, fontSize: 20}}className="login-form-maintext">
                        <h1>InVIDstor</h1>
                        <p>Investing in content</p>
                    </div>
                    { this.state.message ? 
                    <h3>{this.state.message}</h3>
                    :
                    null 
                    }
                    <form className="login-form" onSubmit={this.handleSubmit}>
                    { this.state.action === "register" ? 
                        <input 
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                        />
                        : null }
                        <input 
                            maxLength="20" 
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            name="username"
                        />
                        <input 
                            maxLength="20" 
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                        />
                        <button id="login-page-submit" type="submit">{this.state.action === 'register' ? 'REGISTER' : 'LOGIN'}</button>
                        { this.state.action === 'login' ?
                        <button onClick={()=>{this.setState({action: 'register', message: ''})}} type="button" className="login-page-registerbutton">Dont have an account yet? Register here</button>
                        :
                        <button onClick={()=>{this.setState({action: 'login', message: ''})}} type="button" className="login-page-registerbutton">Already have an account? Sign in here</button>
                        }
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(LogRegister);