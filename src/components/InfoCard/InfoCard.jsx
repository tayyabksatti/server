import React, { useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal.jsx/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequest.js";
import { logOut } from "../../actions/AuthAction";
import { useEffect } from "react";
import { clearPosts } from "../../actions/postAction";

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const { user } = useSelector((state) => state.authReducer.authData);



    useEffect(() => {
        const fetchUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user);
            } else {
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
                console.log("profileUser", profileUser);
            }
        }
        fetchUser();
    }, [user]);
    const handleLogOut = () => {
        dispatch(logOut());
        dispatch(clearPosts());
    };
    return (
        <div className="InfoCard">
            <div className="infoHead">
                
                <h4>Profile Info</h4>
                {profileUserId === user._id ? (<div>
                    <UilPen
                        width="2rem"
                        height="1.2rem"
                        onClick={() => setModalOpened(true)}
                    />
                    <ProfileModal modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                        data={user} />
                </div>) : ("")}
            </div>

            <div className="info">
                <span>
                    <b>Lives In </b>
                </span>
                <span>{profileUser.livesin}</span>
            </div>

            <div className="info">
                <span>
                    <b>Profession </b>
                </span>
                <span>{profileUser.profession}</span>
            </div>

            <div className="info">
                <span>
                    <b>Hobbies </b>
                </span>
                <span>{profileUser.Hobbies}</span>
            </div>

            <button className="button logout-button" onClick={handleLogOut}>LogOut</button>
        </div>
    );
};

export default InfoCard;