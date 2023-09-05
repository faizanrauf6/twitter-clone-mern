# Twitter Clone MERN - README

Welcome to the Twitter Clone App! This application is built using ReactJs for the frontend and Node.js for the backend. It allows you to create different posts / tweets and share lovely moments with friends and family. They can like each other posts as well as they follow other persons in the application. Backend Res APIs and authentication is done using Node.js and Express.js. This README will guide you on how to set up and run the project.

## Prerequisites

- Node.js 16 or above (Make sure you have Node.js 16 or above installed on your machine)
- MongoDB Altas database URL for database
- Please use .env.example and make your own .env file according to it

## Project Structure

The project consists of two main folders:

- **client**: This folder contains the ReactJs-based frontend of the application.
- **server**: This folder contains the Node.js-based backend of the application.

## Frontend Setup

To set up the frontend, follow these steps:

- Navigate to the `client` folder: `cd client`
- Install the required Node modules: `npm install -f`
- Start the development server: `npm run dev`

The ReactJs development server will start, and you can access the frontend by opening your browser and navigating to the provided URL.

## Backend Setup

To set up the backend, follow these steps:

- Navigate to the `server` folder: `cd server`
- Install the required Node modules: `npm install`
- Start the development server: `npm run dev`

The Node.js backend server will start, and you will see logs indicating that the server is running and listening for incoming requests.

## Application features:

- Authentication
  - Signup
  - Signin
  - Signout
- Tweets
  - Create tweet with image
  - Delete tweet
  - View all tweets (with pagination 10 tweets per page)
  - View my tweets
  - View my liked tweets
- Profile
  - View profile details (view followers and followed counts)
  - Follow user
  - Unfollow user

Feel free to explore the codebase and customize the application to your requirements. If you have any questions or run into issues, please feel free to contact me at faizanrauf6@gmail.com. Thanks!

Happy coding! 🎬🍿

## Authors

- [@faizanrauf6](https://www.github.com/faizanrauf6)

## Demo

- [Demo of Twitter Clone MERN](https://twitter-clone-frontend-xi.vercel.app/)
