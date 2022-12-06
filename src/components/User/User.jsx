import React from 'react'
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/userAction';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const User = ({ person }) => {


    const { user } = useSelector((state) => state.authReducer.authData);

    const [following, setFollowing] = useState(person.followers.includes(user._id) ? true : false);

    const dispatch = useDispatch();

    const handleFollow = () => {

        following ?
            dispatch(unfollowUser(person._id, user)) :
            dispatch(followUser(person._id, user));

        setFollowing((prev) => !prev);
    };


    return (
        <div className="follower">
            <div>
                <img src={person.profilePicture ? "http://localhost:5000/images/" + person.profilePicture : "http://localhost:5000/images/" + "defaultprofile.png"} alt="" className='followerImage' />
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>{person.username}</span>
                </div>
            </div>
            <button className={following ? 'button fc-button UnfollowButton' : 'button fc-button'} onClick={handleFollow}>
                {following ? "Unfollow" : "Follow"}
            </button>
        </div >
    )
}

export default User