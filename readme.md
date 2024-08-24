## APPLICATION DEMO LINK

https://drive.google.com/file/d/1KxIpWobYu7qVDWOrrzVnND3SmguKlZZp/view?usp=drive_link

## HOSTED LINK

https://careercurve-meets-5d6016.netlify.app

# Mentor-Student Booking System

This is a Mentor-Student Booking System built using Node.js, Express, SQLite, and JWT authentication. The system allows students to book one-on-one sessions with mentors based on their availability and preferences. The application also sends email notifications upon scheduling meetings.

## Features

- **Mentor and Student Registration/Login:** Allows users to register and log in as either mentors or students.
- **JWT Authentication:** Secure authentication mechanism using JSON Web Tokens.
- **Session Booking:** Students can book sessions with mentors, and mentors can view their bookings.
- **Email Notifications:** Automated email notifications for scheduled meetings.
- **Role-based Mentor Search:** Search mentors based on specific roles or expertise.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** SQLite
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer with Gmail SMTP
- **Database:** SQLite3

## Installation

1. **Clone the repository:**

   ```bash
    git clone https://github.com/SSC369/CareerCarve-Assignment.git
    cd CareerCarve-Assignment
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Initialize the database:**

   The SQLite database will be automatically created and initialized with the necessary tables when you start the server.

5. **Start the server:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST `/api/mentor/register`** - Register a new mentor
- **POST `/api/mentor/login`** - Mentor login
- **POST `/api/student/register`** - Register a new student
- **POST `/api/student/login`** - Student login

### Mentor Endpoints

- **GET `/api/mentor/mentors`** - Retrieve all mentors
- **GET `/api/mentor/roles?query=role_name`** - Search mentors by role

### Student Endpoints

- **GET `/api/student/students`** - Retrieve all students

### Booking Endpoints

- **POST `/api/booking/add-booking`** - Create a new booking (Requires JWT)
- **PUT `/api/booking/update-booking`** - Update a booking with date and time
- **GET `/api/booking/mentor`** - Retrieve all bookings for a mentor (Requires JWT)
- **GET `/api/booking/student`** - Retrieve all bookings for a student (Requires JWT)

## Database Schema

### Mentors

| Column   | Type    | Description         |
| -------- | ------- | ------------------- |
| id       | INTEGER | Primary Key         |
| username | TEXT    | Mentor's username   |
| password | TEXT    | Hashed password     |
| roles    | TEXT    | JSON array of roles |
| email    | TEXT    | Mentor's email      |
| premium  | INTEGER | Premium status      |

### Students

| Column   | Type    | Description        |
| -------- | ------- | ------------------ |
| id       | INTEGER | Primary Key        |
| username | TEXT    | Student's username |
| password | TEXT    | Hashed password    |
| email    | TEXT    | Student's email    |

### Bookings

| Column    | Type    | Description                                     |
| --------- | ------- | ----------------------------------------------- |
| id        | INTEGER | Primary Key                                     |
| studentId | INTEGER | Foreign Key (Students)                          |
| mentorId  | INTEGER | Foreign Key (Mentors)                           |
| duration  | TEXT    | Duration of the meeting                         |
| status    | TEXT    | Status of the booking                           |
| price     | REAL    | Price of the booking                            |
| dateTime  | TEXT    | JSON object with start time, end time, and date |

## Email Notification

When a meeting is scheduled, an email is sent to the student with the details of the booking, including the date and time of the session.

Here's a README.md file tailored for your frontend project. You can adjust any details as needed:

````markdown
# Frontend for Booking System

This is the frontend application for the booking system built with React and Vite. The application allows users to log in, register, view their home page, and access mentor and student-specific pages.

## Features

- **Login & Registration**: Users can log in or register as mentors or students.
- **Home Page**: Landing page accessible to all users.
- **Mentor Home**: Mentor-specific page to view and manage bookings.
- **Student Meets**: Page for students to view and manage their meetings.

## Tech Stack

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development experience.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Router DOM**: For routing and navigation.
- **React Hot Toast**: For displaying notifications.

## Installation

To get started with the frontend, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SSC369/CareerCarve-Assignment.git
   cd CareerCarve-Assignment
   ```
````

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000` by default.

4. **Build for Production**:

   ```bash
   npm run build
   ```

   The production-ready files will be generated in the `dist` directory.

## Folder Structure

- **`src/`**: Contains all the source code for the frontend.
  - **`pages/`**: Contains React components for different pages.
    - `Login.jsx`
    - `Register.jsx`
    - `Home.jsx`
    - `MentorHome.jsx`
    - `StudentMeets.jsx`
  - **`App.jsx`**: Main application component that sets up routing.
  - **`index.jsx`**: Entry point for the React application.

## Configuration

Ensure you have the following environment variables set in a `.env` file:

- **`VITE_BACKEND_URL`**: Base URL for the backend API.

Happy coding!

```

```
