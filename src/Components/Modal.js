import React from 'react'
import './Modal.scss'


export default function Modal(props) {
    return (
        <React.Fragment>
            <div className="modal-blur"></div>
            <div className="modal-container">
                <h2>{props.heading}</h2>
                <p>{props.text}</p>
            </div>
        </React.Fragment>
    )
}