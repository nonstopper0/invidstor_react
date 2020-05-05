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
    urlParser = (url) => {
        let newURL = ''
        if (url.split("")[8] === 'w') {
            newURL = url.match('/(?<=\=).*')
            console.log(newURL)
        } else {
            console.log('no match', url)
        }
        return newURL
    }
    getVideoData = (url) => {
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        let parsedUrl = await this.urlParser(this.state.url)
        this.getVideoData(parsedUrl)
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
                        <h6>Example: https://www.youtube.com/watch?v=ycPr5-27vSI</h6>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}