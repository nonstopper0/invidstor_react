import React from 'react'
import './MakeBet.css'
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
                <div className="makeBetContainer">
                    <div className="makeBetTopContainer">
                        <img alt="video thumbnail" className="makeBetThumbnail" src={generalData.thumbnails.default.url}/>
                        <h2>{generalData.title}</h2>
                        <p>By: {generalData.channelTitle}</p>
                        <div className="makeBetStatsContainer">
                            <p><FaRegEye />{this.numberWithCommas(videoStatistics.viewCount)}</p>
                            <p><FaRegThumbsUp />{this.numberWithCommas(videoStatistics.likeCount)}</p>
                            <p><FaRegThumbsDown />{this.numberWithCommas(videoStatistics.dislikeCount)}</p>
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