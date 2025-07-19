'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

/**
 * AI Chatbot Component - Chat Interface Only (Next.js TypeScript)
 * 
 * A clean, professional chatbot interface with dark mode
 * Features:
 * - ChatGPT-like dark mode interface
 * - Responsive design for all screen sizes
 * - Java roadmap responses (easily customizable)
 * - Clean API integration points for future implementation
 * - Professional chat UI with typing indicators
 * - Message management
 * - Full TypeScript support
 */

// Types
interface ChatMessage {
  id: number;
  text: string | JavaRoadmapData;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface JavaRoadmapPhase {
  phase: string;
  topics: string[];
}

interface JavaRoadmapData {
  title: string;
  phases: JavaRoadmapPhase[];
  tips: string[];
  error?: string;
}

interface ApiResponse {
  success: boolean;
  response?: JavaRoadmapData;
  error?: string;
  sessionId: string | number;
}

// Mock data - Java Roadmap (easily replaceable with API data)
const JAVA_ROADMAP: JavaRoadmapData = {
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
    "🎯 Focus on understanding concepts rather than memorizing syntax"
  ]
};

const ChatBot: React.FC = () => {
  // Chat state management
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Refs for DOM manipulation
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  /**
   * API Integration Points
   * Replace these functions with actual API calls when backend is ready
   */
  
  /**
   * Send message to backend API
   * @param message - User's message
   * @returns API response with bot's reply
   */
  const formatJsonString=(input: string): string=> {
    if (!input || typeof input !== 'string') {
      return input;
    }
  
    // Remove ```json at the beginning (case insensitive)
    let cleaned = input.replace(/^```json\s*/i, '');
    
    // Remove ``` at the end
    cleaned = cleaned.replace(/\s*```$/, '');
    
    // Trim any extra whitespace
    cleaned = cleaned.trim();
    
    return cleaned;
  }
  
  /**
   * Format JSON string and parse it to an object
   * Returns null if parsing fails
   */
  function parseCleanedJson<T = any>(input: string): T | null {
    try {
      const cleaned = formatJsonString(input);
      return JSON.parse(cleaned) as T;
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return null;
    }
  }
  const sendMessageToAPI = async (message: string): Promise<ApiResponse> => {
    try {
      // TODO: Replace with actual API call
      
      const response = await fetch('http://localhost:3300/Roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}` // Add if authentication needed
        },
        body: JSON.stringify({
          query: message,
          userId: 'current-user-id', // Add user identification if needed
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const Cleandata= parseCleanedJson(data.message) ;
    console.log('API Result:', Cleandata);

      return {
        success: true,
        response: Cleandata.Message ? Cleandata.Message : Cleandata,
        sessionId: data.sessionId
      };
      

      // // Mock API response - remove this when implementing real API
      // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      // return {
      //   success: true,
      //   response: JAVA_ROADMAP,
      //   sessionId: 1
      // };
      
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: 'Failed to get response. Please try again.',
        sessionId: 1
      };
    }
  };

  /**
   * Event Handlers
   */
  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Send to API and get response
    const apiResult = await sendMessageToAPI(inputMessage);
    // console.log('API Result:', apiResult);
    
    // Create bot response message
    const botMessage: ChatMessage = {
      id: Date.now() + 1,
      text: apiResult.success ? apiResult.response! : { error: apiResult.error!, title: '', phases: [], tips: [] },
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Add bot response to chat
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Render Functions
   */
  const renderRoadmap = (roadmap: JavaRoadmapData)=> {
    if (roadmap.error) {
      return (
        <div className="text-red-400 p-4 bg-red-900/20 rounded-lg border border-red-800">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-red-500">⚠️</span>
            <span className="font-medium">Error</span>
          </div>
          <p>{roadmap.error}</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">{roadmap.title}</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
        </div>
        
        {roadmap.phases.map((phase, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-colors">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <h4 className="text-lg font-semibold text-blue-400">{phase.phase}</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {phase.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="flex items-center text-gray-300 py-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl p-5 border border-green-700/50">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">💡</span>
            <h4 className="text-lg font-semibold text-green-400">Pro Tips for Success</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roadmap.tips.map((tip, index) => (
              <div key={index} className="flex items-start text-gray-300">
                <span className="text-green-500 mr-2 flex-shrink-0">•</span>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderMessage = (message: ChatMessage)=> (
    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-4xl w-full ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            message.sender === 'user' 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
              : 'bg-gradient-to-r from-green-500 to-green-600'
          }`}>
            {message.sender === 'user' ? 
              <User size={16} className="text-white" /> : 
              <Bot size={16} className="text-white" />
            }
          </div>
        </div>
        
        {/* Message Content */}
        <div className={`flex flex-col ${message.sender === 'user' ? 'items-end' : 'items-start'} flex-1`}>
          <div className={`rounded-2xl px-4 py-3 max-w-full ${
            message.sender === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-100 border border-gray-600'
          }`}>
            {message.sender === 'user' ? (
              <p className="whitespace-pre-wrap break-words">{message.text as string}</p>
            ) : (
              <div className="prose prose-invert max-w-none">
                {typeof message.text === 'object' ? renderRoadmap(message.text) : 
                  <p className="whitespace-pre-wrap break-words m-0">{message.text}</p>}
              </div>
            )}
          </div>
          <span className="text-xs text-gray-500 mt-1 px-2">{message.timestamp}</span>
        </div>
      </div>
    </div>
  );

  const handleTextareaResize = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Header */}
        <header className="flex items-center justify-center h-16 px-4 bg-gray-800 border-b border-gray-700 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h1 className="text-lg font-medium">Levle-UP AI</h1>
          </div>
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 py-6">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mb-6">
                  <Bot size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-3">Welcome to Learning Assistant</h2>
                <p className="text-gray-400 max-w-md mb-8">
                  Ask me anything about programming and I&apos;ll provide you with comprehensive learning roadmaps, 
                  coding guidance, and best practices to help you master Java development.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                  <button
                    onClick={() => setInputMessage("How do I start learning Java?")}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors border border-gray-700"
                  >
                    <span className="text-sm">🚀 How do I start learning Java?</span>
                  </button>
                  <button
                    onClick={() => setInputMessage("Show me Java roadmap")}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-left transition-colors border border-gray-700"
                  >
                    <span className="text-sm">📚 Show me MERN Stack roadmap</span>
                  </button>
                </div>
              </div>
            )}
            
            {messages.map(renderMessage)}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start mb-6">
                <div className="flex max-w-4xl w-full">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                  </div>
                  <div className="bg-gray-700 border border-gray-600 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 p-4 border-t border-gray-700 bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onInput={handleTextareaResize}
                  placeholder="Ask me about Java programming, frameworks, best practices..."
                  className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[44px] max-h-32"
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '44px'
                  }}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-colors flex items-center justify-center min-w-[44px]"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Press Enter to send, Shift + Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;