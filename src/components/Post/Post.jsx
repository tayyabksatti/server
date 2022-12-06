import React from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { likePost, interestPost } from '../../api/PostRequest'
import { useDispatch } from 'react-redux'
import { inviteUser } from "../../actions/userAction";
import { useParams } from 'react-router-dom';

const ImagePost = ({ data }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(data.likes.includes(user._id));

    const [likes, setLikes] = useState(data.likes.length);
    const handlelike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    };


    return (
        <div className="Post">
            <img src={data.image ? "http://localhost:5000/images/" + data.image : ""} alt="" />
            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="" style={{ cursor: "pointer" }} onClick={handlelike} />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>

            <div className="detail">
                <span><b>{data.name}</b></span>
                <span> {data.desc}</span>
            </div>
        </div>
    )
}

const EventPost = ({ data }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(data.likes.includes(user._id));
    const [interested, setInterested] = useState(data.interest.includes(user._id));
    const [likes, setLikes] = useState(data.likes.length);
    const [invited, setInvited] = useState(data.invited.includes(user._id));

    const dispatch = useDispatch();

    const handlelike = () => {
        likePost(data._id, user._id);
        setLiked((prev) => !prev);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    };

    const handleInterest = async () => {

        await interestPost(data._id, user._id, data.poststars);
        interested ? dispatch({ type: "INCREASE_STARS", data: data.poststars }) : dispatch({ type: "DECREASE_STARS", data: data.poststars });
        setInterested((prev) => !prev);
    };

    const handleInvite = () => {
        dispatch(inviteUser(user._id, data._id));
        setInvited((prev) => !prev);
    };

    return (
        <div className="Post">
            <h3>Event</h3>

            <img src={data.image ? "http://localhost:5000/images/" + data.image : ""} alt="" />
            <div className="postReact">
                <img src={liked ? Heart : NotLike} alt="" style={{ cursor: "pointer" }} onClick={handlelike} />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>

            <div className="detail">
                <span><b>{data.name}</b></span>
                <span> {data.desc}</span>
            </div>
            <div className="eventdetails">
                <span><b>{data.eventname}</b></span>
                <br />
                <span> {data.eventype}</span>
                <br />
                <span> {data.eventdate}</span>
                <br />
                <span> {data.eventlocation}</span>
            </div>
            <div>
                <button className='button fc-button' onClick={handleInvite}>{invited ? "Invited" : "Invite"}</button>
            </div>
            <div>
                <button className={interested ? 'button fc-button UnfollowButton' : 'button fc-button'} onClick={handleInterest}> {interested ? "Interested" : "Interest"}</button>
            </div>
        </div>
    )
}

const Post = ({ data }) => {

    return (
        <div>
            {data.datatype === "imagepost" ? <ImagePost data={data} /> : <EventPost data={data} />}
        </div>
    )
}

export default Post