import React from 'react'
import './Invest.css'
import { IoMdPlay } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            url: false,
            loading: false,
            message: false,
        }
    }
    urlParser = (url) => {
        try {
            let newURL = ''
            // if the url is the normal url string...
            if (url.split("")[8] === 'w') {
                const regex = /(?<=\=).*/;
                newURL = url.match(regex)
            } 
            // else if the url string is from the share button (condensed)
            else {
                const regex = /(?<=be\/).*(?=[?])/;
                newURL = url.match(regex)
            }
    
            // check if URL seems valid
            if (newURL.length > 11) {
                return false
            }
            return newURL.toString()
        } catch(err) {
            console.log(err)
        }
    }
    getVideoData = async(url) => {
        this.setState({
            loading: true
        })
        await fetch(`${process.env.REACT_APP_NODE_URL}/youtube/video`, {
            method: 'POST',
            body: JSON.stringify({videoID: url}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(json => console.log(json))
        this.setState({
            loading: false
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        let parsedUrl = await this.urlParser(this.state.url)
        if (parsedUrl) {
            this.getVideoData(parsedUrl)
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="investDataContainer">
                    { !this.state.loading ? 
                        <div className="investInputContainer">
                            <h2>INVESTOR</h2>
                            <p>Paste the video url below to begin</p>
                            <form onSubmit={this.handleSubmit}>
                                <input 
                                    onChange={this.handleChange}
                                    name="url"
                                    placeholder="Video Url"
                                />
                                <button><IoMdPlay /></button>
                            </form>
                            <h6>Video must be no more than 24 hours old and the poster must have atleast 4 videos</h6>
                            <h6>Example: https://www.youtube.com/watch?v=ycPr5-27vSI</h6>
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