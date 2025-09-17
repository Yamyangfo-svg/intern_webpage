'use client'

import { Star, Award, Code2, Zap, Github, Database } from 'lucide-react'
import { motion } from 'framer-motion'

export function Requirements() {
  const requiredSkills = [
    {
      icon: Star,
      title: "Machine Learning & Deep Learning",
      description: "Strong understanding of ML/DL fundamentals, algorithms, and best practices",
      level: "Required"
    },
    {
      icon: Code2,
      title: "ML Frameworks",
      description: "Experience with TensorFlow, PyTorch, or LangChain for building ML applications",
      level: "Required"
    },
    {
      icon: Zap,
      title: "Flowise & Conversational AI",
      description: "Understanding of Flowise, RAG systems, or conversational AI agent development",
      level: "Required"
    },
    {
      icon: Award,
      title: "SSO Protocols",
      description: "Knowledge of OAuth, OpenID, and other Single Sign-On authentication protocols",
      level: "Required"
    }
  ]

  const preferredSkills = [
    {
      icon: Database,
      title: "Production AI Integration",
      description: "Experience integrating AI/ML models into production applications and systems",
      level: "Preferred"
    },
    {
      icon: Github,
      title: "AI/ML Projects Portfolio",
      description: "Prior work on AI/ML projects with GitHub contributions or portfolio demonstrations",
      level: "Preferred"
    },
    {
      icon: Code2,
      title: "API Integration & Data Processing",
      description: "Familiarity with API integration, data preprocessing, and pipeline development",
      level: "Preferred"
    },
    {
      icon: Star,
      title: "Cutting-edge Technology Adoption",
      description: "Eagerness to learn and apply the latest technologies in production environments",
      level: "Preferred"
    }
  ]

  return (
    <section id="requirements" className="section-padding bg-secondary-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Required & Preferred Skills
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            We're looking for passionate individuals with a strong foundation in AI/ML 
            and a desire to work with cutting-edge technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Required Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">Required Skills</h3>
              <p className="text-secondary-600">Essential qualifications for this position</p>
            </div>
            
            <div className="space-y-6">
              {requiredSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md border-l-4 border-primary-600"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 rounded-lg p-2 flex-shrink-0">
                      <skill.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-secondary-900">
                          {skill.title}
                        </h4>
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-secondary-600">{skill.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Preferred Skills */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-secondary-900 mb-2">Preferred Skills</h3>
              <p className="text-secondary-600">Additional qualifications that would be beneficial</p>
            </div>
            
            <div className="space-y-6">
              {preferredSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md border-l-4 border-secondary-400"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary-100 rounded-lg p-2 flex-shrink-0">
                      <skill.icon className="h-5 w-5 text-secondary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-secondary-900">
                          {skill.title}
                        </h4>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-secondary-600">{skill.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}