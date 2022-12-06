import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";


import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";


const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use(express.static('public'))
app.use('/images', express.static("images"))


mongoose.connect('mongodb://localhost:27017/SocialMediaTest6', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => app.listen(5000, () => console.log('Server is running on port 5000'))).catch((error) => console.log(error.message));

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);