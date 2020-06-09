import React from 'react'
import './MyProfile.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
require('dotenv')

export default class MyProfile extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: true,
            userData: {},
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
                    this.setState({userData: json.userInfo})
                } else {
                    console.log(json.message)
                }
            })

        this.setState({
            loading: false
        })
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
                <div className="investDataContainer">
                { !this.state.loading ? 
                        <div className="investDataContainerMyProfileContainer">
                            <div className="myProfileRow">
                                <h2>Username: <span className="myProfileSpan">{this.state.userData.username}</span></h2>
                            </div>
                            <div className="myProfileRow">
                                <h2>Bio: <span className="myProfileSpan">{this.state.userData.bio}</span></h2>
                            </div>
                            <div className="myProfileRow">
                                <h2>Email: <span className="myProfileSpan">{this.state.userData.email}</span></h2>
                            </div>
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