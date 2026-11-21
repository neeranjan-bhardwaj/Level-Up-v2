# Level Up AI — Frontend

**Level Up AI** is an AI-powered learning platform developed as part of a hackathon project. It helps students generate personalized learning roadmaps based on their goals, making the learning process more structured and easier to follow.

This repository contains the frontend application, which provides the user interface and communicates with the backend API.

## Hackathon Project

- **Project:** Level Up AI
- **Project Type:** Hackathon Project
- **Component:** Frontend Application


## Features

- **Interactive User Interface:** A user-friendly interface for interacting with the platform.
- **AI-Powered Learning Experience:** Display personalized learning roadmaps generated through the backend.
- **Backend API Integration:** Communicate with the Level Up AI backend.
- **Authentication Integration:** Support the application's JWT-based authentication flow.
- **Dynamic Suggestions:** Present suggestions to help users with their learning goals.
- **Customizable Themes:** Support different interface themes.
- **Responsive Design:** Designed to work across different screen sizes.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend framework |
| JavaScript | Application development |
| Tailwind CSS | Styling |
| REST API | Backend communication |
| JWT | Authentication integration |

## Project Structure

```text
Level-Up-v2/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   └── ...
├── package.json
└── README.md
```

*The structure above is illustrative. Update it to match the actual repository.*

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Level-Up-v2
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the frontend root directory:

```env
REACT_APP_API_URL=<your-backend-api-url>
```

Make sure the variable name matches the frontend build tool and the API configuration used in your source code.

**Security:** Do not expose private API keys in frontend environment variables. Keep sensitive credentials on the backend.

### 4. Start the Development Server

Using npm:

```bash
npm start
```

Or using Yarn:

```bash
yarn start
```

The development server will display the local URL in the terminal.

### 5. Build for Production

Using npm:

```bash
npm run build
```

Or using Yarn:

```bash
yarn build
```

## Backend Integration

The frontend communicates with the separate Level Up AI backend API for authentication, data operations, and AI-powered learning functionality.

**Backend Repository:** [Add backend repository link here]

## What I Worked On

Through this project, I explored and worked with:

- Building a frontend application using React.js.
- Developing UI components and styling with Tailwind CSS.
- Integrating a frontend application with a backend REST API.
- Connecting frontend authentication flows with JWT-based backend authentication.
- Displaying dynamic data and AI-generated learning roadmaps.
- Building a user interface for a practical AI-powered application.

## Project Purpose

The goal of Level Up AI was to help students move beyond random learning by providing a more structured approach to achieving their educational and career goals.

The hackathon gave me an opportunity to work on a complete application, connecting frontend development with backend services and AI-powered functionality.