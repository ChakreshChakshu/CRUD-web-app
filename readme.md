# CRUD Web App

A full-stack CRUD (Create, Read, Update, Delete) application built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS 4
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Linting:** ESLint

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Utilities:**
  - `cors` for Cross-Origin Resource Sharing
  - `dotenv` for environment variable management
  - `json2csv` for CSV export functionality
  - `nodemon` for development

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed and running (or a MongoDB Atlas connection string)

### Installation

2.  **Install Backend dependencies:**
    ```bash
    cd Backend
    npm install
    ```

3.  **Install Frontend dependencies:**
    ```bash
    cd ../Frontend
    npm install
    ```

4.  **Environment Setup:**
    - Create a `.env` file in the `Backend` directory and configure your environment variables (e.g., `MONGO_URI`, `PORT`).

### Running the Application

1.  **Start the Backend server:**
    ```bash
    cd Backend
    npm run dev
    # or
    npm start
    ```
    The server typically runs on `http://localhost:5000` (or your configured port).

2.  **Start the Frontend development server:**
    ```bash
    cd Frontend
    npm run dev
    ```
    The frontend typically runs on `http://localhost:5173`.

## Features
- **Create User:** Add new users with their details.
- **Read Users:** View a list of all users.
- **Update User:** Edit existing user information.
- **Delete User:** Remove users from the system.
- **CSV Export:** Export user data to CSV.

## Project Structure

```
CRUD web app/
├── Backend/     # Express.js server and MongoDB models
├── Frontend/    # React application
└── naming/      # (If applicable)
```
