# IMF Gadget API

## Overview

The **IMF Gadget API** is a secure and robust Node.js API that allows the Impossible Missions Force (IMF) to manage their gadget inventory. This API supports operations to add, update, retrieve, and decommission gadgets, as well as trigger self-destruct sequences for gadgets. The application uses **PostgreSQL** for data storage and is deployed on **Heroku**.

## Key Features

- **Gadget Inventory**:
  - **GET /gadgets**: Retrieve a list of all gadgets, including mission success probabilities.
  - **POST /gadgets**: Add a new gadget.
  - **PATCH /gadgets/{id}**: Update an existing gadget’s information.
  - **DELETE /gadgets/{id}**: Mark a gadget as decommissioned (soft-delete).
- **Self-Destruct**:
  - **POST /gadgets/{id}/self-destruct**: Trigger the self-destruct sequence with a randomly generated confirmation code.
- **Advanced Filtering**:
  - **GET /gadgets?status={status}**: Filter gadgets by their status (Available, Deployed, Destroyed, Decommissioned).

## Technology Stack

- **Node.js**: Server-side JavaScript runtime for building the API.
- **Express.js**: Web framework to create RESTful APIs.
- **PostgreSQL**: Relational database to store gadget information.
- **Sequelize** (ORM): Object-Relational Mapping tool to interact with the PostgreSQL database.
- **JWT Authentication**: Secure the API using JSON Web Tokens for user authentication.
- **Heroku**: Deployment platform for the Node.js application.
- **Railway**: Cloud platform for hosting PostgreSQL database.

## Installation and Setup

### Prerequisites

- **Node.js** and **npm** should be installed on your machine.
- **PostgreSQL** (locally or hosted via Railway).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/cm-harshpatel/imf-gadget-api-nodejs.git
   cd imf-gadget-api
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Set up your **environment variables**:

   - Create a `.env` file in the root of the project.
   - ⚠️ Important: Do not commit your .env file. Add it to .gitignore.

   - Add the following keys:

     ```bash
     # development
     NODE_ENV=development
     DEV_SERVER_URL=http://localhost:5000
     DB_NAME=your_db_name #replace with your db


      #Method 1
      #if you want to create a new PostgreSQL database using psql command-line tool
      #1. Connect to PostgreSQL: psql -U your_username
      #2. Enter your password when prompted.
      #3. Run this command to create new db: CREATE DATABASE your_database_name;


      #or
      # Method 2: Using pgAdmin (GUI)
      # Open pgAdmin.
      # Connect to your PostgreSQL server.
      # Right-click on "Databases" > Click Create > Database.
      # Enter a Database Name and select the Owner.
      # Click Save.

     DB_USER=your_db_user #replace with your user
     DB_PASS=your_db_password #replace with your password
     DB_HOST=localhost
     DB_PORT=5432
     DB_DIALECT=postgres
     JWT_SECRET=your-secret-key     # A random string for JWT signing
     PORT=5000                      # Default port

     # production (Heroku & Railway) uncomment below code when deploying and comment out above code
     #NODE_ENV=production
     #PROD_SERVER_URL=your this nodejs deployed heroku url
     #DATABASE_URL=your-database-url  # From Railway
     #DB_DIALECT=postgres
     #JWT_SECRET=your-secret-key
     ```

4. Run database migrations:

```bash
npm run migrate
```

Runs Sequelize migrations to set up the database schema

5. Start the application:

### 🔹 For Development

Run the following command to start the server in **development mode**:

note: makesure NODE_ENV=develoment is only active and not production

```bash
npm run dev
```

OR

```bash
NODE_ENV=development nodemon src/server.js

```

The server should now be running on `http://localhost:5000`.

### 🔹 For Production

Run the following command to start the server in **production mode**:

Note:

1. makesure NODE_ENV=production is only active and not development
2. Railway provides a database URL that should be used in production.
   so in environment variables or .env use DATABASE_URL instead of manually setting DB_HOST, DB_PORT

```bash
npm start
```

OR

```bash
NODE_ENV=production node src/server.js
```

The server should now be running on Heroku deployed URL.

## 🚀 API Documentation

📌 **Complete API Reference** is available at:

🔗 [Swagger API Docs](https://imf-api-final-c50c8ddf9877.herokuapp.com/api-docs/) (Right-click and open in a new tab)

💡 Use this link to explore all endpoints, request/response formats, and test API calls directly.

### **Authentication for API Testing**

Most API endpoints require authentication. To obtain a **JWT token**:

```bash
curl -X POST "<YOUR_API_URL>/api/auth/login" \
-H "Content-Type: application/json" \
-d '{"email": "your-email@example.com", "password": "yourpassword"}'
```

🔹 Example for Local Development:

```bash
curl -X POST "http://localhost:5000/api/auth/login" \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "testpassword"}'
```

🔹 Example for Production (if deployed on Heroku/Railway):

```bash
curl -X POST "https://your-deployed-api.herokuapp.com/api/auth/login" \
-H "Content-Type: application/json" \
-d '{"email": "test@example.com", "password": "testpassword"}'
```

Then, use the returned JWT token in the Authorization header for protected endpoints.

For example,

```bash
curl -X GET "<YOUR_API_URL>/api/gadgets" \
-H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```
