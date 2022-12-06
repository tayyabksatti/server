import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import '../ProfileSide/Profileside.css'

const ProfileLeft = () => {
    return (
        <div className="PostSide">
            <InfoCard />
            <FollowersCard />
        </div>
    )
}

export default ProfileLeft