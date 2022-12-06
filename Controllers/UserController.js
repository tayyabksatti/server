import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import PostModel from "../Models/postModel.js";

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            return res.status(200).json(otherDetails);
        }
        else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllUsers = async (req, res) => {

    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const { password, ...otherDetails } = user._doc
            return otherDetails
        })
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;

    const { _id, currentUserAdmin, password } = req.body;

    if (id === _id || currentUserAdmin) {
        try {
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const token = jwt.sign(
                { username: user.username, id: user._id },
                "MERN",
                { expiresIn: "1h" }
            );

            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    else {
        return res.status(403).json({ message: 'You can only update your account' });
    }
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdmin } = req.body;
    if (id === currentUserId || currentUserAdmin) {
        try {
            const user = await UserModel.findByIdAndDelete(id);
            if (user) {
                return res.status(200).json({ message: 'User has been deleted' });
            }
            else {
                return res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    else {
        return res.status(403).json({ message: 'You can only delete your account' });
    }
};

// Follow a User
export const followUser = async (req, res) => {
    const id = req.params.id;

    const { _id } = req.body;

    if (_id === id) {
        return res.status(403).json("Action forbidden");
    } else {
        try {
            const followUser = await UserModel.findById(id);
            const followingUser = await UserModel.findById(_id);

            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } });
                await followingUser.updateOne({ $push: { following: id } });
                return res.status(200).json("User followed!");
            } else {
                return res.status(403).json("User is Already followed by you");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};

// UnFollow a User
export const unfollowUser = async (req, res) => {
    const id = req.params.id;

    const { _id } = req.body;

    if (_id === id) {
        res.status(403).json("Action forbidden");
    } else {
        try {
            const unfollowUser = await UserModel.findById(id);
            const unfollowingUser = await UserModel.findById(_id);

            if (unfollowUser.followers.includes(_id)) {
                await unfollowUser.updateOne({ $pull: { followers: _id } });
                await unfollowingUser.updateOne({ $pull: { following: id } });
                res.status(200).json("User Unfollowed!");
            } else {
                res.status(403).json("User is not followed by you");
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};


// Invite a User
export const inviteUser = async (req, res) => {

    const id = req.params.id;
    const postid = req.params.postid;
    const post = await PostModel.findById(postid);
    try {
        if (!post.invited.includes(id)) {
            const user = await UserModel.findById(id);
            const userfollowers = user.followers;
            if (user.followers.length > 0) {
                await post.updateOne({ $push: { invited: id } });

                for (let i = 0; i < userfollowers.length; i++) {
                    const follower = await UserModel.findById(userfollowers[i]);
                    await follower.updateOne({ $push: { invitations: { Eventtype: post.eventtype, Eventname: post.eventname, Eventdate: post.eventdate, invitedby: user.username } } });
                }
                return res.status(200).json(post);
            }
        }
        else {
            const user = await UserModel.findById(id);
            const userfollowers = user.followers;
            if (user.followers.length > 0) {
                await post.updateOne({ $pull: { invited: id } });
                for (let i = 0; i < userfollowers.length; i++) {
                    const follower = await UserModel.findById(userfollowers[i]);
                    await follower.updateOne({ $pull: { invitations: { Eventtype: post.eventtype, Eventname: post.eventname, Eventdate: post.eventdate, invitedby: user.username } } });
                }
                return res.status(200).json(post);
            }
        }
    } catch (error) {
        return res.status(500).json(error);
    }
    return res.status(200).json(post);
}