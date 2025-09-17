'use client'

import { ArrowRight, Mail, FileText, User } from 'lucide-react'
import { motion } from 'framer-motion'

export function ApplicationSection() {
  return (
    <section id="apply" className="section-padding bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Join Our AI Team?
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            Take the next step in your AI/ML career. Apply now and start building 
            the future of intelligent applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Application Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Application Process</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-full p-2 flex-shrink-0">
                  <User className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">1. Submit Application</h4>
                  <p className="text-primary-100">Send your resume and cover letter highlighting your AI/ML experience</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-full p-2 flex-shrink-0">
                  <FileText className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">2. Technical Assessment</h4>
                  <p className="text-primary-100">Complete a practical AI/ML project or coding challenge</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-white rounded-full p-2 flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">3. Interview</h4>
                  <p className="text-primary-100">Technical and cultural fit interview with our AI team</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-bold text-secondary-900 mb-6">Apply Now</h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  GitHub/Portfolio URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="https://github.com/yourusername"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Why are you interested in this role?
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Tell us about your interest in AI/ML and this position..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                Submit Application
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}