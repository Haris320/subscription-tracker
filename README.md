# Subscription Tracker API

A robust RESTful API for managing personal subscriptions, built as a side project to explore large-scale application architecture, security best practices, and modern backend development patterns.

## 🎯 Project Overview

This project was developed to test and implement a scalable subscription tracking system that could handle a large number of users and their recurring subscriptions. It serves as both a practical tool and a learning experience in building production-ready APIs with enterprise-level security.

## 🛡️ Security with Arcjet

One of the key highlights of this project is the integration of **Arcjet** — a security-as-code platform that provides real-time protection for APIs. Arcjet is implemented as middleware that protects all API endpoints from:

- **Bot Detection**: Automatically identifies and blocks malicious bots
- **Rate Limiting**: Prevents abuse by limiting request frequency per user/IP
- **Shield Protection**: Guards against suspicious patterns and attack vectors
- **Token Bucket Algorithm**: Implements sophisticated rate limiting with burst allowance

Unlike traditional API protection that requires separate infrastructure, Arcjet runs directly in your application code, making it lightweight, fast, and easy to configure. Every request is analyzed in real-time before reaching your controllers, ensuring robust protection without compromising performance.

## 🏗️ Architecture & Best Practices

This project follows industry-standard coding conventions and architectural patterns:

### **Middleware Layer**
- `arcjet.middleware.js` - Security protection for all routes
- `auth.middleware.js` - JWT-based authentication verification
- `error.middleware.js` - Centralized error handling

### **Controller Pattern**
- `auth.controller.js` - Handles user authentication logic
- `user.controller.js` - Manages user-related operations
- `subscription.controller.js` - Controls subscription CRUD operations

### **Schema/Model Layer**
- `user.model.js` - User schema with Mongoose ODM
- `subscription.model.js` - Subscription schema with validation
- Database abstraction for clean separation of concerns

### **Routing**
- RESTful API design with versioning (`/api/v1`)
- Modular route files for scalability
- Clear endpoint organization

## 🧪 Testing with HTTPie

All endpoints were tested using **HTTPie**, a user-friendly command-line HTTP client that makes API testing intuitive and readable. HTTPie was chosen for its:
- Clean, colorized output
- Simple syntax for JSON requests
- Session support for authenticated endpoints
- Better readability compared to curl

Example testing workflow:
```bash
# User registration
http POST localhost:3000/api/v1/auth/register email=user@example.com password=secret123

# User login
http POST localhost:3000/api/v1/auth/login email=user@example.com password=secret123

# Create subscription (with auth token)
http POST localhost:3000/api/v1/subscriptions name="Netflix" amount=15.99 \
  Authorization:"Bearer YOUR_TOKEN"
```

## 🚀 Deployment

This application is deployed on a **Hostinger VPS** (Virtual Private Server), providing:
- Full control over the server environment
- Custom Node.js configuration
- MongoDB database hosting
- SSL/TLS certificate management
- Cost-effective scalability

The VPS setup allows for complete customization and direct server access, making it ideal for learning DevOps practices and server management.

## 🛠️ Tech Stack

- **Runtime**: Node.js with ES6 modules
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) + bcryptjs
- **Security**: Arcjet protection suite
- **Development**: Nodemon for hot-reloading, ESLint for code quality

## 📁 Project Structure
<img width="423" height="443" alt="image" src="https://github.com/user-attachments/assets/83974a05-fd8c-4526-aea5-48074e980ec1" />
