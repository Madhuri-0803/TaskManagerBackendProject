# Task Management Application Backend

## Overview
This project aims to build a scalable backend for an advanced Task Management Application, allowing users to manage tasks effectively while ensuring role-based access control and real-time updates.

## Features
- **User Authentication**: Sign up and log in with JWT-based authentication and secure password storage.
- **Task Management**: 
  - Create, edit, and delete tasks with detailed metadata.
  - Mark tasks as completed or incomplete.
  - Set priorities and due dates.
  - Assign tasks to multiple users.
- **Task Filtering**: View task statuses and filter based on criteria (completed, priority, assignees).
- **Real-time Updates**: Integrate notifications for task completion and updates.
- **Pagination**: Implement pagination for large datasets of tasks.

## Technical Requirements
- **Backend Framework**: Node.js and Express for building a RESTful API.
- **Database**: PostgreSQL or MongoDB for storing user information and tasks.
- **Architecture**: Clean modular structure with separate route files, controllers, services, and middleware.
- **Role-Based Access Control (RBAC)**: Different roles (admin, user) for feature access.
- **Middleware**: JWT authentication middleware for secured routes.
- **Real-time Capabilities**: Use WebSockets or similar technologies for notifications.
- **Performance & Security**: Best practices for optimization and security (rate limiting, input validation, etc.).

## Deployment
- Deploy the backend API to a cloud provider of your choice (e.g., AWS, Google Cloud, Heroku).

## Environmental Variable 
- MONGO_URI - Your Mongodb Connection URl
- JWT_SECRET - Your JWT token
- PORT - Your server port

## Getting Started
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
3. Run the code:
   ```bash
   npm start