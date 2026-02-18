# Task Management Application (MERN Stack)

A complete full-stack Task Management Application built with MongoDB, Express, React, and Node.js (MERN Stack). This application provides user authentication and CRUD operations for task management.

## Features

### Backend
- ✅ User Registration & Login
- ✅ JWT Authentication with Cookies
- ✅ Create, Read, Update, Delete Tasks
- ✅ Role-based Access Control (Admin/User)
- ✅ Password Encryption
- ✅ Input Validation

### Frontend
- ✅ Clean and Simple UI
- ✅ User Registration & Login
- ✅ JWT Authentication with Cookies
- ✅ Create, Read, Update, Delete Tasks
- ✅ Mark tasks as completed/pending
- ✅ Error/Success messages from API

---

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas cloud)
- **npm** 

---

## Installation & Setup

### 1. Clone the Repository

```
bash
git clone <repository-url>
cd <project-folder>
```

### 2. Backend Setup

Navigate to the root directory and install backend dependencies:

```
bash
npm install
```

#### Backend Configuration

1. Create a `.env` file in the root directory (copy from `.env.example` if available)
2. Add the following environment variables:

```
env
MONGO_URI=your_mongodb_connection_string_here
SECRET_KEY=your_jwt_secret_key_here
```

##### Getting MongoDB URI

- **Local MongoDB**: `mongodb://localhost:27017/taskmanager`
- **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get your connection string

##### SECRET_KEY

Generate a random string for JWT authentication (e.g., use a UUID or random password generator)

### 3. Frontend Setup

Navigate to the `frontend` folder and install dependencies:

```
bash
cd frontend
npm install
```

---

## Running the Application

### Start Backend Server

From the root directory:

```
bash
npm run dev
```

The server will start on: **http://localhost:8080**

### Start Frontend Server

Open a new terminal and navigate to the frontend folder:

```
bash
cd frontend
npm start
```

The frontend will open in your browser at: **http://localhost:3000**

> **Note:** Make sure the backend server is running before starting the frontend.

---

## API Endpoints

### Base URL
```
http://localhost:8080
```

### Authentication Routes (Public)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/Assignment/auth/signup` | Register a new user |
| POST | `/Assignment/auth/login` | Login user |
| GET | `/Assignment/auth/logout` | Logout user |

### Task Routes (Protected - Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/Assignment/task/createTask` | Create a new task |
| GET | `/Assignment/task/allTask` | Get all tasks |
| GET | `/Assignment/task/:id` | Get single task by ID |
| PUT | `/Assignment/task/:id` | Update task by ID |
| DELETE | `/Assignment/task/:id` | Delete task by ID |

---

## API Documentation (Postman)

### Test Accounts

#### Admin Access
Login with this admin to get all admin features like getting all users' tasks, changing them, and deleting them:

```
json
{
  "email": "test@gmail.com",
  "password": "Test@2004"
}
```

#### User Access
Register a new user to test regular user features.

---

### 1. User Registration (Signup)

**Endpoint:** `POST /Assignment/auth/signup`

**Request Body:**
```
json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123@"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@$!%*?&)

**Success Response (201):**
```
json
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

### 2. User Login

**Endpoint:** `POST /Assignment/auth/login`

**Request Body:**
```
json
{
  "email": "john@example.com",
  "password": "Password123@"
}
```

**Success Response (200):**
```
json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id_here",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Note:** Authentication token is stored in cookies (`Assignment`)

---

### 3. Logout

**Endpoint:** `GET /Assignment/auth/logout`

**Success Response (200):**
```
json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

### 4. Create Task

**Endpoint:** `POST /Assignment/task/createTask`

**Headers:**
```
Cookie: Assignment=your_jwt_token
```

**Request Body:**
```
json
{
  "title": "Complete assignment",
  "description": "Finish the backend assignment by end of week"
}
```

