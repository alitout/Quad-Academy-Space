import User from '../../Models/User/userModel.js';
import bcrypt from 'bcrypt';
import hashPassword from '../../Functions/hashPassword.js';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../../Functions/auth.js'

const secretKey = process.env.JWT_SECRET_KEY;

// add Admin User
const addAdminUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        username: username,
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword,
        role: 'admin'
    });
    try {
        const oldUser = await
            User.findOne({ username: username, email: req.body.email });
        if (oldUser) {
            return res.status(400).json({ msg: "Username or email already exists" });
        }
        await newUser.save();
        return res.status(201).json({ msg: "Admin User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: error.msg });
    }
};

// add User
const addUser = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        username: username,
        email: req.body.email,
        fullName: req.body.fullName,
        password: hashedPassword,
        role: 'user'
    });
    try {
        const oldUser = await User.findOne({ username: username, email: req.body.email });
        if (oldUser) {
            return res.status(400).json({ msg: "Username or email already exists" });
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
    const newUsername = req.body.username;
    const newEmail = req.body.email;
    const newFullName = req.body.fullName;
    const newPassword = req.body.password;
    const newRole = req.body.role;
    const requester = req.user;

    if (!requester) {
        return res.status(401).json({ msg: "Unauthorized" });
    }

    if (requester.role !== 'admin' && requester.userID !== userID) {
        return res.status(403).json({ msg: "Only admins can update other users." });
    }

    try {
        const user = await User.findOne({ userID });
        if (!user) return res.status(404).json({ msg: "User not found." });

        if (newEmail !== undefined && newEmail.trim() === "")
            return res.status(400).json({ msg: "Email cannot be empty." });

        if (newFullName !== undefined && newFullName.trim() === "")
            return res.status(400).json({ msg: "Full Name cannot be empty." });

        if (newRole !== undefined) {
            if (requester.role !== 'admin') {
                return res.status(403).json({ msg: "Only admins can change roles." });
            }
            user.role = newRole;
        }

        if (newUsername) user.username = newUsername;
        if (newEmail) user.email = newEmail;
        if (newFullName) user.fullName = newFullName;
        if (newPassword) user.password = await hashPassword(newPassword);

        await user.save();
        return res.status(200).json({
            user: {
                userID: user.userID,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            },
            msg: "User updated successfully."
        });
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

// Reset User Password to Default (Admin only)
const resetUserPassword = async (req, res) => {
    const { userID } = req.params;
    const requester = req.user;
    if (!requester || requester.role !== 'admin') {
        return res.status(403).json({ msg: "Only admins can reset passwords." });
    }
    try {
        const user = await User.findOne({ userID });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const defaultPassword = "12345678";
        user.password = await hashPassword(defaultPassword);
        await user.save();
        return res.status(200).json({ msg: "Password reset to default successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

// Delete User with username and password confirmation
export const deleteSelfUser = async (req, res) => {
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

// Delete User without password confirmation (Admin only)
const deleteUserByAdmin = async (req, res) => {
    const { userID } = req.params;
    const requester = req.user;

    if (!requester || requester.role !== 'admin') {
        return res.status(403).json({ msg: "Only admins can delete other users." });
    }

    try {
        const user = await User.findOne({ userID });
        if (!user) return res.status(404).json({ msg: "User not found." });

        await User.deleteOne({ userID });
        return res.status(200).json({ msg: "User deleted successfully." });
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
        const role = user.role;

        res.status(200).json({
            msg: "Login successful",
            data: {
                userID: user.userID,
                username: user.username,
                role: user.role
            },
            bearerToken: accessToken,
            refreshToken: refreshToken,
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
                fullName: user.fullName,
                role: user.role
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

// get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Fetch error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};


export default {
    addAdminUser,
    addUser,
    updateUser,
    changeUserPassword,
    resetUserPassword,
    deleteSelfUser,
    deleteUserByAdmin,
    loginUser,
    getSelfUser,
    getAllUsers
};