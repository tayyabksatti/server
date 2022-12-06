import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        desc: String,
        likes: [],
        image: String,
        datatype: String,
        eventname: String,
        eventtype: String,
        eventlocation: String,
        eventdate: Date,
        interest: [],
        poststars: {
            type: Number,
            default: 0,
        },
        invited: {
            type: Array,
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;