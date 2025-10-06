const BASE_URL = 'process.env.REACT_APP_API_BASE';

// Header
export const HEADER = {
    'Content-Type': 'application/json',
}

// User API Endpoints
// Register User
export const USER_REGISTER = `${API_BASE}/user/add`;

// Login User
export const USER_LOGIN = `${API_BASE}/user/login`;

// Update User
export const USER_UPDATE_BY_ID = (userID) => `${API_BASE}/user/update/${userID}`;

// Delete User
export const USER_DELETE_BY_ID = (userID) => `${API_BASE}/user/delete/${userID}`;