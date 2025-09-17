import { Brain, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-secondary-900 text-secondary-300">
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AI Suite</span>
            </div>
            <p className="text-secondary-400 mb-4">
              Powerful AI tools for text summarization, learning path generation, 
              and intelligent document Q&A. Enhance your productivity with 
              cutting-edge artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                className="text-secondary-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                className="text-secondary-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:careers@company.com" 
                className="text-secondary-400 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">AI Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/summarize" className="text-secondary-400 hover:text-white transition-colors">
                  Text Summarizer
                </Link>
              </li>
              <li>
                <Link href="/path-generator" className="text-secondary-400 hover:text-white transition-colors">
                  Path Generator
                </Link>
              </li>
              <li>
                <Link href="/document-qa" className="text-secondary-400 hover:text-white transition-colors">
                  Document Q&A
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-secondary-400">
              <li>support@aisuite.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 mt-8 pt-8 text-center text-secondary-400">
          <p>&copy; 2024 AI Suite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}