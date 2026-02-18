# Backend Assignment - Task Management API

A simple REST API for task management with user authentication built using Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```
bash
npm install
```

## Configuration

1. Create a `.env` file in the root directory (copy from .env.example if available)
2. Add the following environment variables:

```
env
MONGO_URI=your_mongodb_connection_string_here
SECRET_KEY=your_jwt_secret_key_here
```

### Getting MongoDB URI

- **Local MongoDB**: `mongodb://localhost:27017/taskmanager`
- **MongoDB Atlas**: Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and get your connection string

### SECRET_KEY

Generate a random string for JWT authentication (e.g., use a UUID or random password generator)

## Running the Application

```
bash
npm run dev
```

The server will start on `http://localhost:8080`

## API Endpoints

### Base URL
```
http://localhost:8080
```

### Authentication Routes

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

## Postman API Documentation

## Admin Access 
login with this admin if to get all admin features like Getting all users tasks, changing them and deleting them etc.

 "email": "test@gmail.com",
  "password": "Test@2004"

## User Access
your can do the following steps given below for user features

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

**Endpoint:** `GET /Assignment/task/`

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
```
json
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

## Testing with Postman

1. Open Postman
2. Create a new collection for this project
3. Add requests for each endpoint listed above
4. For protected routes, make sure to login first and include the cookie in subsequent requests

---

## Project Structure

```
├── app.js                 # Main application file
├── config/
│   └── config.json       # Configuration files
├── controller/
│   ├── authController/   # Authentication controllers
│   └── taskController/   # Task controllers
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
│   ├── auth/            # Auth routes
│   └── task/            # Task routes
└── validator/
    ├── auth/            # Auth validators
    └── task/            # Task validators
```

---

