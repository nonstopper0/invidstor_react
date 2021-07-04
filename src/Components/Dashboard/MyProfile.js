import React, {useState, useEffect} from 'react'
import './MyProfile.css'
import { AiOutlineLoading3Quarters, AiFillEdit } from 'react-icons/ai'
require('dotenv')

export default function MyProfile(props) {
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState({});
    const [newDisplayName, setNewDisplayName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    useEffect(() => {
        getProfile(props.token)
        return () => {
        }
    }, [])

    const getProfile = async (token) => {

        await fetch(`${process.env.REACT_APP_NODE_URL}/user/info?sessionID=${token}`)
            .then(response => response.json())
            .then(json => {
                if (json.status === true) {
                    console.log(json.userInfo)
                    setNewEmail(json.userInfo.email);
                    setNewDisplayName(json.userInfo.display_name);
                    setUserData(json.userInfo);
                } else {
                    console.log(json.message)
                }
            })
            .then(() => {
                setLoading(false);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEditing(false);
        // dont send update request to server if the data is unchanged.
        if (newDisplayName !== userData.display_name || newEmail !== userData.email) {
            updateProfile()
        }
    }

    const handleChange = (e) => {
    }

    const updateProfile = async(e) => {
        await fetch(`${process.env.REACT_APP_NODE_URL}/user/update`, {
            method: 'PUT',
            body: JSON.stringify({
                sessionID: props.token,
                updateInfo: {
                    email: newEmail,
                    display_name: newDisplayName
                }
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(json => {
              if (json.status === true) {
                  getProfile(props.token)
              }
          })
    }

    return (
            <React.Fragment>
                { !loading ? 

                        <div>

                            { !editing ? 
                            // default state
                            <div>
                                <div className="myProfileRow">
                                    <h2>Login: <span className="myProfileSpan">{userData.username}</span></h2>
                                </div>
                                <div className="myProfileRow">
                                    <h2>Display Name: <span className="myProfileSpan">{userData.display_name}</span></h2>
                                </div>
                                <div className="myProfileRow">
                                    <h2>Joined: <span className="myProfileSpan">{(userData.created_on).split("").slice(0, 10)}</span></h2>
                                </div>
                                <div className="myProfileRow">
                                    <h2>Email: <span className="myProfileSpan">{userData.email}</span></h2>
                                </div>
                                <div className="myProfileRow">
                                    <h2>Credits: <span className="myProfileSpan">{userData.credits}</span></h2>
                                </div>
                                <button className="myProfileEditingButton" onClick={()=>setEditing(true)}><AiFillEdit style={{fontSize: 30}} /></button>
                            </div>
                            :
                            // editing button pressed
                            <form onSubmit={handleSubmit}>
                                <div className="myProfileRow">
                                    <h2>Login: <span className="myProfileSpan">{userData.username}</span></h2>
                                </div>
                                <div className="myProfileEditingRow">
                                    <h2>Display Name: </h2>
                                    <input 
                                        maxLength="20" 
                                        name="new_display_name"
                                        className="myProfileEditingRow" 
                                        value={newDisplayName}
                                        placeholder={userData.display_name}
                                        onChange={(e) => setNewDisplayName(e.target.value)}
                                    />
                                </div>
                                <div className="myProfileRow">
                                    <h2>Joined: <span className="myProfileSpan">{(userData.created_on).split("").slice(0, 10)}</span></h2>
                                </div>
                                <div className="myProfileEditingRow">
                                    <h2>Email: </h2>
                                    <input
                                        name="new_email"
                                        className="myProfileEditingRow" 
                                        value={newEmail}
                                        placeholder={userData.email}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                </div>
                                <div className="myProfileRow">
                                    <h2>Credits: <span className="myProfileSpan">{userData.credits}</span></h2>
                                </div>
                                <button className="myProfileEditingButton">Submit</button>
                            </form>

                            }

                        </div>
                :
                    <div className="dashboard-right-home">
                        <AiOutlineLoading3Quarters id="dashboard-invest-spinner" />
                    </div>
                }
            </React.Fragment>
    )
}