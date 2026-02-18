# Task Manager Frontend

Simple React.js frontend for the Task Manager backend API.

## Features

- ✅ User Registration & Login
- ✅ JWT Authentication with Cookies
- ✅ Create, Read, Update, Delete Tasks
- ✅ Mark tasks as completed/pending
- ✅ Clean and simple UI
- ✅ Error/Success messages from API

## Prerequisites

- Node.js (v14 or higher)
- Backend server running on `http://localhost:8080`

## Installation

1. Open terminal in the `frontend` folder

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open browser and go to:
```
http://localhost:3000
```

## Usage

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

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskCard.js      # Individual task display
│   │   ├── TaskForm.js      # Create/Edit task form
│   │   └── TaskList.js      # List of all tasks
│   ├── pages/
│   │   ├── Dashboard.js     # Main dashboard
│   │   ├── Login.js         # Login page
│   │   └── Signup.js        # Signup page
│   ├── App.css             # Styles
│   ├── App.js              # Main app with routing
│   └── index.js            # Entry point
└── package.json
```

## API Endpoints Used

- `POST /Assignment/auth/signup` - Register new user
- `POST /Assignment/auth/login` - Login user
- `GET /Assignment/auth/logout` - Logout user
- `GET /Assignment/task` - Get all tasks
- `POST /Assignment/task/createTask` - Create new task
- `PUT /Assignment/task/:id` - Update task
- `DELETE /Assignment/task/:id` - Delete task

## Notes

- Make sure backend server is running before starting frontend
- Cookies are used for authentication (automatically handled)
- CORS is configured to allow credentials from localhost:3000
