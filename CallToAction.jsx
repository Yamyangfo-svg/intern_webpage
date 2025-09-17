'use client'

import { ArrowRight, FileText, MapPin, MessageSquare, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function CallToAction() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Boost Your Productivity?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Join thousands of users who are already leveraging the power of AI to 
            streamline their work, accelerate learning, and unlock insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: FileText,
              title: "Text Summarizer",
              description: "Transform long texts into concise summaries",
              href: "/summarize"
            },
            {
              icon: MapPin,
              title: "Path Generator",
              description: "Create personalized learning roadmaps",
              href: "/path-generator"
            },
            {
              icon: MessageSquare,
              title: "Document Q&A",
              description: "Get intelligent answers from your documents",
              href: "/document-qa"
            }
          ].map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                href={tool.href}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 block hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="bg-white/20 rounded-lg p-3 w-fit mb-4 group-hover:bg-white/30 transition-colors">
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
                <p className="text-primary-100 text-sm mb-4">{tool.description}</p>
                <div className="flex items-center text-white group-hover:translate-x-1 transition-transform">
                  <span className="text-sm font-medium">Try it now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Get Started Today
            </h3>
            <p className="text-primary-100 mb-6">
              No registration required. Start using our AI tools immediately and 
              experience the difference intelligent automation can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/summarize" 
                className="bg-white text-primary-600 hover:bg-primary-50 font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Start with Text Summarizer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/guide" 
                className="bg-white/20 hover:bg-white/30 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center border border-white/30"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Read User Guide
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}