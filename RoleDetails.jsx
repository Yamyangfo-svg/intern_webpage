'use client'

import { Users, Code, Shield, BookOpen, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function RoleDetails() {
  const responsibilities = [
    {
      icon: Code,
      title: "Build and integrate AI agents using Flowise or similar frameworks",
      description: "Design and implement intelligent conversational agents and automated workflows"
    },
    {
      icon: Users,
      title: "Work on AI/ML use cases to embed intelligent features into the platform",
      description: "Develop machine learning solutions that enhance user experience and platform capabilities"
    },
    {
      icon: Shield,
      title: "Implement and manage Single Sign-On (SSO)",
      description: "Set up secure authentication systems using OAuth, OpenID, and other SSO protocols"
    },
    {
      icon: Users,
      title: "Collaborate with developers for AI/ML API/model integrations",
      description: "Work with cross-functional teams to integrate AI models and APIs into existing systems"
    },
    {
      icon: BookOpen,
      title: "Contribute to documentation and research of AI-powered functionalities",
      description: "Document processes, research new technologies, and create technical guides"
    }
  ]

  return (
    <section id="role" className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Role Responsibilities
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            As an AI/ML + Flowise Intern, you'll be at the forefront of AI innovation, 
            working on cutting-edge projects that make a real impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {responsibilities.map((responsibility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 rounded-lg p-3 flex-shrink-0">
                  <responsibility.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                    {responsibility.title}
                  </h3>
                  <p className="text-secondary-600">
                    {responsibility.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Hands-on Experience</h3>
              <p className="text-secondary-600">Work on real-world AI projects with immediate impact</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Mentorship</h3>
              <p className="text-secondary-600">Learn from experienced AI/ML engineers and researchers</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Career Growth</h3>
              <p className="text-secondary-600">Build a strong foundation for your AI/ML career</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}