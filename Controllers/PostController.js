import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

// Creat new Post
export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
        return res.status(200).json(newPost);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get a post

export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Update a post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body });
            return res.status(200).json("Post Updated");
        } else {
            return res.status(403).json("Action forbidden");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            return res.status(200).json("POst deleted successfully");
        } else {
            return res.status(403).json("Action forbidden");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// like/dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            return res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            return res.status(200).json("Post Unliked");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

export const interestPost = async (req, res) => {
    const id = req.params.id;
    const { userId, postStars } = req.body;

    try {
        const post = await PostModel.findById(id);
        if (!post.interest.includes(userId)) {
            await post.updateOne({ $push: { interest: userId } });

            const user = await UserModel.findById(userId);

            let newStars = user.stars + postStars;
            await user.updateOne({ $set: { stars: newStars } });


            return res.status(200).json("Post interested");
        } else {

            await post.updateOne({ $pull: { interest: userId } });

            const user = await UserModel.findById(userId);
            let newStars = user.stars - postStars;
            if (newStars < 0) {
                newStars = 0;
            }
            await user.updateOne({ $set: { stars: newStars } });

            return res.status(200).json("Post Uninterested");
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

// Get Timeline POsts
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await PostModel.find({ userId: userId });
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts",
                },
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(
            currentUserPosts
                .concat(...followingPosts[0].followingPosts)
                .sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                })
        );
    } catch (error) {
        res.status(500).json(error);
    }
};