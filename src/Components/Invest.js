import React from 'react'
import MakeBet from './MakeBet.js'
import './Invest.css'
import { IoMdPlay } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            url: '',
            loading: false,
            message: 'Video URL',
            makeBetScreen: false,
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
            if (newURL.length > 11) {
                console.log('this URL is too long: ', newURL)
                throw Error
            }
            // check if URL seems valid
            return newURL.toString()
        } catch(err) {
            this.setState({
                url: '',
                message: 'This URL is not valid, please try again'
            })
        }
    }
    getVideoData = async(url) => {
        this.setState({
            loading: true,
            message: ''
        })
        await fetch(`${process.env.REACT_APP_NODE_URL}/youtube/video`, {
            method: 'POST',
            body: JSON.stringify({videoID: url}),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(json => {
              // did our request succeed or fail?
              if (json.status == false) {
                  this.setState({
                      message: json.message,
                      loading: false,
                      url: ''
                  })
              } else {
                  console.log(json)
                  this.setState({
                      data: json,
                      loading: false,
                      makeBetScreen: true,
                    })
              }
          })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.url.length > 10) {
            let parsedUrl = await this.urlParser(this.state.url)
            if (parsedUrl) {
                this.getVideoData(parsedUrl)
            }
        } else {
            this.setState({
                message: 'Please enter a valid URL'
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="investDataContainer">
                    
                    { !this.state.makeBetScreen ? 

                        <div>

                            { !this.state.loading ?

                            <div className="investInputContainer">
                                <h2>INVESTOR</h2>
                                <p>Paste the video url below to begin</p>
                                <form onSubmit={this.handleSubmit}>
                                    <input 
                                        value={this.state.url}
                                        onChange={this.handleChange}
                                        name="url"
                                        placeholder={this.state.message}
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
                    :

                    <MakeBet data={this.state.data}/>

                    }
                </div>
                
            </React.Fragment>
        )
    }
}