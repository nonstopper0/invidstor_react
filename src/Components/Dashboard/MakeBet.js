import React from 'react'
import './MakeBet.scss'
import { getKey } from '../../Key.js'
import { FaRegThumbsUp, FaRegThumbsDown, FaRegEye } from 'react-icons/fa'

export default class MakeBet extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 0,

            betViews: 0,
            betLikes: 0,
            betDislikes: 0,
            betAmount: 0,

            multiplier: 4
        }
    }

    componentDidMount = (e) => {
        const { videoStatistics } = this.props.data
        this.setState({
            betViews: videoStatistics.viewCount,
            betLikes: videoStatistics.likeCount,
            betDislikes: videoStatistics.dislikeCount
        })
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    makeBet = (e) => {
        const {
            videoStatistics,
            videoId
        } = this.props.data

        console.log(this.props.data)

        fetch(`${process.env.REACT_APP_NODE_URL}/bet/place`, {
            method: 'POST',
            body: JSON.stringify({
                initial_viewCount: videoStatistics.viewCount,
                initial_dislikeCount: videoStatistics.dislikeCount,
                initial_likeCount: videoStatistics.likeCount,
                userBet_viewCount: this.state.betViews,
                userBet_likeCount: this.state.betLikes,
                userBet_dislikeCount: this.state.betDislikes,
                authToken: getKey('authtoken'),
                videoId: videoId
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(response => response.json())
            .then(json => {
                if (json.status === true) {
                } else {
                    console.log(json.message)
                }
            })
    }

    dateConverter = (date) => {
        let newDate = new Date(date)
        const time = newDate.toLocaleString('en-US', { timeStyle: "long"});
        const day = newDate.toLocaleString('en-US', { dateStyle: "long"})
        return (
            <div className="date">
                <p>Uploaded on: <span>{day}</span>, at <span>{time}</span>.</p>
            </div>
        )
    }

    updateValue = (e) => {
        let multiplier = 
            this.state.multiplier === 1 ? 10 : 
            this.state.multiplier === 2 ? 20 :
            this.state.multiplier === 3 ? 30 : 
            this.state.multiplier === 4 ? 40 : null
        ;
    
        console.log(multiplier)
        // convert slider value to a number from 1-4~ to use to multiply the already existing view values.
        const multiplicationValue = parseFloat(`${(e.target.value / multiplier) + 1}`)
        const newViews = (multiplicationValue * this.props.data.videoStatistics.viewCount).toFixed(0)
        const newLikes = (multiplicationValue * this.props.data.videoStatistics.likeCount).toFixed(0)
        const newDislikes = (multiplicationValue * this.props.data.videoStatistics.dislikeCount).toFixed(0)

        this.setState({
            // convert multiplication value back to 0-100 and set it as slider value.
            value: ((multiplicationValue - 1) * multiplier).toFixed(0),
            betViews: newViews,
            betLikes: newLikes,
            betDislikes: newDislikes
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.makeBet()
    }

    render() {
        const {
            generalData, 
            videoStatistics
        } = this.props.data
        return (
            <React.Fragment>
                <div className="dashboard-bet-container">
                    <div className="dashboard-bet-thumbnail-container">
                        <a target="_blank" href={`https://www.youtube.com/watch?v=${this.props.data.videoId}`}>
                            <img alt="video thumbnail" id="dashboard-bet-thumbnail" src={generalData.thumbnails.default.url}/>
                        </a>
                        <div className="title">
                            <h2>{generalData.title}</h2>
                            <a target="_blank" href={`https://www.youtube.com/channel/${generalData.channelId}`}>{generalData.channelTitle}</a>
                        </div>
                        { this.dateConverter(generalData.publishedAt) }
                    </div>
                    <div className="dashboard-bet-bottom-container">
                        <h3>Video Statistics</h3>
                        <div className="dashboard-bet-stats-container">
                            <p><FaRegEye />{this.numberWithCommas(videoStatistics.viewCount)}</p>
                            <p><FaRegThumbsUp />{this.numberWithCommas(videoStatistics.likeCount)}</p>
                            <p><FaRegThumbsDown />{this.numberWithCommas(videoStatistics.dislikeCount)}</p>
                        </div>
                        <h3>User Bet</h3>
                        <div className="dashboard-bet-stats-container">
                            <p><FaRegEye />{this.numberWithCommas(this.state.betViews)}</p>
                            <p><FaRegThumbsUp />{this.numberWithCommas(this.state.betLikes)}</p>
                            <p><FaRegThumbsDown />{this.numberWithCommas(this.state.betDislikes)}</p>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="dashboard-bet-slider-container">
                                <input type="range" min="0" max="100" value={this.state.value} onChange={this.updateValue} step="1" className="dashboard-bet-slider-button"/>
                            </div>
                            <button type="submit" className="dasboard-bet-submit-button"><h3>BET</h3></button>
                        </form>
                    </div>
                    </div>
            </React.Fragment>
        )
    }
}