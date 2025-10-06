const BASE_URL = 'process.env.REACT_APP_API_BASE';

// Header
export const HEADER = {
    'Content-Type': 'application/json',
}

// User API Endpoints
// Register User
export const USER_REGISTER = `${BASE_URL}/user/add`;

// Login User
export const USER_LOGIN = `${BASE_URL}/user/login`;

// Update User
export const USER_UPDATE_BY_ID = (userID) => `${BASE_URL}/user/update/${userID}`;

// Delete User
export const USER_DELETE_BY_ID = (userID) => `${BASE_URL}/user/delete/${userID}`;