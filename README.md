### Project Overview

This project is a Product management application built using the MERN stack (MongoDB, Express.js, React, Node.js). The application allows users to find different products by filtering,sorting and search. The frontend is styled with Tailwind CSS and Material Tailwind, and state management is handled using Redux.

Deploy: https://product-management-ahad.netlify.app

### Technologies Used
- **Frontend**: React, Redux, Tailwind CSS, Material Tailwind
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: RESTful API built with Express.js

### Setup and Run the Project Locally

#### Prerequisites
- Node.js (>= 14.x)
- MongoDB

#### Backend Setup
1. Clone the repository:
   ```sh
   git clone <repository_url>
   cd <repository_folder>/backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
   ```env
   DB_USER=<your_db_user>
   DB_PASS=<your_db_password>
 
   ```

4. Start the backend server:
   ```sh
   nodemon index.js
   ```

#### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm run dev
   ```

4. Open your browser for backend and navigate to `http://localhost:3000`
Open your browser for frontend and navigate to `http://localhost:5173`
.


  ```

By following these instructions, you should be able to set up and run the project locally, and utilize the API endpoints for managing tasks.
