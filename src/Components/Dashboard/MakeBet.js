import React from 'react'
import './MakeBet.scss'
import { FaRegThumbsUp, FaRegThumbsDown, FaRegEye } from 'react-icons/fa'
import { AiOutlinePullRequest } from 'react-icons/ai'

export default class MakeBet extends React.Component {
    constructor() {
        super()
        this.state = {
            value: 50,
        }
    }
    componentDidMount() {
        
    }
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    updateValue = (e) => {
        this.setState({value: e.target.value})
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
                    <div className="dashboard-bet-top-container">
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
                            <h3>Channel Average</h3>
                            <div className="dashboard-bet-stats-container">
                                <p><FaRegEye />{this.numberWithCommas(betAssesment.averageViews)}</p>
                                <p><FaRegThumbsUp />{this.numberWithCommas(betAssesment.averageLikes)}</p>
                                <p><FaRegThumbsDown />{this.numberWithCommas(betAssesment.averageDislikes)}</p>
                            </div>
                            <div className="dashboard-bet-slider-container">
                                <input type="range" min="0" max="100" value={this.state.value} onChange={this.updateValue} step="1" className="dashboard-bet-slider-button"/>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}