import React from 'react'
import './MakeBet.scss'
import { FaRegThumbsUp, FaRegThumbsDown, FaRegEye } from 'react-icons/fa'

export default class MakeBet extends React.Component {
    constructor() {
        super()
        this.state = {
            
        }
    }
    numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
                        </div>
                    </div>
                    <div class="slideContainer">
                        <input type="range" onChange={value => this.setState({slider: value})} min="1" max="100" value='50' class="slider"/>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}