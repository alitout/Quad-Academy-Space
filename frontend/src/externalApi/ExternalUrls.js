const BASE_URL = process.env.REACT_APP_API_BASE;

// Header
export const HEADER = {
    'Content-Type': 'application/json',
}

// User API Endpoints
// Register User
export const USER_REGISTER = `${BASE_URL}/user/add`;

// Login User
export const USER_LOGIN = `${BASE_URL}/user/login`;

// Get Self
export const USER_GETSELF = `${BASE_URL}/user/getSelf`;

// Update User
export const USER_UPDATE_BY_ID = (userID) => `${BASE_URL}/user/update/${userID}`;

// Delete User
export const USER_DELETE_BY_ID = (userID) => `${BASE_URL}/user/delete/${userID}`;

// Verify Token
export const VERIFY_TOKEN = `${BASE_URL}/auth/verifyToken`;

// Refresh Token
export const REFRESH_TOKEN = `${BASE_URL}/auth/refresh`;


// Program API Endpoints
// Add Program
export const PROGRAM_ADD = `${BASE_URL}/programs/add`;

// Update Program
export const PROGRAM_UPDATE_BY_ID = (programID) => `${BASE_URL}/programs/update/${programID}`;

// Delete Program
export const PROGRAM_DELETE_BY_ID = (programID) => `${BASE_URL}/programs/delete/${programID}`;

// Get All Programs
export const PROGRAM_GET_ALL = `${BASE_URL}/programs/getAll`;

// Get Program by ID
export const PROGRAM_GET_BY_ID = (programID) => `${BASE_URL}/programs/getByID/${programID}`;


// MasterClass API Endpoints
// Add MasterClass
export const MASTERCLASS_ADD = `${BASE_URL}/masterclasses/add`;

// Update MasterClass
export const MASTERCLASS_UPDATE_BY_ID = (masterClassID) => `${BASE_URL}/masterclasses/update/${masterClassID}`;

// Delete MasterClass
export const MASTERCLASS_DELETE_BY_ID = (masterClassID) => `${BASE_URL}/masterclasses/delete/${masterClassID}`;

// Get All MasterClasses
export const MASTERCLASS_GET_ALL = `${BASE_URL}/masterclasses/getAll`;

// Get MasterClass by ID
export const MASTERCLASS_GET_BY_ID = (masterClassID) => `${BASE_URL}/masterclasses/getByID/${masterClassID}`;