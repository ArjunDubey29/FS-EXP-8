# FS-EXP-8
This repo is for experiment 8 of full stack (CU).

# React Login App (Full project)

This is a minimal React app containing a simple login form component that uses local component state (`useState`) and validates inputs.

## How to run
1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Open http://localhost:3000 in your browser

Files of interest:
- src/LoginForm.js
- src/App.js
- src/index.js


# JWT Fullstack Demo (Frontend + Backend)

## Setup

There are two folders: `backend` and `frontend`.

### Backend
1. cd backend
2. npm install
3. npm start
- Server runs on http://localhost:5000
- Login: POST /login { "username": "neha", "password": "password123" }

### Frontend
1. cd frontend
2. npm install
3. npm start
- App runs on http://localhost:3000 and will proxy API requests to backend.

## Notes
- This is a demo. Passwords are in plain text and a hardcoded user is used for simplicity.
- For production: use HTTPS, secure JWT secret, store hashed passwords, and use refresh tokens.