const User = require('../../Models/User/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../../Functions/hashPassword');

const secretKey = process.env.JWT_SECRET_KEY;

// add User
const addUser = async (request, response) => {
    const { username, password } = request.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        username: username,
        password: hashedPassword
    });
    try {
        const oldUser = await User.findOne({ username: username });
        if (oldUser) {
            return response.status(400).json({ message: "Username already exists" });
        }
        await newUser.save();
        return response.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: error.message });
    }
};

//  Update User
const updateUser = async (request, response) => {
    const { userID } = request.params;
    const { currentPassword, newUsername, newPassword } = request.body;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return response.status(404).json({ message: "User not found." });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: "Incorrect password." });
        }

        // Update fields
        if (newUsername) user.username = newUsername;
        if (newPassword) user.password = await hashPassword(newPassword);

        await user.save();
        return response.status(200).json({ message: "User updated successfully." });

    } catch (error) {
        console.error("Update error:", error);
        return response.status(500).json({ message: "Internal server error." });
    }
};

// Delete User with username and password confirmation
const deleteUser = async (request, response) => {
    const { userID } = request.params;
    const { username, password } = request.body;

    try {
        const user = await User.findById(userID);
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        // Confirm username
        if (user.username !== username) {
            return response.status(401).json({ message: "Incorrect username" });
        }

        // Confirm password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: "Incorrect password" });
        }

        await User.findByIdAndDelete(userID);
        return response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Internal server error" });
    }
};

// User Login
const loginUser = async (request, response) => {
    const { username, password } = request.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, secretKey);
        return response.status(200).json({ message: "Login successful", token: token });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: "Internal server error" });
    }
};
module.exports = {
    addUser,
    updateUser,
    deleteUser,
    loginUser
};