import React from 'react'
import './MyProfile.css'

export default class MyProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            bio: '',
            last_name: '',
            first_name: '',
            location: '',
            email: ''
        }
    }
    componentDidMount() {
        this.getProfile(this.props.token)
    }
    getProfile = (token) => {
        fetch('')
    }
    handleSubmit = (e) => {
        console.log('submitted')
        e.preventDefault()
        this.updateProfile()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateProfile = (e) => {

    }
    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name="" 
                    />
                </form>
            </React.Fragment>
        )
    }
}