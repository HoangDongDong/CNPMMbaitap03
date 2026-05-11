# BaiTap03 - Full Stack Authentication Application

A complete authentication system with Express backend and React frontend using MySQL, JWT, and modern web technologies.

## Project Structure

```
BaiTap03/
├── src/                          # Backend (Express + Sequelize)
│   ├── config/
│   │   └── database.js          # MySQL/Sequelize config
│   ├── controllers/
│   │   └── userController.js    # API handlers
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   └── user.js              # User model
│   ├── routes/
│   │   └── api.js               # API routes
│   ├── services/
│   │   └── userService.js       # Business logic
│   └── server.js                # Backend entry point
├── frontend/                      # Frontend (React + Vite)
│   ├── src/
│   │   ├── util/
│   │   │   └── api.js           # Axios HTTP client
│   │   ├── pages/
│   │   │   ├── register.jsx
│   │   │   └── forgot-password.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state
│   │   ├── App.jsx              # Login component
│   │   └── main.jsx             # Router setup
│   ├── package.json
│   ├── vite.config.js
│   └── .env
├── package.json                  # Backend dependencies
└── .env                           # Backend config
```

## Tech Stack

### Backend

- **Express.js** - Web framework
- **Sequelize** - ORM
- **MySQL2** - Database driver
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment configuration
- **CORS** - Cross-origin requests

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Ant Design** - UI components

## Installation & Setup

### 1. Backend Setup

```bash
# Install backend dependencies
npm install

# Create MySQL database
mysql -u root
CREATE DATABASE baitap03_db;
EXIT;

# Configure .env with database credentials
DB_HOST=localhost
DB_PORT=3306
DB_NAME=baitap03_db
DB_USER=root
DB_PASSWORD=
PORT=8080
JWT_SECRET=your_secret_key

# Start backend
npm start          # Production
npm run dev        # Development
```

Backend runs on: `http://localhost:8080`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Configure .env (optional)
VITE_API_BASE_URL=http://localhost:8080/api/users

# Start frontend development server
npm run dev        # http://localhost:3000
npm run build      # Build for production
npm run preview    # Preview build
```

## API Endpoints

### Public Routes

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `POST /api/users/forgot-password` - Password reset request

### Protected Routes (require Bearer token)

- `GET /api/users/v1/api/user` - Get all users (excludes passwords)

## Frontend Routes

| Path               | Component           | Protected | Description         |
| ------------------ | ------------------- | --------- | ------------------- |
| `/`                | App.jsx             | No        | Login page          |
| `/register`        | register.jsx        | No        | Registration form   |
| `/forgot-password` | forgot-password.jsx | No        | Password reset form |

## Authentication Flow

1. User registers with name, email, and password
2. Password is hashed with bcrypt (salt rounds: 10)
3. User logs in and receives JWT token (expires in 1h)
4. Token stored in browser localStorage
5. Token automatically included in API requests via Axios interceptor
6. Protected routes validate token using auth middleware

## Development

### Running Both Services

**Terminal 1 - Backend:**

```bash
npm start
```

**Terminal 2 - Frontend:**

```bash
cd frontend && npm run dev
```

Visit `http://localhost:3000`

## Key Features

✅ User registration and validation
✅ Secure login with JWT tokens
✅ Password hashing with bcrypt
✅ Protected API routes
✅ Global authentication state management
✅ Automatic token injection in requests
✅ Error handling with notifications
✅ Responsive Ant Design UI
✅ Environment-based configuration

## Database Schema

**Users Table**

- `id` - Integer, Primary Key, Auto Increment
- `name` - String, Required
- `email` - String, Required, Unique
- `password` - String, Required
- `role` - String, Default: 'user'
- `resetPasswordToken` - String, Nullable
- `createdAt` - Timestamp
- `updatedAt` - Timestamp
