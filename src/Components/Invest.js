import React from 'react'
import './Invest.css'
import { IoIosSettings, IoIosHelp, IoMdPlay } from 'react-icons/io'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            url: false,
            loading: true,
        }
    }
    getVideoData = (url) => {
        console.log(url)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        this.getVideoData(this.state.url)
    }
    render() {
        return (
            <React.Fragment>
                <div className="investDataContainer">
                    <div className="investInputContainer">
                        <h2><IoIosSettings className="investSpinner"/>INVESTOR<IoIosSettings className="investSpinner"/></h2>
                        <p>Paste the video url below to begin</p>
                        <form onSubmit={this.handleSubmit}>
                            <input 
                                onChange={this.handleChange}
                                name="url"
                                placeholder="Video Url"
                            />
                            <button><IoMdPlay /></button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}