
# Quad Academy Space

> A comprehensive full-stack learning management platform designed to deliver educational programs, master classes, and community engagement opportunities.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Routes](#api-routes)
- [Application Routes](#application-routes)
- [Authentication Flow](#authentication-flow)
- [Components Architecture](#components-architecture)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Quad Academy Space is a modern, full-featured educational platform built with **React** and **Node.js**, providing students and educators with comprehensive tools to access courses, participate in master classes, and engage with a vibrant learning community. The platform features secure authentication, personalized dashboards, responsive design, and a robust API backend.

### Key Objectives
- Provide an intuitive interface for accessing educational content
- Enable secure user authentication and session management
- Support program and master class management
- Foster community engagement and peer learning
- Ensure mobile-first, responsive design across all devices

---

## ✨ Features

### 🔐 User Authentication
- Secure sign-up and sign-in functionality
- JWT-based token authentication with Bearer tokens
- Refresh token mechanism for extended sessions
- Password hashing with bcrypt (10 salt rounds)
- Token verification on protected routes
- Automatic logout on token expiration

### 📚 Educational Content
- **Programs Management**: Browse, create, update, and delete educational programs
- **Master Classes**: Access advanced learning sessions with specialized content
- **Course Details**: Comprehensive program information including dates, costs, and descriptions
- **Content Display**: Rich media support for program imagery and descriptions

### 👤 User Dashboard
- Personalized user profile management
- Responsive dashboard with dynamic navigation
- Mobile and desktop-optimized interfaces
- Token-based access control
- User data retrieval and management
- Password change functionality

### 🤝 Community Features
- Academy Coffee Space for peer interaction
- Community engagement tools
- Collaborative learning environment
- Social integration capabilities

### 📱 Responsive Design
- Mobile-first approach
- Breakpoint-optimized layouts (xs, sm, md, lg, xl)
- Adaptive navigation system
- Offcanvas menu on mobile devices
- Touch-friendly interface components
- Optimized performance across all devices

### 🎨 User Interface
- Clean, modern design
- Bootstrap 5.3.3 framework
- Custom SASS styling
- Icon libraries (React Icons, Untitled UI)
- Smooth animations and transitions
- Headroom dynamic header behavior

---

## 🛠 Tech Stack

### Frontend
```
React                      18.2.0      - UI library & component framework
React Router DOM           6.26.2      - Client-side routing & navigation
React Bootstrap            2.10.7      - Bootstrap components for React
Bootstrap                  5.3.3       - CSS framework & utilities
Axios                      1.12.2      - HTTP client for API requests
SASS                       1.79.4      - Advanced CSS preprocessing
React Icons                5.5.0       - Popular icon library
Untitled UI Icons React    0.1.3       - Premium icon set
React Headroom             3.2.1       - Dynamic header behavior on scroll
Dotenv                     17.2.3      - Environment variable management
```

### Backend
```
Express                    5.1.0       - Web application framework
Node.js                    14+         - JavaScript runtime
Mongoose                   8.18.3      - MongoDB object modeling
MongoDB                    -           - NoSQL database
Bcrypt                     6.0.0       - Password hashing & security
JWT (jsonwebtoken)         9.0.2       - Token generation & verification
CORS                       2.8.5       - Cross-origin resource sharing
Dotenv                     17.2.3      - Environment variable management
```

### Development Tools
```
React Scripts              5.0.1       - Build & testing utilities
Nodemon                    3.1.10      - Auto-reload for development
ESLint                     -           - Code quality & style
Jest                       -           - Testing framework
React Testing Library      -           - Component testing utilities
```

---

## 📁 Project Structure

```
Quad-Academy-Space/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── API/
│   │   │   └── axiosInstance.jsx          # Configured Axios with interceptors
│   │   ├── Components/
│   │   │   ├── Dashboard/
│   │   │   │   ├── DashboardItem.jsx      # Main dashboard container
│   │   │   │   ├── NavigationsMenu.jsx    # Side navigation menu
│   │   │   │   ├── DashboardItem/
│   │   │   │   │   ├── Profile/
│   │   │   │   │   ├── Programs/
│   │   │   │   │   └── MasterClasses/
│   │   │   ├── LandingPage/
│   │   │   │   ├── HeroSection.jsx        # Hero section with CTA
│   │   │   │   ├── OurPrograms.jsx        # Programs display
│   │   │   │   ├── NavBar.jsx             # Landing page navbar
│   │   │   │   └── Footer.jsx             # Footer component
│   │   │   ├── SignInPage/
│   │   │   │   └── LoginForm.jsx          # Login form component
│   │   │   ├── SignUpPage/
│   │   │   │   └── SignUpForm.jsx         # Registration form component
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.jsx             # Responsive navigation bar
│   │   │   ├── Logo/
│   │   │   │   └── Logo.jsx               # Branding logo component
│   │   │   └── loading.jsx                # Loading spinner component
│   │   ├── Pages/
│   │   │   ├── LandingPage.jsx            # Home/landing page
│   │   │   ├── SignInPage.jsx             # Sign in page
│   │   │   ├── SignUpPage.jsx             # Sign up page
│   │   │   └── DashboardPage.jsx          # Main dashboard page
│   │   ├── Routes/
│   │   │   └── Routes.js                  # Route definitions
│   │   ├── externalApi/
│   │   │   └── ExternalUrls.js            # API endpoint constants
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── heroImage.svg
│   │   ├── data/
│   │   │   ├── jsons/
│   │   │   └── images/
│   │   │       ├── programs/
│   │   │       └── ...
│   │   ├── styles/
│   │   │   ├── main.scss
│   │   │   ├── variables.scss
│   │   │   └── components.scss
│   │   ├── App.js                         # Main App component
│   │   ├── index.js                       # React entry point
│   │   └── index.css                      # Global styles
│   ├── .env                               # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── Backend/
│   ├── Routes/
│   │   ├── routes.js                      # General routes
│   │   ├── authRoutes.js                  # Authentication routes
│   │   ├── User/
│   │   │   └── userRoutes.js              # User management routes
│   │   ├── Program/
│   │   │   └── programsRoutes.js          # Program CRUD routes
│   │   └── MasterClass/
│   │       └── MasterClassRoutes.js       # Master class CRUD routes
│   ├── Models/
│   │   ├── User.js                        # User schema & model
│   │   ├── Program.js                     # Program schema & model
│   │   └── MasterClass.js                 # Master class schema & model
│   ├── Controllers/
│   │   ├── authController.js              # Auth logic
│   │   ├── userController.js              # User management logic
│   │   ├── programController.js           # Program management logic
│   │   └── masterClassController.js       # Master class management logic
│   ├── Functions/
│   │   └── hashPassword.js                # Password hashing utility
│   ├── Middleware/
│   │   └── authMiddleware.js              # Token verification middleware
│   ├── .env                               # Environment variables
│   ├── .gitignore
│   ├── index.js                           # Server entry point
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** v14.0 or higher
- **npm** v6.0+ or **yarn** v1.22+
- **MongoDB** instance (local or cloud)
- **Git** for version control
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step 1: Clone the Repository

```bash
git clone https://github.com/alitout/Quad-Academy-Space.git
cd Quad-Academy-Space
```

### Step 2: Frontend Setup

```bash
cd frontend
npm install
```

This will install all frontend dependencies listed in `package.json`.

### Step 3: Backend Setup

```bash
cd ../Backend
npm install
```

This will install all backend dependencies including Express, Mongoose, Bcrypt, and JWT.

### Step 4: Environment Configuration

See [Environment Configuration](#environment-configuration) section below.

---

## 🔧 Environment Configuration

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Frontend API Configuration
REACT_APP_API_BASE=http://localhost:5000/api

# Optional: Add other environment-specific variables
REACT_APP_DEBUG=false
```

**Important**: All frontend environment variables must be prefixed with `REACT_APP_` to be accessible.

### Backend Environment Variables

Create a `.env` file in the `Backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_URL=mongodb://username:password@localhost:27017/quad-academy

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key_here_change_in_production
JWT_EXPIRY=1h
JWT_REFRESH_EXPIRY=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Production Environment Variables

For production deployment, update these values:

```env
# Production Backend .env
PORT=8080
NODE_ENV=production
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/quad-academy
JWT_SECRET=<generate-strong-secret-key>
JWT_REFRESH_SECRET=<generate-strong-refresh-secret>
CORS_ORIGIN=https://yourdomain.com
```

---

## ▶️ Running the Application

### Development Mode

#### Start Backend Server

```bash
cd Backend
npm start
```

Expected output:
```
Server Started at PORT 5000
Database Connected
```

#### Start Frontend Development Server

In a new terminal:

```bash
cd frontend
npm start
```

The application will automatically open in your browser at `http://localhost:3000`.

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build/` directory.

#### Start Backend in Production

```bash
cd Backend
NODE_ENV=production npm start
```

### Testing

#### Run Frontend Tests

```bash
cd frontend
npm test
```

#### Run Tests with Coverage

```bash
cd frontend
npm test -- --coverage
```

---

## 🔌 API Routes

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/verifyToken` | Verify JWT token validity | No |
| POST | `/api/auth/refresh` | Refresh access token | No |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/user/add` | Register new user | No |
| POST | `/api/user/login` | User login | No |
| GET | `/api/user/getSelf` | Get current user data | Yes |
| PUT | `/api/user/update/:userID` | Update user profile | Yes |
| POST | `/api/user/changePassword/:userID` | Change user password | Yes |
| DELETE | `/api/user/delete/:userID` | Delete user account | Yes |

**User Request/Response Example:**

Register User:
```json
POST /api/user/add
{
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "password": "securepassword123"
}

Response:
{
  "bearerToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "userID": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

### Program Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/programs/add` | Create new program | Yes |
| GET | `/api/programs/getAll` | Get all programs | No |
| GET | `/api/programs/getByID/:programID` | Get program details | No |
| PUT | `/api/programs/update/:programID` | Update program | Yes |
| DELETE | `/api/programs/delete/:programID` | Delete program | Yes |

**Program Request/Response Example:**

```json
GET /api/programs/getAll

Response:
[
  {
    "programID": "507f1f77bcf86cd799439011",
    "title": "Web Development Bootcamp",
    "brief": "Learn modern web development",
    "full_description": "Comprehensive bootcamp covering...",
    "date": "2026-05-15T00:00:00Z",
    "cost": 499,
    "image": "web-development",
    "isAvailable": true
  }
]
```

### Master Class Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/masterclasses/add` | Create master class | Yes |
| GET | `/api/masterclasses/getAll` | Get all master classes | No |
| GET | `/api/masterclasses/getByID/:masterClassID` | Get master class details | No |
| PUT | `/api/masterclasses/update/:masterClassID` | Update master class | Yes |
| DELETE | `/api/masterclasses/delete/:masterClassID` | Delete master class | Yes |

**Master Class Request/Response Example:**

```json
POST /api/masterclasses/add
{
  "title": "Advanced React Patterns",
  "brief": "Master advanced React concepts",
  "full_description": "Deep dive into...",
  "key_takeaways": ["Hooks", "Context API", "Performance"],
  "duration": "4 weeks",
  "level": "Advanced",
  "idealFor": ["Intermediate developers", "React enthusiasts"],
  "date": "2026-06-01",
  "cost": 299,
  "image": "react-advanced",
  "isAvailable": true
}
```

---

## 🗺️ Application Routes

### Public Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | LandingPage | Home/landing page |
| `/programs` | LandingPage (scroll) | Programs section |
| `/masterclasses` | LandingPage (scroll) | Master classes section |
| `/community` | LandingPage | Community engagement area |
| `/academycoffeespace` | LandingPage | Coffee space forum |
| `/sign-up` | SignUpPage | User registration |
| `/sign-in` | SignInPage | User login |

### Protected Routes (Require Authentication)

| Path | Component | Description |
|------|-----------|-------------|
| `/dashboard/profile` | DashboardPage | User profile management |
| `/dashboard/programs` | DashboardPage | User's programs |
| `/dashboard/masterclasses` | DashboardPage | User's master classes |

### Route Configuration

**File**: `frontend/src/Routes/Routes.js`

```javascript
const Routes = () => {
    const routes = useRoutes([
        { path: '/', element: <LandingPage /> },
        { path: '/programs', element: <LandingPage /> },
        { path: '/masterclasses', element: <LandingPage /> },
        { path: '/community', element: <LandingPage /> },
        { path: '/academycoffeespace', element: <LandingPage /> },
        { path: '/sign-up', element: <SignUpPage /> },
        { path: '/sign-in', element: <SignInPage /> },
        { path: '/dashboard/:route', element: <DashboardPage /> }
    ]);
    return routes;
};
```

---

## 🔐 Authentication Flow

### Registration Flow

```
1. User navigates to /sign-up
2. Fills registration form (name, email, username, password)
3. Frontend validates inputs (email format, username alphanumeric, password match)
4. Submits to POST /api/user/add
5. Backend hashes password with bcrypt (10 rounds)
6. Creates user in database
7. Returns bearerToken & refreshToken
8. Frontend stores tokens in localStorage
9. Redirects to /dashboard/profile
```

### Login Flow

```
1. User navigates to /sign-in
2. Enters email/username and password
3. Frontend validates inputs
4. Submits to POST /api/user/login
5. Backend verifies credentials
6. If valid: generates & returns tokens
7. Frontend stores bearerToken & refreshToken
8. Axios interceptor adds "Authorization: Bearer {token}" header
9. Redirects to /dashboard/profile
```

### Token Verification Flow

```
1. User accesses /sign-in or /dashboard
2. Component checks localStorage for bearerToken
3. If token exists: POST /api/auth/verifyToken
4. Backend validates token signature & expiry
5. If valid: allows access, shows content
6. If invalid: clears localStorage, redirects to /sign-in
```

### Token Refresh Flow

```
1. Axios interceptor detects 401 response
2. Retrieves refreshToken from localStorage
3. Calls POST /api/auth/refresh with refreshToken
4. Backend validates refreshToken & generates new bearerToken
5. Updates Authorization header with new token
6. Retries original request
7. If refresh fails: clears tokens, redirects to /sign-in
```

### Logout Flow

```
1. User clicks logout button
2. Frontend clears localStorage (bearerToken, refreshToken)
3. Clears Axios default headers
4. Redirects to /sign-in
```

---

## 🏗️ Components Architecture

### Page Components

#### LandingPage.jsx
- Entry point for unauthenticated users
- Contains multiple sections: Hero, Programs, Master Classes
- Responsive navigation with token verification
- Smooth scroll navigation

#### SignUpPage.jsx
- User registration form
- Form validation (email, username, password match)
- Error display & success messages
- Link to sign-in page

#### SignInPage.jsx
- User authentication form
- Token verification on component mount
- Auto-redirect if already authenticated
- Error handling & loading states

#### DashboardPage.jsx
- Protected route requiring authentication
- Main dashboard container
- Responsive layout (desktop sidebar + mobile offcanvas)
- Token verification middleware

### UI Components

#### Navbar.jsx
- Responsive navigation bar
- Shows different options based on auth status
- Offcanvas menu for mobile
- Fixed/sticky positioning with Headroom

#### NavigationsMenu.jsx
- Dashboard side navigation
- Active route highlighting
- User welcome message
- Logout functionality

#### DashboardItem.jsx
- Dynamic content loader for dashboard routes
- Displays Profile, Programs, or Master Classes
- Component switching based on route parameter

#### Logo.jsx
- Reusable branding component
- Used in navbar, forms, and headers

#### Loading.jsx
- Centered loading spinner
- Shows during async operations
- Prevents UI flashing

### Form Components

#### SignUpForm.jsx
- Multi-field registration form
- Real-time validation
- Password visibility toggle
- Error field highlighting
- Success notification

#### LoginForm.jsx
- Email/username and password fields
- Password visibility toggle
- Comprehensive error handling
- Loading state during submission

### Data Display Components

#### OurPrograms.jsx
- Grid display of programs
- Hover effects with CTA button
- Modal for detailed program information
- Image mapping for program visuals

---

## 💻 Development Guidelines

### Code Style & Best Practices

**Component Structure:**
```jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../API/axiosInstance';

function MyComponent() {
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data on mount
  }, []);

  const handleAction = async () => {
    setLoading(true);
    try {
      // Make API call
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    // JSX
  );
}

export default MyComponent;
```

### API Integration

**Using Axios Instance:**
```javascript
import axiosInstance from '../API/axiosInstance';

// Automatically includes Authorization header
const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/user/getSelf');
    setData(response.data);
  } catch (error) {
    // Error handling includes automatic token refresh
  }
};
```

### Security Considerations

- ✅ Passwords hashed with bcrypt (10+ rounds)
- ✅ JWT tokens with expiration
- ✅ CORS enabled for specified origins
- ✅ Input validation on frontend & backend
- ✅ Sensitive data in environment variables
- ⚠️ TODO: Implement rate limiting
- ⚠️ TODO: Add CSRF protection
- ⚠️ TODO: Implement request validation middleware

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following code guidelines above

3. **Test thoroughly:**
   ```bash
   npm run test
   ```

4. **Commit with descriptive messages:**
   ```bash
   git commit -m "feat: add new feature"
   ```

5. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** with detailed description

### Commit Message Format

```
<type>(<scope>): <subject>
<blank line>
<body>
<blank line>
<footer>
```

**Types:** feat, fix, docs, style, refactor, test, chore

**Examples:**
- `feat(auth): implement JWT refresh token logic`
- `fix(dashboard): resolve navigation menu scroll issue`
- `docs(readme): update installation instructions`

---

## 📄 License

This project is open source By Ali Tout.

---

## 📞 Support & Contact

- **Repository**: [GitHub - alitout/Quad-Academy-Space](https://github.com/alitout/Quad-Academy-Space)
- **Issues**: [Open an Issue](https://github.com/alitout/Quad-Academy-Space/issues)
- **Discussions**: [GitHub Discussions](https://github.com/alitout/Quad-Academy-Space/discussions)

---
