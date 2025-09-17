'use client'

import { Upload, Brain, Download, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: "Input Your Content",
      description: "Upload documents, paste text, or describe your goals depending on the tool you're using."
    },
    {
      icon: Brain,
      title: "AI Processing",
      description: "Our advanced AI analyzes your input using state-of-the-art natural language processing and machine learning."
    },
    {
      icon: Download,
      title: "Get Results",
      description: "Receive intelligent summaries, personalized paths, or accurate answers tailored to your specific needs."
    }
  ]

  return (
    <section className="section-padding bg-secondary-50">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Getting started with our AI tools is simple. Follow these three easy steps 
            to unlock the power of artificial intelligence for your tasks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
            <div className="flex justify-between items-center">
              <div className="w-8 h-0.5 bg-primary-300"></div>
              <ArrowRight className="h-5 w-5 text-primary-400" />
              <div className="w-8 h-0.5 bg-primary-300"></div>
              <ArrowRight className="h-5 w-5 text-primary-400" />
              <div className="w-8 h-0.5 bg-primary-300"></div>
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg relative z-10">
                <div className="bg-primary-100 rounded-full p-4 w-fit mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-primary-600" />
                </div>
                
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-4">
                  {index + 1}
                </div>
                
                <h3 className="text-xl font-bold text-secondary-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-secondary-600">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600 mb-2">Fast</div>
              <p className="text-secondary-600">Get results in seconds, not hours</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600 mb-2">Accurate</div>
              <p className="text-secondary-600">AI-powered precision and reliability</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600 mb-2">Secure</div>
              <p className="text-secondary-600">Your data is protected and private</p>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary-600 mb-2">24/7</div>
              <p className="text-secondary-600">Available whenever you need it</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}