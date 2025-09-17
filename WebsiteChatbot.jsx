'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, Bot, User, X, Minimize2, Maximize2, HelpCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function WebsiteChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: `👋 Hi! I'm your AI Suite Website Assistant! 

I'm here to help you navigate and make the most of our AI-powered tools:

🤖 **Ask me about:**
• Text Summarizer features and usage
• Path Generator for learning roadmaps  
• Document Q&A capabilities
• Website navigation and tips
• Technical details and best practices

**Quick Start Questions:**
• "How do I use the Text Summarizer?"
• "What can Document Q&A do?"
• "Show me around the website"

What would you like to explore first?`,
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

  const sendMessage = async (userMessage) => {
    try {
      const response = await fetch('/api/website-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        return {
          content: data.response,
          suggestions: data.suggestions || []
        }
      } else {
        throw new Error(data.message || 'Failed to get response')
      }
    } catch (error) {
      console.error('Website Chat Error:', error)
      return {
        content: `I apologize, but I'm having trouble connecting right now. Here are some things I can help you with when I'm back online:

🔧 **Feature Help:**
• Text Summarizer - Condense long texts
• Path Generator - Create learning roadmaps
• Document Q&A - Analyze uploaded files

🧭 **Navigation:**
• Use the header menu to switch between tools
• Each page has a "Back to Home" link
• All features are mobile-friendly

Try asking me again in a moment, or explore the features directly!`,
        suggestions: ['Try again', 'Visit Text Summarizer', 'Check Document Q&A', 'Go to Path Generator']
      }
    }
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
      const { content, suggestions } = await sendMessage(input.trim())
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: content,
        role: 'assistant',
        timestamp: new Date(),
        suggestions: suggestions
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I encountered an error. Please try again or refresh the page.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
  }

  const quickQuestions = [
    "What are the main features?",
    "How do I use Text Summarizer?",
    "Tell me about Document Q&A",
    "Show me navigation tips"
  ]

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group"
          aria-label="Open Website Assistant"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            <HelpCircle className="h-3 w-3" />
          </div>
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        height: isMinimized ? 60 : 500
      }}
      className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-secondary-200 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white/20 p-1 rounded-full">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium text-sm">Website Assistant</h3>
            <p className="text-xs text-primary-100">AI Suite Guide</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col h-96"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`p-1.5 rounded-full flex-shrink-0 ${message.role === 'user' ? 'bg-primary-600' : 'bg-secondary-600'}`}>
                      {message.role === 'user' ? (
                        <User className="h-3 w-3 text-white" />
                      ) : (
                        <Bot className="h-3 w-3 text-white" />
                      )}
                    </div>
                    
                    {/* Message */}
                    <div className={`rounded-xl p-3 text-sm ${message.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white text-secondary-900 border border-secondary-200'}`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-secondary-200">
                          <div className="space-y-1">
                            {message.suggestions.slice(0, 3).map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-left text-xs bg-secondary-50 hover:bg-secondary-100 text-secondary-700 px-2 py-1 rounded transition-colors"
                              >
                                💡 {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-primary-100' : 'text-secondary-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-[85%]">
                    <div className="p-1.5 rounded-full flex-shrink-0 bg-secondary-600">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-secondary-200">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 bg-white border-t border-secondary-200">
                <p className="text-xs text-secondary-600 mb-2">Quick questions:</p>
                <div className="space-y-1">
                  {quickQuestions.slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(question)}
                      className="block w-full text-left text-xs bg-secondary-50 hover:bg-secondary-100 text-secondary-700 px-2 py-1 rounded transition-colors"
                    >
                      ❓ {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <div className="border-t border-secondary-200 p-3 bg-white">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about features, navigation, tips..."
                  className="flex-1 px-3 py-2 text-sm border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-primary-600 hover:bg-primary-700 disabled:bg-secondary-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}