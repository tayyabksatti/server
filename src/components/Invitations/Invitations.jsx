import React from 'react'
import './Invitations.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'


const Invitations = () => {


    const { user } = useSelector((state) => state.authReducer.authData);

    let [invitations, setInvitations] = useState([]);
    useEffect(() => {
        setInvitations(user.invitations);
    }, []);



    return (
        <div className='Invitations'>
            <h3>Invitations</h3>
            {invitations.map((invitation) => {
                return (
                    <div className='Invitation'>
                        <span>{invitation.Eventtype}</span>
                        <span>{invitation.Eventname}</span>
                        <span>{invitation.Eventdate}</span>
                        <span>{invitation.invitedby}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Invitations