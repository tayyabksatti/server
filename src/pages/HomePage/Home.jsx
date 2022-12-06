import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import Profileside from '../../components/ProfileSide/Profileside'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'

const Home = () => {
    return (
        <div className="Home">
            <Profileside />
            <PostSide data={1000} />
            <RightSide />
        </div >
    )
}

export default Home