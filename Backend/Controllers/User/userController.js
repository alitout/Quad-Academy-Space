import User from '../../Models/User/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import hashPassword from '../../Functions/hashPassword.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../../Functions/auth.js'

const secretKey = process.env.JWT_SECRET_KEY;

// add User
const addUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        username: username,
        password: hashedPassword
    });
    try {
        const oldUser = await User.findOne({ username: username });
        if (oldUser) {
            return res.status(400).json({ msg: "Username already exists" });
        }
        await newUser.save();
        return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

//  Update User
const updateUser = async (req, res) => {
    const { userID } = req.params;
    const { currentPassword, newUsername, newPassword } = req.body;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password." });
        }

        // Update fields
        if (newUsername) user.username = newUsername;
        if (newPassword) user.password = await hashPassword(newPassword);

        await user.save();
        return res.status(200).json({ msg: "User updated successfully." });

    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

// Delete User with username and password confirmation
const deleteUser = async (req, res) => {
    const { userID } = req.params;
    const { username, password } = req.body;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Confirm username
        if (user.username !== username) {
            return res.status(401).json({ msg: "Incorrect username" });
        }

        // Confirm password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        await User.findByIdAndDelete(userID);
        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const token = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        res.status(200).json({
            msg: "Login successful",
            data: {
                userID: user.userID,
                username: user.username
            },
            bearerToken: accessToken,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// Get Self User
const getSelfUser = [
    verifyToken,
    async (req, res) => {
        try {
            const user = await User.findOne({ userID: req.user.userID });
            if (!user) {
                return res.status(404).send("المستخدم غير موجود");
            }
            res.status(200).json({
                userID: user.userID,
                username: user.username
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];


export default {
    addUser,
    updateUser,
    deleteUser,
    loginUser,
    getSelfUser
};