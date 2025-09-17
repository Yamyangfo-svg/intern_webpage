'use client'

import { motion } from 'framer-motion'

export function Technologies() {
  const technologies = [
    {
      category: "AI/ML Frameworks",
      items: [
        { name: "TensorFlow", description: "End-to-end ML platform" },
        { name: "PyTorch", description: "Dynamic neural networks" },
        { name: "LangChain", description: "LLM application framework" },
        { name: "Flowise", description: "Visual AI workflow builder" }
      ]
    },
    {
      category: "Authentication & Security",
      items: [
        { name: "OAuth 2.0", description: "Authorization framework" },
        { name: "OpenID Connect", description: "Identity layer" },
        { name: "JWT", description: "JSON Web Tokens" },
        { name: "SSO Solutions", description: "Single Sign-On systems" }
      ]
    },
    {
      category: "AI Technologies",
      items: [
        { name: "RAG Systems", description: "Retrieval-Augmented Generation" },
        { name: "Vector Databases", description: "Semantic search" },
        { name: "Conversational AI", description: "Intelligent chatbots" },
        { name: "LLM Integration", description: "Large Language Models" }
      ]
    },
    {
      category: "Development Tools",
      items: [
        { name: "Python", description: "Primary development language" },
        { name: "JavaScript/TypeScript", description: "Frontend development" },
        { name: "REST APIs", description: "Service integration" },
        { name: "Git", description: "Version control" }
      ]
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Technologies You'll Work With
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Get hands-on experience with the latest and most popular technologies 
            in the AI/ML ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 text-center">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.items.map((tech, techIndex) => (
                  <div key={techIndex} className="text-center">
                    <div className="bg-primary-50 rounded-lg p-3 mb-2">
                      <h4 className="font-medium text-secondary-900">{tech.name}</h4>
                    </div>
                    <p className="text-sm text-secondary-600">{tech.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}