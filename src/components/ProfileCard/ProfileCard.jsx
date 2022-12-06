import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import "./ProfileCard.css";

const ProfileCard = ({ location }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    let [stars, setStars] = useState(user.stars);
    let [rank, setRank] = useState(user.rank);

    useEffect(() => {
        setStars(user.stars);

        if (stars >= 100000) {
            setRank("Eternal Sage");
        } else if (stars >= 70000) {
            setRank("Platinum Veteran");
        } else if (stars >= 65000) {
            setRank("Sapphire Veteran");
        } else if (stars >= 60000) {
            setRank("Diamond Veteran");
        } else if (stars >= 50000) {
            setRank("Golden Veteran");
        } else if (stars >= 40000) {
            setRank("Ruby Veteran");
        } else if (stars >= 25000) {
            setRank("Silver Veteran");
        } else {
            setRank("Newbie");
        }

    }, [])


    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={user.coverPicture ? "http://localhost:5000/images/" + user.coverPicture : "http://localhost:5000/images/" + "defaultcover.jpg"} alt="" />
                <img src={user.profilePicture ? "http://localhost:5000/images/" + user.profilePicture : "http://localhost:5000/images/" + "defaultprofile.png"} alt="" />
            </div>

            <div className="ProfileName">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.profession ? user.profession : "write your profession"}</span>
                <span>Rank: {rank}</span>
                <span>Stars: {stars}</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{user.following.length}</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{user.followers.length}</span>
                        <span>Followers</span>
                    </div>
                    {location === 'profilePage' && (
                        <>
                            <div className="vl">

                            </div>
                            <div className='follow'>
                                <span>{posts.filter((post) => post.userId === user._id).length}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>
                <hr />
            </div>
            {location === 'profilePage' ? ("") : <span>
                <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
                    My Profile</Link>
            </span>}

        </div>
    )
}

export default ProfileCard;