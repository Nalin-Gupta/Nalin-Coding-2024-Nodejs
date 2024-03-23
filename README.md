# Boo Backend Test

This repository contains the Boo Backend Project, showcasing skills in backend development, API design, and database management.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)

## Features

- Create and manage user profiles with detailed information.
- Post, retrieve, and like comments on user profiles.
- Test cases for robust code quality.

## Project Structure

The project consists of the following components:

- **server/controllers/**: Contains controller logic for profiles and comments.
- **server/models/**: Mongoose models for profiles and comments.
- **server/routes/**: Express Router definitions for different endpoints.
- **server/app.js**: Configuration for Express middleware and routes.
- **server/tests/**: Jest test files for controllers and routes.

## Prerequisites

- Node.js (v14.x or later)
- npm (Node Package Manager)
- MongoDB (Make sure MongoDB is installed and running on your machine)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Nalin-Gupta/Nalin-Coding-2024-Nodejs.git
   ```
2. Install Dependencies
   ```bash
   npm install
   ```
## Running the server
Start the development server:
   ```bash
   npm start
   ```
The server will run on http://localhost:3000 by default.

## Usage
Access the API endpoints using a tool like Postman or curl.

Use the provided APIs for managing profiles, comments, and likes.

## API Endpoints

1. Create Profiles

```http
POST /api/profiles HTTP/1.1 
Host: localhost:3000
Content-Type: application/json
Content-Length: 268

{
    "name": "Nalin",
    "description": "First Profile",
    "mbti": "INFP",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 1,
    "socionics": "h",
    "sloan": "RCOEN",
    "psyche": "evil",
    "image": "https://soulverse.boo.world/images/1.png"
}
```
2. Get Profile and Render Profile-Template
```http
GET /api/profiles HTTP/1.1
Host: localhost:3000
```
3. Get a specific profile by ID
```http
GET /api/profiles/:id HTTP/1.1
Host: localhost:3000
```
4. Create a comment on a profile
```http
POST /api/comments HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 94

{
    "name" : "User name",
    "text" : "Lorem Ipsum",
    "profileName" : "Target Profile"
}
```
5. Get Comments for a specific profile
- Sort By Likes
```http

GET /api/comments/profile/:profileName?sortBy=likes HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 80

{
    "name" : "Nalin",
    "text" : "test comment",
    "profileName" : "ram"
}
```
- Sort by createdAt
```http
GET /api/comments/profile/ram?sortBy=createdAt HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 80

{
    "name" : "Nalin",
    "text" : "test comment",
    "profileName" : "ram"
}
```
If no sortBy is specificed the comments will be sorted by default on the basis of createdAt.

6. Like a Comment 
```http
PATCH /api/comments/:id/like HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 35

{
    
    "profileName" : "User"
}
```
## Testing
Tests are stored in the tests/ directory. Run tests using:
```bash
npm test
```
