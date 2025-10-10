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

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
}

export { generateAccessToken, generateRefreshToken, verifyToken };