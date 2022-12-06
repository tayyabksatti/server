import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'

const PostSide = ({ data }) => {
    return (
        <div className="PostSide" style={{ height: data  }}>
            <PostShare />
            <Posts />
        </div >
    )
}

export default PostSide