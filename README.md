# WTWR Backend Server - Project 12

This repository contains the backend server for the "WTWR" (What to Wear?) application. It was built using **Express.js**, **MongoDB**, and **Mongoose**, and features basic API endpoints, temporary user authorization, and data validation for users and clothing items.

---

## 📦 Project Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/se_project_express.git
   cd se_project_express
   ```

2. **Initialize the project**:

   ```bash
   npm init
   ```

3. **Install dependencies**:

   ```bash
   npm install express@^4.21.2 mongoose@^8.9.5 validator
   ```

4. **Dev dependencies**:
   ```bash
   npm install --save-dev nodemon eslint@8 eslint-config-airbnb-base@15 eslint-plugin-import@2 eslint-config-prettier@8 prettier@2
   ```

---

## 🧠 Project Objective

Build an Express server with the following goals:

- Set up RESTful API routes for Users and Clothing Items
- Store and validate data using MongoDB and Mongoose
- Implement error handling and basic authorization
- Prepare for deployment and testing

---

## 🧱 Project Structure

```
.
├── app.js              # Entry point
├── controllers/        # Route logic
├── models/             # Mongoose schemas
├── routes/             # Express routers
├── utils/              # Utility files (errors, etc.)
├── .eslintrc.js        # Linter configuration
├── .editorconfig       # Editor settings
└── .github/            # GitHub Actions workflows
```

---

## 🧪 API Endpoints

### Users

- `GET /users` — Return all users
- `GET /users/:userId` — Return user by ID
- `POST /users` — Create a new user  
  **Request Body**:
  ```json
  {
    "name": "Your Name",
    "avatar": "https://example.com/avatar.jpg"
  }
  ```

### Clothing Items

- `GET /items` — Return all items
- `POST /items` — Create a new item  
  **Request Body**:
  ```json
  {
    "name": "Jacket",
    "weather": "cold",
    "imageUrl": "https://example.com/jacket.jpg"
  }
  ```
- `DELETE /items/:itemId` — Delete an item
- `PUT /items/:itemId/likes` — Like an item
- `DELETE /items/:itemId/likes` — Unlike an item

---

## 🧑 Temporary Authorization Middleware

Until full auth is implemented, use a hardcoded test user ID:

```js
app.use((req, res, next) => {
  req.user = { _id: "5d8b8592978f8bd833ca8133" };
  next();
});
```

---

## ❌ Error Handling

Use standardized error responses with appropriate HTTP status codes:

| Code | Description           |
| ---- | --------------------- |
| 400  | Invalid data or ID    |
| 404  | Resource not found    |
| 500  | Internal server error |

Use `.orFail()` with Mongoose queries to catch missing documents.

---

## 🧹 Linting & Formatting

Run ESLint:

```bash
npm run lint
```

Auto-fix issues:

```bash
npm run lint -- --fix
```

Prettier is configured to work alongside the Airbnb style guide.

---

## 🔁 Hot Reload Setup

Run the dev server with nodemon:

```bash
npm run dev
```

---

## 🧪 Testing

### ✅ Postman

- Fork the [Postman Test Suite](#)
- Replace `validUserId` and `validCardId` with actual DB values if needed
- Run the collection to verify endpoints

### ✅ GitHub Actions

- Push your code to GitHub
- Check the **Actions** tab to ensure workflows pass

---

## ✅ Checklist

Before submission:

- [x] Project lints with no errors
- [x] MongoDB connection is stable
- [x] Routes return appropriate responses
- [x] Error handling returns expected status codes
- [x] Postman and GitHub Actions tests pass

---

## 🛠 Scripts

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "lint": "npx eslint ."
}
```

---

## 📌 Notes

- This project uses hardcoded authorization for now — to be replaced in a future sprint
- Be sure to validate `URL` fields using the `validator` package
- Use enum values for weather: `"hot"`, `"warm"`, `"cold"`

---

## 📇 License

This project is for educational purposes through [TripleTen](https://tripleten.com).
