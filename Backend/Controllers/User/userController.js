import User from '../../Models/User/userModel.js';
import bcrypt from 'bcrypt';
import hashPassword from '../../Functions/hashPassword.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../../Functions/auth.js'

const secretKey = process.env.JWT_SECRET_KEY;

// add User
const addUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        username: username,
        email: req.body.email,
        fullName: req.body.fullName,
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
    const { newUsername, newPassword, newEmail, newFullName } = req.body;

    try {
        const user = await User.findOne({ userID });
        if (!user) return res.status(404).json({ msg: "User not found." });

        // Basic validation
        if (newEmail !== undefined && newEmail.trim() === "")
            return res.status(400).json({ msg: "Email cannot be empty." });

        if (newFullName !== undefined && newFullName.trim() === "")
            return res.status(400).json({ msg: "Full Name cannot be empty." });

        if (newUsername) user.username = newUsername;
        if (newEmail) user.email = newEmail;
        if (newFullName) user.fullName = newFullName;
        if (newPassword) user.password = await hashPassword(newPassword);

        await user.save();
        return res.status(200).json({ msg: "User updated successfully." });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

// Change User Password
const changeUserPassword = async (req, res) => {
    const { userID } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findOne({ userID });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        user.password = await hashPassword(newPassword);
        await user.save();
        return res.status(200).json({ msg: "Password changed successfully" });
    } catch (error) {
        console.error("Change password error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// Delete User with username and password confirmation
export const deleteUser = async (req, res) => {
    const { userID } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ msg: "Password is required." });
    }

    try {
        const user = await User.findOne({ userID });
        if (!user) return res.status(404).json({ msg: "User not found." });

        if (!user.password) return res.status(500).json({ msg: "User password not set." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: "Incorrect password." });

        await User.deleteOne({ userID });
        return res.status(200).json({ msg: "Profile deleted successfully." });
    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};

// User Login (by username or email)
const loginUser = async (req, res) => {
    const { username, email, password } = req.body;
    const identifier = username || email;

    if (!identifier || !password) {
        console.log(identifier, password);
        return res.status(400).json({ msg: "Username/email and password are required" });
    }

    try {
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        });

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        res.status(200).json({
            msg: "Login successful",
            data: {
                userID: user.userID,
                username: user.username
            },
            bearerToken: accessToken,
            refreshToken: refreshToken
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
                username: user.username,
                email: user.email,
                fullName: user.fullName
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];


export default {
    addUser,
    updateUser,
    changeUserPassword,
    deleteUser,
    loginUser,
    getSelfUser
};