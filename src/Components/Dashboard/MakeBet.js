import React from 'react'
import './MakeBet.scss'
import { FaRegThumbsUp, FaRegThumbsDown, FaRegEye } from 'react-icons/fa'
import { AiOutlinePullRequest } from 'react-icons/ai'

export default class MakeBet extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 0,
            betViews: 0,
            betLikes: 0,
            betDislikes: 0,
            betAmount: 0,
        }
    }

    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    updateValue = (e) => {
        // middle value is 50, at 50 the number should be equal to the average
        const multiplicationValue = parseFloat(`${e.target.value / 50}`)
        const newViews = (multiplicationValue * this.props.data.betAssesment.averageViews).toFixed(0)
        const newLikes = (multiplicationValue * this.props.data.betAssesment.averageLikes).toFixed(0)
        const newDislikes = (multiplicationValue * this.props.data.betAssesment.averageDislikes).toFixed(0)
        console.log(this.state.betViews, this.props.data.videoStatistics)
        // if (this.state.betViews >= parseInt(this.props.data.videoStatistics.viewCount)) {
        //     this.state.betAmount = (this.state.value - 30) * this.state.value
        //     console.log(this.state.betAmount)
        // }


        this.setState({
            value: e.target.value,
            betViews: newViews,
            betLikes: newLikes,
            betDislikes: newDislikes
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        window.alert(this.state.value)
    }

    render() {
        const {
            generalData, 
            betAssesment,
            videoStatistics
        } = this.props.data
        return (
            <React.Fragment>
                <div className="dashboard-bet-container">
                    <div className="dashboard-bet-thumbnail-container">
                        <img alt="video thumbnail" id="dashboard-bet-thumbnail" src={generalData.thumbnails.default.url}/>
                        <span>
                            <h2>{generalData.title}</h2>
                            <p>By: {generalData.channelTitle}</p>
                        </span>
                    </div>
                    <div className="dashboard-bet-bottom-container">
                        <h3>Video Statistics</h3>
                        <div className="dashboard-bet-stats-container">
                            <p><FaRegEye />{this.numberWithCommas(videoStatistics.viewCount)}</p>
                            <p><FaRegThumbsUp />{this.numberWithCommas(videoStatistics.likeCount)}</p>
                            <p><FaRegThumbsDown />{this.numberWithCommas(videoStatistics.dislikeCount)}</p>
                        </div>
                        <h3>Our Bet</h3>
                        <div className="dashboard-bet-stats-container">
                            <p><FaRegEye />{this.numberWithCommas(betAssesment.averageViews)}</p>
                            <p><FaRegThumbsUp />{this.numberWithCommas(betAssesment.averageLikes)}</p>
                            <p><FaRegThumbsDown />{this.numberWithCommas(betAssesment.averageDislikes)}</p>
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