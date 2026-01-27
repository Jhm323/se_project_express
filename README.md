# WTWR Backend Server — Project 13

![ESLint](https://img.shields.io/badge/ESLint-Passing-brightgreen?logo=eslint)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9-47A248?logo=mongodb&logoColor=white)

The **WTWR (What to Wear?) Backend Server** powers the API for a full-stack clothing recommendation application. Built with **Node.js**, **Express**, and **MongoDB**, this service handles authentication, authorization, and secure data management for users and clothing items.

The backend follows RESTful design principles and mirrors real-world production patterns such as JWT authentication, ownership-based access control, and centralized error handling.

---

## 🌐 Project Links

- **Backend Repository:** https://github.com/Jhm323/se_project_express
- **Frontend Repository:** https://github.com/Jhm323/se_project_react
- **Site Demo:** https://wtwr-frontend-5mwu.onrender.com

---

## 🎯 Project Objective

The primary goal of this project was to design and implement a **secure, production-ready backend API** that:

- Authenticates users with email/password credentials
- Protects sensitive routes using JWT-based authorization
- Enforces ownership rules for user-generated content
- Validates and sanitizes incoming data
- Supports seamless integration with a React frontend

This project emphasizes **security, scalability, and clean backend architecture**.

---

## 🧠 What Was Built & How It Works

### Core Functionality

#### **User Authentication**

- Signup and login using JWT tokens
- Password hashing with `bcryptjs`
- Secure token verification middleware

#### **Authorization & Route Protection**

- Private routes require valid JWTs
- Ownership checks prevent unauthorized deletions
- Public access limited to read-only endpoints

#### **Clothing Item Management**

- Create, read, like, and delete clothing items
- Ownership-based deletion enforcement
- Weather-based item categorization

#### **Data Validation & Security**

- Email and URL validation using `validator`
- Password field excluded from query results
- Centralized error handling with consistent status codes

#### **Developer Tooling**

- ESLint + Prettier for code consistency
- Nodemon for local development
- GitHub Actions for automated testing

---

## 🖼 Architecture & API Flow (Visual Overview)

> While this project is backend-focused, the following visuals illustrate how the API operates within the system.

### Authentication Flow

```
┌───────────────┐     ┌───────────────────┐     ┌────────────────────┐
│               │     │                   │     │                    │
│   User signs  │     │  Server verifies   │     │  Server responds   │
│   up / logs in│ ──> │  credentials &    │ ──> │  with JWT token    │
│               │     │  issues token     │     │                    │
└───────────────┘     └───────────────────┘     └────────────────────┘
```

### Protected Route Access

```
┌───────────────┐     ┌───────────────────┐     ┌────────────────────┐
│               │     │                   │     │                    │
│   User makes  │     │  Server checks    │     │  Requested data /  │
│   authorized   │ ──> │  token validity   │ ──> │  action is served  │
│   request      │     │  and user role   │     │  or error is sent  │
│               │     │                   │     │                    │
└───────────────┘     └───────────────────┘     └────────────────────┘
```

---

## 📚 API Documentation

### Authentication & Authorization

**Signup** (`POST /signup`)  
Creates a new user account.

**Login** (`POST /signin`)  
Returns a JWT if email and password are correct.

All other routes are protected and require a valid JWT in the `Authorization` header, except:

- `POST /signup`
- `POST /signin`
- `GET /items`

Middleware in `middlewares/auth.js` checks token validity and attaches user info to the request.

### User Endpoints

- `GET /users/me` — Return the currently authenticated user
- `PATCH /users/me` — Update the current user's `name` and `avatar`

#### Signup Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "Your Name",
  "avatar": "https://example.com/avatar.jpg"
}
```

#### Login Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Clothing Item Endpoints

- `GET /items` — Return all clothing items (public)
- `POST /items` — Add a new clothing item (authenticated)
- `DELETE /items/:itemId` — Delete a clothing item (only if user is owner)
- `PUT /items/:itemId/likes` — Like an item
- `DELETE /items/:itemId/likes` — Unlike an item

#### POST /items Request Body

```json
{
  "name": "Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg"
}
```

Item ownership is enforced when deleting items. Users can only delete their own items.

---

## ⚙️ Development Setup

To get started:

```bash
git clone https://github.com/your-username/se_project_express.git
cd se_project_express
npm init
```

Install required dependencies:

```bash
npm install express@^4.21.2 mongoose@^8.9.5 validator bcryptjs jsonwebtoken cors
```

Install development tools:

```bash
npm install --save-dev nodemon eslint@8 eslint-config-airbnb-base@15 eslint-plugin-import@2 eslint-config-prettier@8 prettier@2
```

### Running the Development Server

To run the development server with auto-reloading:

```bash
npm run dev
```

---

## 🧪 Testing

### Postman

- Use the official Postman collection for Sprint 13
- Replace placeholder values (user IDs, tokens, item IDs) with real data from your database
- You may run tests individually to avoid hitting Postman's collection run limits

### GitHub Actions

- Push to GitHub to trigger tests
- Review test results under the **Actions** tab

---

## ✅ Submission Checklist

- [x] User authentication works using email and password
- [x] JWT tokens are generated and verified correctly
- [x] Users can only delete their own clothing items
- [x] Protected routes are secured
- [x] Passwords are hashed and never exposed in responses
- [x] User profile updates (name and avatar) function correctly
- [x] ESLint passes with no errors
- [x] Postman tests pass
- [x] GitHub Actions tests pass

---

## 📜 Notes

- Weather values should use one of the following enums: `"hot"`, `"warm"`, `"cold"`
- Drop MongoDB collections in Compass if you need to enforce unique fields after development
- Use the `delete` keyword to remove sensitive properties (e.g. passwords) from response objects
- Project uses hardcoded authorization in earlier sprints — now fully replaced with token-based authentication
