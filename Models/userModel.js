import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: "",
    },
    coverPicture: {
        type: String,
        default: "",
    },
    livesin: {
        type: String,
        default: "",
    },
    profession: {
        type: String,
        default: "",
    },
    stars: {
        type: Number,
        default: 0
    },
    followers: [],
    following: [],
    Hobbies: String,
    invitations: {
        type: Array,
        default: [],
    },
    typee: {
        type: String,
        default: "Veteran"
    },
},
    { timestamps: true });

const UserModel = mongoose.model('Users', UserSchema);
export default UserModel;