# WTWR Backend Server - Project 13

This repository contains the backend server for the "WTWR" (What to Wear?) application. Built with **Express.js**, **MongoDB**, and **Mongoose**, it provides a RESTful API with user authentication, secure route access, and CRUD functionality for user profiles and clothing items.

## Project Info

The project’s domain name: seapp.crabdance.com.
A link to the frontend GitHub repo:https://github.com/Jhm323/se_project_react.

## Project Pitch Video

Check out [this video](ADD_LINK_HERE), where I describe my
project and some challenges I faced while building it.

## Project Setup

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

## Project Objective

This backend server includes the following features:

- User signup and login with JWT-based authentication
- Password hashing and field protection
- Secure routes using custom authorization middleware
- Profile editing and resource ownership validation
- RESTful routes for users and clothing items
- Linting and formatting with ESLint and Prettier
- GitHub Actions integration for continuous testing

## Project Structure

```
.
├── app.js              # Entry point
├── controllers/        # Route logic
├── middlewares/        # Authorization middleware
├── models/             # Mongoose schemas
├── routes/             # Express routers
├── utils/              # Utilities (config, errors, etc.)
├── .eslintrc.js        # Linter configuration
├── .editorconfig       # Editor settings
└── .github/            # GitHub Actions workflows
```

## Authentication & Authorization

**Signup** (`POST /signup`)  
Creates a new user account.

**Login** (`POST /signin`)  
Returns a JWT if email and password are correct.

All other routes are protected and require a valid JWT in the `Authorization` header, except:

- `POST /signup`
- `POST /signin`
- `GET /items`

Middleware in `middlewares/auth.js` checks token validity and attaches user info to the request.

## User Endpoints

- `GET /users/me` — Return the currently authenticated user
- `PATCH /users/me` — Update the current user's `name` and `avatar`

### Signup Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "Your Name",
  "avatar": "https://example.com/avatar.jpg"
}
```

### Login Request Body

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

## Clothing Item Endpoints

- `GET /items` — Return all clothing items (public)
- `POST /items` — Add a new clothing item (authenticated)
- `DELETE /items/:itemId` — Delete a clothing item (only if user is owner)
- `PUT /items/:itemId/likes` — Like an item
- `DELETE /items/:itemId/likes` — Unlike an item

### POST /items Request Body

```json
{
  "name": "Jacket",
  "weather": "cold",
  "imageUrl": "https://example.com/jacket.jpg"
}
```

Item ownership is enforced when deleting items. Users can only delete their own items.

## Data Validation

- Email and password fields are required during signup.
- Passwords are hashed using `bcryptjs` and stored securely.
- `validator` is used to check valid emails and URLs.
- The password field is hidden from query results using `select: false`.

To access the password for login authentication, use:

```js
User.findOne({ email }).select("+password");
```

## Error Handling

Standardized error codes and messages are used throughout the app:

| Code | Description                |
| ---- | -------------------------- |
| 400  | Bad Request / Invalid Data |
| 401  | Unauthorized Access        |
| 403  | Forbidden Action           |
| 404  | Not Found                  |
| 409  | Conflict / Duplicate       |
| 500  | Internal Server Error      |

Use `.orFail()` in Mongoose to catch missing resources and trigger appropriate error responses.

## Linting & Formatting

Use ESLint to check code style:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint -- --fix
```

Prettier is configured with Airbnb base style rules.

## Development with Nodemon

To run the development server with auto-reloading:

```bash
npm run dev
```

## CORS Setup

CORS is enabled to allow the frontend to communicate with this server:

```js
const cors = require("cors");
app.use(cors());
```

## Testing

### Postman

- Use the official Postman collection for Sprint 13
- Replace placeholder values (user IDs, tokens, item IDs) with real data from your database
- You may run tests individually to avoid hitting Postman's collection run limits

### GitHub Actions

- Push to GitHub to trigger tests
- Review test results under the **Actions** tab

## Submission Checklist

- [x] User authentication works using email and password
- [x] JWT tokens are generated and verified correctly
- [x] Users can only delete their own clothing items
- [x] Protected routes are secured
- [x] Passwords are hashed and never exposed in responses
- [x] User profile updates (name and avatar) function correctly
- [x] ESLint passes with no errors
- [x] Postman tests pass
- [x] GitHub Actions tests pass

## Scripts

In your `package.json`, these scripts should be defined:

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "lint": "npx eslint ."
}
```

## Notes

- Weather values should use one of the following enums: `"hot"`, `"warm"`, `"cold"`
- Drop MongoDB collections in Compass if you need to enforce unique fields after development
- Use the `delete` keyword to remove sensitive properties (e.g. passwords) from response objects
- Project uses hardcoded authorization in earlier sprints — now fully replaced with token-based authentication
