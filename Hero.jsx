'use client'

import { ArrowRight, FileText, MapPin, MessageSquare, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-secondary-50 section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-1 rounded">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-primary-600 font-medium">AI-Powered Tools</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
              AI Suite for{' '}
              <span className="text-primary-600">Productivity</span>
            </h1>
            
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Transform your workflow with our comprehensive AI toolkit. Summarize lengthy documents, 
              generate personalized learning paths, and get intelligent answers from your documents 
              and beyond.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link href="#features" className="btn-primary flex items-center">
                Explore Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/guide" className="btn-secondary flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                User Guide
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-secondary-200">
              <div>
                <div className="text-2xl font-bold text-secondary-900">3</div>
                <div className="text-secondary-600">AI Tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">24/7</div>
                <div className="text-secondary-600">Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary-900">Smart</div>
                <div className="text-secondary-600">AI Responses</div>
              </div>
            </div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              {/* AI Tools Preview */}
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-primary-50 rounded-xl p-6 text-center">
                  <FileText className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-secondary-900">Text Summarizer</h3>
                  <p className="text-sm text-secondary-600">Instantly summarize long texts</p>
                </div>
                <div className="bg-secondary-50 rounded-xl p-6 text-center">
                  <MapPin className="h-12 w-12 text-secondary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-secondary-900">Path Generator</h3>
                  <p className="text-sm text-secondary-600">Create learning roadmaps</p>
                </div>
                <div className="bg-primary-50 rounded-xl p-6 text-center">
                  <MessageSquare className="h-12 w-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-secondary-900">Document Q&A</h3>
                  <p className="text-sm text-secondary-600">Ask questions about documents</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-primary-600 rounded-full p-3">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-secondary-600 rounded-full p-3">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}