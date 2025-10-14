import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const generateAccessToken = (user) => {
    return jwt.sign(
        {
            userID: user.userID,
            username: user.username
        },
        JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            userID: user.userID,
            username: user.username
        },
        JWT_SECRET_KEY,
        { expiresIn: '7d' }
    );
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(' ')[1]; // Remove "Bearer"
    if (!token) return res.status(401).json({ message: "Invalid token format" });

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded; // Attach user payload
        next();
    });
};

export { generateAccessToken, generateRefreshToken, verifyToken };