const BASE_URL = process.env.REACT_APP_API_BASE;

// Header
export const HEADER = {
    'Content-Type': 'application/json',
}

// User API Endpoints
// Add Admin User
export const USER_ADD_ADMIN = `${BASE_URL}/user/addAdmin`;

// Add User
export const USER_ADD = `${BASE_URL}/user/add`;

// Login User
export const USER_LOGIN = `${BASE_URL}/user/login`;

// Get Self
export const USER_GETSELF = `${BASE_URL}/user/getSelf`;

// Get All
export const USER_GET_ALL = `${BASE_URL}/user/getAll`;

// Update User
export const USER_UPDATE_BY_ID = (userID) => `${BASE_URL}/user/update/${userID}`;

// Change User Password
export const USER_CHANGE_PASSWORD = (userID) => `${BASE_URL}/user/changePassword/${userID}`;

// Reset User Password
export const USER_RESET_PASSWORD = (userID) => `${BASE_URL}/user/resetPassword/${userID}`;

// Delete User
export const USER_DELETE_SELF_BY_ID = (userID) => `${BASE_URL}/user/delete/Self/${userID}`;

// Delete User by Admin
export const USER_DELETE_BY_ADMIN = (userID) => `${BASE_URL}/user/delete/ByAdmin/${userID}`;

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


// Enrollment API Endpoints
// Enroll in Program
export const ENROLLMENT_ENROLL_PROGRAM = `${BASE_URL}/enrollments/program/enroll`;

// Unenroll from Program
export const ENROLLMENT_UNENROLL_PROGRAM = `${BASE_URL}/enrollments/program/unenroll`;

// Enroll in MasterClass
export const ENROLLMENT_ENROLL_MASTERCLASS = `${BASE_URL}/enrollments/masterclass/enroll`;

// Unenroll from MasterClass
export const ENROLLMENT_UNENROLL_MASTERCLASS = `${BASE_URL}/enrollments/masterclass/unenroll`;

// Get User Enrollments
export const ENROLLMENT_GET_USER = `${BASE_URL}/enrollments/user`;

// Check Enrollment Status
