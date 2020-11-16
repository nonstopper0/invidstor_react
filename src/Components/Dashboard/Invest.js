import React from 'react'
import MakeBet from './MakeBet.js'
import Modal from '../Modal.js'
import {getKey, storeKey, removeKey} from '../../Key.js'

import './Invest.scss'

import { IoMdPlay } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaRegQuestionCircle } from 'react-icons/fa'

export default class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            url: '',
            loading: false,
            message: 'Video URL',
            makeBetScreen: false,
            modal: false,
        }
    }
    openModal = (e) => {
        console.log("pushed")
        this.setState({
            modal: !this.state.modal
        })
    }
    urlParser = (url) => {
        try {
            let newURL = ''
            const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            newURL = url.match(regex)[7]
            return newURL.toString()
        } catch(err) {
            this.setState({
                url: '',
                message: 'This URL is not valid, please try again'
            })
        }
    }
    getVideoData = async(url) => {
        // fetch data from express app using video url supplied from input box
        this.setState({
            loading: true,
            message: ''
        })
        await fetch(`${process.env.REACT_APP_NODE_URL}/youtube/initial`, {
            method: 'POST',
            body: JSON.stringify({
                videoId: url,
                authId: localStorage.getItem('authtoken')
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(json => {
              // did my request succeed or fail?
              if (json.status === false) {
                  this.setState({
                      message: json.message,
                      loading: false,
                      url: ''
                  })
              } else {
                  let currentDate = Date.now();
                  
                  // store the bet data into browser local store
                  storeKey("data", {currentDate, json});

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
        let parsedUrl = await this.urlParser(this.state.url)
        if (!parsedUrl || parsedUrl.length != 11) {
            this.setState({
                url: '',
                message: 'Please enter a valid URL'
            })
            return
        }
        this.getVideoData(parsedUrl)
    }

    componentDidMount() {
        // using the browsers local storage. I load in the bet that was inside the browser storage if the user accidentally logs out or changes tabs. I delete the data if it is over a minute old to try and prevent "beating the system"
        let json = getKey('data')
        if(json) {
            let currentDate = Date.now();
            console.log((currentDate - json.currentDate) / 1000 + " seconds from data creation")
            if (currentDate - json.currentDate < 60000) {
                this.setState({
                    data: json.json,
                    makeBetScreen: true
                })             
            } else {
                removeKey('data')
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="dashboard-invest-container">
                    
                    { !this.state.makeBetScreen ? 

                        <div> 
                            <button onClick={this.openModal} id="dashboard-invest-help-button"><FaRegQuestionCircle id="dashboard-invest-help-icon" /></button>

                            { !this.state.loading ?

                            <div className="dashboard-invest-input-container">
                                { this.state.modal ? <Modal close={this.openModal} heading={'Investment Page'} text={'This is a test modal'}/> : null}
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

                            <div className="dashboard-invest-input-container">
                                <AiOutlineLoading3Quarters id="dashboard-invest-spinner" />
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