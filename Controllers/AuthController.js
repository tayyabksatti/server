import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {

    const user = new UserModel(req.body);
    const { username } = req.body;
    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const savedUser = await user.save();
        const token = jwt.sign({ username: savedUser.username, id: savedUser._id }, "MERN", { expiresIn: "1h" });

        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: "User doesn't exist" });
        }

        if (user.password === password) {
            const token = jwt.sign({ username: user.username, id: user._id }, "MERN", { expiresIn: "1h" });
            return res.status(200).json({ user, token });
        } else {
            return res.status(400).json({ message: "Wrong password" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}