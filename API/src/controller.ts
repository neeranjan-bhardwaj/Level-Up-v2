import type{ Request, Response } from 'express';
import { GoogleGenAI} from "@google/genai";

const genAI = new GoogleGenAI({apiKey:'AIzaSyBIw0do3MFlZabQTNa_ISryw9dk4uon6Lw'}) ;
// const chat = model.startChat({
//     history: [
//     {
//         role: "user",
//         parts: [{ text: "Hello" }],
//     },
//     {
//         role: "model",
//         parts: [{ text: "Great to meet you. What would you like to know?" }],
//     },
//     ],
// });

async function generateContent(query: string): Promise<string|undefined> {
    const response = await genAI.models.generateContent({
        model: "gemini-2.0-flash",
        contents: query,
        config:{
            systemInstruction:`you are and ai that only make roadmap or quection "how to " by make roadmap of the proble to slove how to . if any thing other then roadmap or not related to roadmap is req you say 'i can not help with that' in json formate {Message:"I can not help with that"}. here is you digram for roadmap 
            title: string;
            phases: JavaRoadmapPhase[];
            tips: string[];
            and her is an ex roadmap of java 
            title: "🚀 Complete Java Developer Roadmap 2024",
  phases: [
    {
      phase: "Phase 1: Java Fundamentals (2-3 months)",
      topics: [
        "Java Syntax and Basic Concepts",
        "Variables, Data Types, and Operators",
        "Control Statements (if-else, loops)",
        "Methods and Functions",
        "Object-Oriented Programming (OOP)",
        "Classes, Objects, Inheritance",
        "Polymorphism and Encapsulation",
        "Exception Handling"
      ]
    },
    {
      phase: "Phase 2: Advanced Java (2-3 months)",
      topics: [
        "Collections Framework (List, Set, Map)",
        "Generics and Lambda Expressions",
        "Stream API and Functional Programming",
        "File I/O and Serialization",
        "Multithreading and Concurrency",
        "Reflection API",
        "Annotations",
        "Design Patterns"
      ]
    },
    {
      phase: "Phase 3: Database & Backend (2-3 months)",
      topics: [
        "SQL and Database Concepts",
        "JDBC (Java Database Connectivity)",
        "Hibernate ORM Framework",
        "Spring Framework Basics",
        "Spring Boot",
        "RESTful Web Services",
        "Spring Security",
        "Microservices Architecture"
      ]
    },
    {
      phase: "Phase 4: Web Development (2-3 months)",
      topics: [
        "HTML, CSS, JavaScript Basics",
        "Servlet and JSP",
        "Spring MVC",
        "Thymeleaf Template Engine",
        "Frontend Frameworks (React/Angular)",
        "Build Tools (Maven/Gradle)",
        "Version Control (Git)",
        "Testing (JUnit, Mockito)"
      ]
    },
    {
      phase: "Phase 5: Advanced Topics (2-3 months)",
      topics: [
        "Cloud Platforms (AWS/Azure)",
        "Docker and Containerization",
        "Kubernetes Basics",
        "Message Queues (RabbitMQ/Kafka)",
        "Caching (Redis)",
        "Performance Optimization",
        "System Design Concepts",
        "DevOps and CI/CD"
      ]
    }
  ],
  tips: [
    "💻 Practice coding daily on platforms like LeetCode and HackerRank",
    "🛠️ Build real projects to apply your knowledge",
    "🌟 Contribute to open-source projects on GitHub",
    "👥 Join Java communities and forums (Stack Overflow, Reddit)",
    "📚 Stay updated with latest Java versions and features",
    "🎯 Focus on understanding concepts rather than memorizin 
    `
        }
    });
    return response.text
}

export async function getRoadmap(req: Request, res: Response): Promise<void> {
    try{
        const user:string|undefined=res.locals.user
        const query:string = req.body.query;
        if(!query) throw 'can not find query in request body';
        console.log(query);
        const response = await generateContent(query);
        console.log(response);
        console.log("Roadmap API called");
        res.json({ message: response });
    }catch(err){
        if(err instanceof Error){
            res.json({ message: err.message });
            console.log(err.message);
        }
        if(typeof err === 'string'){
            res.json({ message: err });
            console.log(err);
        }
    }
}