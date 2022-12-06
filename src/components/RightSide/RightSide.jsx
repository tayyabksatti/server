import React, { useState } from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import UpcomingEvents from "../UpcomingEvents/UpcomingEvents";
import Invitations from "../Invitations/Invitations";
import { Link } from 'react-router-dom'
const RightSide = () => {

    return (
        <div className="RightSide">
            <div className="navIcons">
                <Link to='../home'><img src={Home} alt="" />
                </Link>
                <UilSetting />
                <img src={Noti} alt="" />
                <img src={Comment} alt="" />
            </div>

            <UpcomingEvents />

            <Invitations />
        </div>
    );
};

export default RightSide;