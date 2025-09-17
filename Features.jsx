'use client'

import { FileText, MapPin, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function Features() {
  const features = [
    {
      icon: FileText,
      title: "Text Summarizer",
      description: "Transform lengthy documents, articles, and texts into concise, easy-to-understand summaries. Perfect for research, studying, and quick information processing.",
      capabilities: [
        "Summarize any length of text",
        "Maintain key information and context",
        "Adjustable summary length",
        "Multiple summary formats"
      ],
      href: "/summarize",
      guide: "Learn how to use the Text Summarizer effectively",
      color: "primary"
    },
    {
      icon: MapPin,
      title: "Path Generator",
      description: "Create personalized learning and career roadmaps based on your specific goals. Get step-by-step guidance tailored to your objectives and current skill level.",
      capabilities: [
        "Goal-based path creation",
        "Skill assessment integration",
        "Timeline recommendations",
        "Resource suggestions"
      ],
      href: "/path-generator",
      guide: "Discover how to create effective learning paths",
      color: "secondary"
    },
    {
      icon: MessageSquare,
      title: "Document Q&A",
      description: "Upload any type of document and ask intelligent questions. Get accurate answers from your documents plus additional context from our AI's vast knowledge base.",
      capabilities: [
        "Upload any document format (PDF, Word, Excel, TXT, etc.)",
        "Hybrid knowledge system",
        "Contextual understanding",
        "Follow-up questions support"
      ],
      href: "/document-qa",
      guide: "Master the Document Q&A system",
      color: "primary"
    }
  ]

  return (
    <section id="features" className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            Powerful AI Tools at Your Fingertips
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Our comprehensive AI suite provides everything you need to enhance productivity, 
            accelerate learning, and unlock insights from your documents.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="flex-1">
                  <div className={`bg-${feature.color}-100 rounded-lg p-3 w-fit mb-6`}>
                    <feature.icon className={`h-8 w-8 text-${feature.color}-600`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-secondary-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-secondary-600 mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-secondary-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <li key={capIndex} className="flex items-start space-x-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-600 mt-2 flex-shrink-0`}></div>
                          <span className="text-sm text-secondary-600">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <Link 
                      href="/guide" 
                      className={`text-sm text-${feature.color}-600 hover:text-${feature.color}-700 font-medium flex items-center`}
                    >
                      {feature.guide}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </div>
                
                <Link 
                  href={feature.href}
                  className={`btn-${feature.color} flex items-center justify-center group-hover:scale-[1.02] transition-transform`}
                >
                  Try {feature.title}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}