import React from 'react'
import './Modal.scss'


export default function Modal(props) {
    return (
        <React.Fragment>
            <div className="modal-container">
                <button onClick={props.close}>X</button>
                <h2>{props.heading}</h2>
                <p>{props.text}</p>
            </div>
        </React.Fragment>
    )
}