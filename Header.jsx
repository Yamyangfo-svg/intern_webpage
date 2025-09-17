'use client'

import { useState } from 'react'
import { Brain, Menu, X, BookOpen } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-secondary-200 sticky top-0 z-50">
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary-600 p-2 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-secondary-900">AI Suite</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/summarize" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
            >
              Text Summarizer
            </Link>
            <Link 
              href="/path-generator" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
            >
              Path Generator
            </Link>
            <Link 
              href="/document-qa" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
            >
              Document Q&A
            </Link>
            <Link 
              href="/guide" 
              className="text-secondary-600 hover:text-primary-600 font-medium transition-colors flex items-center"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              Guide
            </Link>
            <Link 
              href="#features" 
              className="btn-primary"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-secondary-600" />
            ) : (
              <Menu className="h-6 w-6 text-secondary-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/summarize" 
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Text Summarizer
              </Link>
              <Link 
                href="/path-generator" 
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Path Generator
              </Link>
              <Link 
                href="/document-qa" 
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Document Q&A
              </Link>
              <Link 
                href="/guide" 
                className="text-secondary-600 hover:text-primary-600 font-medium transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                User Guide
              </Link>
              <Link 
                href="#features" 
                className="btn-primary w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}