**Success Response (201):**
```
json
{
  "status": "success",
  "message": "Task created successfully",
  "data": {
    "task": {
      "_id": "task_id_here",
      "title": "Complete assignment",
      "description": "Finish the backend assignment by end of week",
      "userId": "user_id_here",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

### 5. Get All Tasks

**Endpoint:** `GET /Assignment/task/allTask`

**Headers:**
```
Cookie: Assignment=your_jwt_token
```

**Success Response (200):**
```
json
{
  "status": "success",
  "message": "Tasks fetched successfully",
  "data": {
    "tasks": [
      {
        "_id": "task_id_here",
        "title": "Complete assignment",
        "description": "Finish the backend assignment",
        "userId": "user_id_here",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 6. Get Single Task

**Endpoint:** `GET /Assignment/task/:id`

**Headers:**
```
Cookie: Assignment=your_jwt_token
```

**Success Response (200):**
```
json
{
  "status": "success",
  "message": "Task fetched successfully",
  "data": {
    "task": {
      "_id": "task_id_here",
      "title": "Complete assignment",
      "description": "Finish the backend assignment",
      "userId": "user_id_here",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

### 7. Update Task

**Endpoint:** `PUT /Assignment/task/:id`

**Headers:**
```
Cookie: Assignment=your_jwt_token
```

**Request Body:**
```
json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

**Success Response (200):**
```
json
{
  "status": "success",
  "message": "Task updated successfully",
  "data": {
    "task": {
      "_id": "task_id_here",
      "title": "Updated title",
      "description": "Updated description",
      "userId": "user_id_here",
      "updatedAt": "2024-01-02T00:00:00.000Z"
    }
  }
}
```

---

### 8. Delete Task

**Endpoint:** `DELETE /Assignment/task/:id`

**Headers:**
```
Cookie: Assignment=your_jwt_token
```

**Success Response (200):**
```
json
{
  "status": "success",
  "message": "Task deleted successfully"
}
```

---

## Error Responses

**400 - Bad Request:**
```
json
{
  "status": "failure",
  "message": "Error message here"
}
```

**401 - Unauthorized:**
```json
{
  "status": "failure",
  "message": "unauthorized"
}
```

**500 - Internal Server Error:**
```
json
{
  "status": "failure",
  "message": "Internal server error"
}
```

---

## Frontend Usage Guide

### 1. Sign Up
- Go to `/signup`
- Enter name, email, and password
- Password must be at least 8 characters with uppercase, lowercase, number, and special character

### 2. Login
- Go to `/login`
- Enter email and password
- You'll be redirected to dashboard

### 3. Dashboard
- **Create Task**: Fill in title and description, click "Create Task"
- **Edit Task**: Click "Edit" button, modify details, click "Update Task"
- **Delete Task**: Click "Delete" button, confirm deletion
- **Toggle Complete**: Click "✓" button to mark as complete/pending

### 4. Logout
- Click "Logout" button in navbar

---

## Project Structure

### Backend (Root Directory)
```
├── app.js                 # Main application file
├── config/
│   └── config.json        # Configuration files
├── controller/
│   ├── authController/    # Authentication controllers
│   │   ├── login.js
│   │   ├── logout.js
│   │   └── signUp.js
│   └── taskController/    # Task controllers
│       ├── createTaskController.js
│       ├── deleteTaskController.js
│       ├── getAllTaskController.js
│       ├── getSingleTaskController.js
│       └── updateTaskController.js
├── db/
│   └── config.js         # Database configuration
├── helper/
│   ├── encPassword.js    # Password encryption
│   └── sendResponse.js   # Response helper
├── middleware/
│   ├── authFn.js         # Authentication middleware
│   └── roleMiddleware.js # Role management
├── models/
│   ├── taskModel.js      # Task schema
│   └── userModel.js      # User schema
├── routes/
│   ├── auth/
│   │   └── userAuthRoute.js
│   └── task/
│       └── taskRouter.js
├── validator/
│   ├── auth/
│   │   ├── loginValidator.js
│   │   └── signupValidator.js
│   └── task/
│       ├── createTaskValidator.js
│       └── updateTaskValidator.js
├── package.json
└── .env                  # Environment variables
```

### Frontend (frontend/ folder)
```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskCard.js   # Individual task display
│   │   ├── TaskForm.js   # Create/Edit task form
│   │   └── TaskList.js   # List of all tasks
│   ├── pages/
│   │   ├── Dashboard.js  # Main dashboard
│   │   ├── Login.js      # Login page
│   │   └── Signup.js     # Signup page
│   ├── App.css          # Styles
│   ├── App.js           # Main app with routing
│   └── index.js         # Entry point
└── package.json
```

---

## Testing with Postman

1. Open Postman
2. Create a new collection for this project
3. Add requests for each endpoint listed above
4. For protected routes, make sure to login first and include the cookie in subsequent requests

---

## Notes

- Make sure backend server is running on port 8080 before starting frontend
- Cookies are used for authentication (automatically handled)
- CORS is configured to allow credentials from localhost:3000
- The JWT token is stored in a cookie named `Assignment`
