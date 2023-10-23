User Management System
This system is a web application written in Node.js and MongoDB using NestJS. The system allows users to register, login, view their profile, and update their profile information.

Requirements
Node.js 16+
MongoDB
Installation
Install Node.js and MongoDB.
Download or clone the project from GitHub.
Run the following commands in a terminal:
npm install
npm run start

Usage
To log in to the system, follow these steps:

Open your web browser and navigate to http://localhost:5000/swagger 
or 
https://user-qydo.onrender.com/swagger


Features
User Registration
User login
User profile viewing
User profile updating
update password
Password reset by email
Email verification
delete user
get Profile User by token



Does this file meet your requirements?
Create a user model that includes at least the following fields: ✔️

Username 
Email 
Password (hashed) 
First name 
Last name
Date of birth
Profile picture (stored as a URL )
Implement the following API endpoints using NestJS ✔️
Implement JWT authentication for user registration and login. Return a JWT token upon successful login ✔️
Implement validation and error handling for the API endpoints. Ensure that the API returns appropriate error messages for validation failures and other errors. ✔️

Use MongoDB as the database to store user data. You can use an ODM library like Mongoose to work with MongoDB. ✔️
Secure the application against common security vulnerabilities. ✔️
Use proper project structure and organization following NestJS best practices. ✔️

ش
Implement user roles (admin, regular user) and restrict certain actions to admin users. ✔️
(user role: admin  )
(email: markyaacoub@gmail.com, password: Mm@12345 => The admin has the right to execute all user APIs (get all user, get user by id , update user )

(user role: user )
( => He has the right to implement the API that belongs to him only and He cannot update or view data from another user )

Implement password reset and email verification features. ✔️
After registering the user, we send him an email with otp , and he is unable to log in without activating the email by running (this api /auth/verifyUser/_)
Because I don't have an interface, I implemented a forgot password via email. He enters the email and sends him the new password.

Implement pagination and sorting for user lists. ✔️


Deploy the application to a cloud platform of your choice. ✔️

render.com url (https://user-qydo.onrender.com)
ىخف
note (Repeat the Request at first until the host works for you)

