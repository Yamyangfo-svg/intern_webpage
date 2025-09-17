'use client'

import { useState, useRef, useEffect } from 'react'
import { Upload, MessageSquare, Send, Bot, User, FileText, ArrowLeft, Loader, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export function DocumentQA() {
  const [documents, setDocuments] = useState([])
  const [messages, setMessages] = useState([
    {
      id: '1',
      content: `Hello! I'm your intelligent document assistant with hybrid AI capabilities. Here's how I can help you:

📄 **Document Analysis**: Upload any type of document (PDF, Word, Excel, text files, code, etc.) and I'll analyze the content

🤖 **Hybrid Knowledge**: I combine information from your documents with my comprehensive knowledge base

💬 **Intelligent Q&A**: Ask specific questions about your documents or general topics

🔍 **Smart Search**: I find relevant information and provide source attribution

**Try asking:**
• "What are the main points in this document?"
• "Explain [concept] mentioned in my file"
• "How does this relate to [topic]?"

Upload your documents and start asking questions!`,
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = async (event) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`File ${file.name} is too large. Maximum size is 10MB.`)
        continue
      }

      try {
        const content = await readFileContent(file)
        const newDoc = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          content: content,
          uploadedAt: new Date()
        }

        setDocuments(prev => [...prev, newDoc])
        
        // Add success message
        const successMessage = {
          id: Date.now().toString(),
          content: `✅ Successfully uploaded "${file.name}" (${file.type || 'unknown type'}). You can now ask questions about this document!`,
          role: 'assistant',
          timestamp: new Date()
        }
        setMessages(prev => [...prev, successMessage])
      } catch (error) {
        alert(`Failed to read file ${file.name}`)
      }
    }

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const content = e.target?.result
        resolve(content)
      }
      
      reader.onerror = () => reject(new Error('Failed to read file'))
      
      // Handle different file types
      const fileType = file.type.toLowerCase()
      const fileName = file.name.toLowerCase()
      
      if (
        fileType.includes('text') || 
        fileName.endsWith('.txt') ||
        fileName.endsWith('.md') ||
        fileName.endsWith('.json') ||
        fileName.endsWith('.js') ||
        fileName.endsWith('.ts') ||
        fileName.endsWith('.jsx') ||
        fileName.endsWith('.tsx') ||
        fileName.endsWith('.css') ||
        fileName.endsWith('.html') ||
        fileName.endsWith('.xml') ||
        fileName.endsWith('.csv') ||
        fileName.endsWith('.log') ||
        fileName.endsWith('.py') ||
        fileName.endsWith('.java') ||
        fileName.endsWith('.cpp') ||
        fileName.endsWith('.c') ||
        fileName.endsWith('.php') ||
        fileName.endsWith('.rb') ||
        fileName.endsWith('.go') ||
        fileName.endsWith('.rs') ||
        fileName.endsWith('.sql') ||
        fileName.endsWith('.yaml') ||
        fileName.endsWith('.yml') ||
        fileName.endsWith('.toml') ||
        fileName.endsWith('.ini') ||
        fileName.endsWith('.conf') ||
        fileName.endsWith('.config')
      ) {
        reader.readAsText(file)
      } else if (fileType.includes('pdf')) {
        reader.readAsText(file, 'UTF-8')
      } else if (fileType.includes('word') || fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
        reader.readAsText(file, 'UTF-8')
      } else if (fileType.includes('excel') || fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        reader.readAsText(file, 'UTF-8')
      } else if (fileType.includes('powerpoint') || fileName.endsWith('.pptx') || fileName.endsWith('.ppt')) {
        reader.readAsText(file, 'UTF-8')
      } else {
        reader.readAsText(file, 'UTF-8')
      }
    })
  }

  const getAIResponse = async (userQuestion, docs) => {
    try {
      const response = await fetch('/api/document-qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userQuestion,
          documents: docs || []
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.success) {
        return {
          content: data.response,
          sources: data.sources || [],
          confidence: data.confidence,
          suggestions: data.suggestions || []
        }
      } else {
        throw new Error(data.message || 'Failed to get AI response')
      }
    } catch (error) {
      console.error('AI Response Error:', error)
      return {
        content: `I apologize, but I encountered an error processing your question. This might be due to a temporary issue with the AI service. Please try again, or try rephrasing your question.\n\nFor immediate assistance, you can:\n• Try a simpler or more specific question\n• Check if your documents uploaded correctly\n• Refresh the page and try again`,
        sources: [],
        confidence: 0,
        suggestions: ['Try a simpler question', 'Check document uploads', 'Refresh and try again']
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
      const { content, sources, confidence, suggestions } = await getAIResponse(input.trim(), documents)
      
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: content,
        role: 'assistant',
        timestamp: new Date(),
        sources: sources && sources.length > 0 ? sources : undefined,
        confidence: confidence,
        suggestions: suggestions
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I encountered an error processing your question. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const removeDocument = (docId) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId))
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="section-padding min-h-screen">
      <div className="container-max max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-primary-600 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">
                Document Q&A
              </h1>
            </div>
            <p className="text-xl text-secondary-600">
              Upload any type of document and get intelligent answers with hybrid AI knowledge
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Document Upload Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-lg font-bold text-secondary-900 mb-4">Documents</h2>
              
              {/* Upload Area */}
              <div 
                className="border-2 border-dashed border-secondary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 text-secondary-400 mx-auto mb-2" />
                <p className="text-sm text-secondary-600 mb-1">Click to upload documents</p>
                <p className="text-xs text-secondary-500">All document types up to 10MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {isUploading && (
                <div className="mt-4 flex items-center justify-center">
                  <Loader className="animate-spin h-5 w-5 text-primary-600 mr-2" />
                  <span className="text-sm text-secondary-600">Uploading...</span>
                </div>
              )}

              {/* Document List */}
              <div className="mt-6 space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-secondary-50 rounded-lg p-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <FileText className="h-4 w-4 text-secondary-500 flex-shrink-0" />
                          <p className="text-sm font-medium text-secondary-900 truncate">
                            {doc.name}
                          </p>
                        </div>
                        <p className="text-xs text-secondary-500">
                          {formatFileSize(doc.size)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeDocument(doc.id)}
                        className="text-secondary-400 hover:text-red-500 transition-colors ml-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                {documents.length === 0 && (
                  <p className="text-sm text-secondary-500 text-center py-4">
                    No documents uploaded yet
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-secondary-200 h-[700px] flex flex-col">
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
                      <div className={`flex items-start space-x-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
                          
                          {/* Sources and Confidence */}
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-secondary-200">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-xs font-medium text-secondary-600">Sources:</p>
                                {message.confidence && (
                                  <div className="flex items-center space-x-1">
                                    <div className="w-12 h-1 bg-secondary-200 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full transition-all duration-300 ${
                                          message.confidence > 0.7 ? 'bg-green-500' : 
                                          message.confidence > 0.4 ? 'bg-yellow-500' : 'bg-red-500'
                                        }`}
                                        style={{ width: `${message.confidence * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-secondary-500">{Math.round(message.confidence * 100)}%</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {message.sources.map((source, index) => (
                                  <span 
                                    key={index}
                                    className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-xs"
                                  >
                                    📄 {source}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Suggestions */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-secondary-200">
                              <p className="text-xs font-medium text-secondary-600 mb-2">Try asking:</p>
                              <div className="space-y-1">
                                {message.suggestions.map((suggestion, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setInput(suggestion)}
                                    className="block w-full text-left text-xs bg-secondary-50 hover:bg-secondary-100 text-secondary-700 px-2 py-1 rounded transition-colors"
                                  >
                                    💡 {suggestion}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                          
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
                    <div className="flex items-start space-x-3 max-w-[85%]">
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
                    placeholder="Ask questions about your documents or any topic..."
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
                
                <div className="mt-3 text-sm text-secondary-500">
                  {documents.length > 0 
                    ? `🧠 Enhanced AI ready! I can analyze your ${documents.length} document${documents.length > 1 ? 's' : ''} and combine with general knowledge for intelligent responses. Confidence scores and suggestions included.`
                    : '🤖 Enhanced AI assistant ready! Upload documents for analysis or ask general questions. I provide intelligent responses with confidence scores and helpful suggestions.'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}