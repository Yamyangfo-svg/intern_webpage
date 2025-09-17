'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function QAInterface() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: 'Hello! I\'m your AI assistant for the AI/ML + Flowise Intern position. I can answer questions about the role responsibilities, requirements, technologies, application process, and more. What would you like to know?',
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = async (userQuestion) => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    const lowerQuestion = userQuestion.toLowerCase()

    // Role-specific knowledge base
    if (lowerQuestion.includes('responsibility') || lowerQuestion.includes('duties') || lowerQuestion.includes('what will i do')) {
      return `As an AI/ML + Flowise Intern, your main responsibilities include:

• **Building AI Agents**: You'll work with Flowise and similar frameworks to create intelligent conversational agents and automated workflows
• **AI/ML Integration**: Develop machine learning solutions that enhance user experience and embed intelligent features into our platform
• **SSO Implementation**: Set up secure authentication systems using OAuth, OpenID, and other Single Sign-On protocols
• **Team Collaboration**: Work closely with developers to integrate AI/ML APIs and models into existing systems
• **Documentation & Research**: Contribute to technical documentation and research new AI-powered functionalities

This role offers hands-on experience with cutting-edge AI technologies in a production environment!`
    }

    if (lowerQuestion.includes('requirement') || lowerQuestion.includes('skill') || lowerQuestion.includes('qualification')) {
      return `Here are the key requirements for the AI/ML + Flowise Intern position:

**Required Skills:**
• Strong understanding of machine learning and deep learning fundamentals
• Experience with TensorFlow, PyTorch, or LangChain
• Understanding of Flowise, RAG (Retrieval-Augmented Generation), or conversational AI agents
• Knowledge of SSO protocols (OAuth, OpenID)

**Preferred Skills:**
• Experience integrating AI into production applications
• Prior work on AI/ML projects or GitHub contributions
• Familiarity with API integration and data preprocessing
• Eagerness to learn cutting-edge technologies

We're looking for passionate individuals who want to work at the forefront of AI innovation!`
    }

    if (lowerQuestion.includes('technology') || lowerQuestion.includes('tools') || lowerQuestion.includes('framework')) {
      return `You'll work with an exciting range of cutting-edge technologies:

**AI/ML Frameworks:**
• TensorFlow & PyTorch for deep learning
• LangChain for LLM applications
• Flowise for visual AI workflow building

**AI Technologies:**
• RAG (Retrieval-Augmented Generation) systems
• Vector databases for semantic search
• Conversational AI and chatbot development
• Large Language Model integration

**Authentication & Security:**
• OAuth 2.0 and OpenID Connect
• JWT tokens and SSO solutions

**Development Tools:**
• Python for AI/ML development
• JavaScript/TypeScript for frontend
• REST APIs for service integration
• Git for version control

This tech stack will give you comprehensive experience across the AI/ML ecosystem!`
    }

    // General questions
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi') || lowerQuestion.includes('hey')) {
      return `Hello! Great to meet you! I'm here to help you learn everything about the AI/ML + Flowise Intern position. 

I can answer questions about:
• Role responsibilities and daily tasks
• Required and preferred skills
• Technologies and tools you'll use
• Application process and tips
• Company culture and growth opportunities
• Specific topics like Flowise, RAG, LangChain, or SSO

What would you like to know about this exciting opportunity in AI/ML?`
    }

    if (lowerQuestion.includes('thank') || lowerQuestion.includes('thanks')) {
      return `You're very welcome! I'm glad I could help you learn more about the AI/ML + Flowise Intern position. 

If you have any more questions about the role, technologies, application process, or anything else related to this opportunity, feel free to ask anytime. 

Good luck with your application - this is an exciting time to be entering the AI/ML field! 🚀`
    }

    // Default response for unmatched questions
    return `That's a great question! While I have extensive knowledge about the AI/ML + Flowise Intern position, I want to make sure I give you the most accurate information.

**For questions about this role, I can help with:**
• Responsibilities and daily tasks
• Required skills and qualifications  
• Technologies like Flowise, LangChain, TensorFlow, PyTorch
• AI concepts like RAG, conversational AI, and LLM integration
• SSO and authentication protocols
• Application process and requirements

**If your question is about something specific not covered above, you might want to:**
• Contact our HR team directly at careers@company.com
• Check our company website for additional details
• Ask during the interview process

Is there anything specific about the role, technologies, or application process you'd like me to explain further?`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await getAIResponse(input.trim())
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I encountered an error processing your question. Please try again or contact our team directly.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="section-padding min-h-screen">
      <div className="container-max max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-primary-600 p-3 rounded-full">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">
                AI Assistant
              </h1>
            </div>
            <p className="text-xl text-secondary-600">
              Ask me anything about the AI/ML + Flowise Intern position
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`p-2 rounded-full flex-shrink-0 ${message.role === 'user' ? 'bg-primary-600' : 'bg-secondary-600'}`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-white" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    {/* Message */}
                    <div className={`rounded-2xl p-4 ${message.role === 'user' ? 'bg-primary-600 text-white' : 'bg-secondary-100 text-secondary-900'}`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-100' : 'text-secondary-500'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="p-2 rounded-full flex-shrink-0 bg-secondary-600">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-secondary-100 rounded-2xl p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <div className="border-t border-secondary-200 p-6">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about the role, requirements, technologies..."
                className="flex-1 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-300 text-white p-3 rounded-lg transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Suggested Questions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "What are the main responsibilities of this role?",
              "What technologies will I work with?",
              "What are the requirements for this position?",
              "How do I apply for this internship?",
              "What is Flowise and how is it used?",
              "Tell me about RAG systems"
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="text-left p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors text-secondary-700 hover:text-secondary-900"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}