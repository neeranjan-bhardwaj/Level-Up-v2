# Level Up AI Frontend  

Level Up AI Frontend is a web application built using **React.js** (or **Next.js**) and styled with **Tailwind CSS**. It connects to the Level Up AI API to provide students with an intuitive interface for generating personalized roadmaps for learning or achieving specific goals.  

## About the Project  

The frontend complements the backend API by offering a user-friendly platform where students can interact with the system. It simplifies the process of generating and visualizing roadmaps, ensuring a seamless experience for users.  

## Features  

- **Interactive UI**: A clean and responsive design for easy navigation.  
- **API Integration**: Connects to the Level Up AI API for roadmap generation.  
- **Secure Authentication**: Supports JWT-based authentication for user sessions.  
- **Dynamic Suggestions**: Provides real-time suggestions to enhance user experience.  
- **Customizable Themes**: Allows users to personalize the look and feel of the app.  

## How to Use  

1. Clone the repository:  
    ```bash
    git clone <repository-url>
    cd Level-Up-v2
    ```  
    This command clones the repository to your local machine and navigates into the project directory.  

2. Install dependencies:  
    ```bash
    npm install
    ```  
    or  
    ```bash
    yarn install
    ```  
    This installs all the required dependencies for the project.  

3. Set up environment variables:  
    Create a `.env.local` file in the root directory and configure the following variables:  
    ```plaintext
    REACT_APP_API_URL=<your-backend-api-url>
    REACT_APP_GOOGLE_API_KEY=<your-google-api-key>
    ```  
    This step ensures the application can connect to the backend API and interact with external services.  

4. Start the development server:  
    ```bash
    npm start
    ```  
    or  
    ```bash
    yarn start
    ```  
    This launches the development server, making the application accessible at `http://localhost:3000`.  

5. Build for production:  
    ```bash
    npm run build
    ```  
    or  
    ```bash
    yarn build
    ```  
    This creates an optimized production build of the application.  

> **Note**: This is only the frontend application. The backend API for this project is hosted in a separate repository. Both are live and can be accessed here:  
- [Backend Repository](#)  
- [Live Demo](#)  

> **Note**: Authentication functionality is fully implemented on the backend, while the frontend authentication is currently operational but still being refined.