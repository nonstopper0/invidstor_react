import React from 'react'
import './MyProfile.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
require('dotenv')

export default class MyProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            editing: true,
            userData: {},
            username: '',
            email: '',
        }
    }
    componentDidMount() {
        this.getProfile(this.props.token)
    }
    getProfile = async (token) => {

        await fetch(`${process.env.REACT_APP_NODE_URL}/user/info?sessionID=${token}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === true) {
                    console.log(json.userInfo)
                    this.setState({
                        userData: json.userInfo,
                        email: json.userInfo.email,
                        username: json.userInfo.username
                    })
                } else {
                    console.log(json.message)
                }
            })

        this.setState({
            loading: false
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({editing: false})
        this.updateProfile()
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    updateProfile = async(e) => {
        await fetch(`${process.env.REACT_APP_NODE_URL}/user/update`, {
            method: 'PUT',
            body: JSON.stringify({
                sessionID: this.props.token,
                updateInfo: {
                    email: this.state.email,
                    username: this.state.username
                }
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(json => {
              if (json.status === true) {
                  this.getProfile(this.props.token)
              }
          })
    }
    render() {
        return (
            <React.Fragment>
                <div className="investDataContainer">
                { !this.state.loading ? 

                        <div className="investDataContainerMyProfileContainer">

                            { !this.state.editing ? 

                            <div>
                                <div className="myProfileRow">
                                    <h2>Username: <span className="myProfileSpan">{this.state.userData.username}</span></h2>
                                </div>
                                <div className="myProfileRow">
                                    <h2>Joined: <span className="myProfileSpan">{(this.state.userData.created_on).split("").slice(0, 10)}</span></h2>
                                </div>
                                <div className="myProfileRow">
                                    <h2>Email: <span className="myProfileSpan">{this.state.userData.email}</span></h2>
                                </div>
                                <div className="myProfileRow">
                                    <h2>Credits: <span className="myProfileSpan">{this.state.userData.credits}</span></h2>
                                </div>
                            </div>

                            :

                            <form onSubmit={this.handleSubmit}>
                                <div className="myProfileEditingRow">
                                    <h2>Username</h2>
                                    <input 
                                        name="username"
                                        className="myProfileEditingRow" 
                                        value={this.state.username}
                                        placeholder={this.state.userData.username}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="myProfileRow">
                                    <h2>Joined: <span className="myProfileSpan">{(this.state.userData.created_on).split("").slice(0, 10)}</span></h2>
                                </div>
                                <div className="myProfileEditingRow">
                                    <h2>Email</h2>
                                    <input 
                                        name="email"
                                        className="myProfileEditingRow" 
                                        value={this.state.email}
                                        placeholder={this.state.userData.email}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="myProfileRow">
                                    <h2>Credits: <span className="myProfileSpan">{this.state.userData.credits}</span></h2>
                                </div>
                                <button>Submit</button>
                            </form>

                            }

                        </div>
                :
                    <div className="investInputContainer">
                        <AiOutlineLoading3Quarters id="inputSpinner" />
                    </div>
                }
                </div>
            </React.Fragment>
        )
    }
}