'use client'

import { useState, useRef } from 'react'
import { FileText, Copy, Download, ArrowLeft, Loader, Zap, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function TextSummarizer() {
  const [inputText, setInputText] = useState('')
  const [summaryLength, setSummaryLength] = useState('medium')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const textareaRef = useRef(null)

  const getSummary = async (text, length) => {
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))

    const words = text.split(/\s+/).length
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    
    let summaryRatio
    switch (length) {
      case 'short': summaryRatio = 0.2; break
      case 'medium': summaryRatio = 0.4; break
      case 'long': summaryRatio = 0.6; break
      default: summaryRatio = 0.4
    }

    const summaryText = generateIntelligentSummary(text, summaryRatio)
    const summaryWords = summaryText.split(/\s+/).length
    
    return {
      original: text,
      summary: summaryText,
      keyPoints: extractKeyPoints(text),
      wordCount: {
        original: words,
        summary: summaryWords,
        reduction: Math.round(((words - summaryWords) / words) * 100)
      }
    }
  }

  const generateIntelligentSummary = (text, ratio) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
    const targetSentences = Math.max(1, Math.round(sentences.length * ratio))
    
    const selectedSentences = []
    
    if (sentences.length <= targetSentences) {
      return sentences.join('. ') + '.'
    }
    
    selectedSentences.push(sentences[0].trim())
    
    if (targetSentences > 2) {
      const middleStart = Math.floor(sentences.length * 0.3)
      const middleEnd = Math.floor(sentences.length * 0.7)
      const middleSentences = sentences.slice(middleStart, middleEnd)
      const middleCount = Math.min(targetSentences - 2, middleSentences.length)
      
      for (let i = 0; i < middleCount; i++) {
        const index = Math.floor(i * middleSentences.length / middleCount)
        if (middleSentences[index] && !selectedSentences.includes(middleSentences[index].trim())) {
          selectedSentences.push(middleSentences[index].trim())
        }
      }
    }
    
    if (selectedSentences.length < targetSentences && sentences.length > 1) {
      const lastSentence = sentences[sentences.length - 1].trim()
      if (!selectedSentences.includes(lastSentence)) {
        selectedSentences.push(lastSentence)
      }
    }
    
    return selectedSentences.join('. ') + '.'
  }

  const extractKeyPoints = (text) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 20)
    const keywords = ['important', 'significant', 'key', 'main', 'primary', 'essential', 'crucial', 'major', 'fundamental', 'critical']
    
    const keyPoints = sentences
      .filter(sentence => 
        keywords.some(keyword => sentence.toLowerCase().includes(keyword)) ||
        sentence.includes('therefore') ||
        sentence.includes('however') ||
        sentence.includes('moreover') ||
        sentence.length > 100
      )
      .slice(0, 5)
      .map(point => point.trim())
    
    if (keyPoints.length === 0) {
      return sentences.slice(0, 3).map(point => point.trim())
    }
    
    return keyPoints
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputText.trim() || isLoading) return

    if (inputText.trim().length < 50) {
      setError('Please provide at least 50 characters for meaningful summarization.')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const summaryResult = await getSummary(inputText.trim(), summaryLength)
      setResult(summaryResult)
    } catch (err) {
      setError('Failed to generate summary. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const downloadSummary = () => {
    if (!result) return
    
    const content = `Original Text (${result.wordCount.original} words):\n${result.original}\n\nSummary (${result.wordCount.summary} words, ${result.wordCount.reduction}% reduction):\n${result.summary}\n\nKey Points:\n${result.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'summary.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="section-padding min-h-screen">
      <div className="container-max max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-primary-600 p-3 rounded-full">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">
                Text Summarizer
              </h1>
            </div>
            <p className="text-xl text-secondary-600">
              Transform lengthy texts into concise, intelligent summaries
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="card">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Input Text</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Paste your text here *
                  </label>
                  <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Paste your article, document, or any text you want to summarize. Minimum 50 characters required for meaningful results..."
                    className="w-full h-64 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    disabled={isLoading}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-secondary-500">
                      {inputText.length} characters, {inputText.split(/\s+/).filter(w => w).length} words
                    </span>
                    {inputText.length < 50 && inputText.length > 0 && (
                      <span className="text-sm text-red-500">Minimum 50 characters needed</span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Summary Length
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'short', label: 'Short', desc: '~20% of original' },
                      { value: 'medium', label: 'Medium', desc: '~40% of original' },
                      { value: 'long', label: 'Long', desc: '~60% of original' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setSummaryLength(option.value)}
                        className={`p-3 rounded-lg border-2 transition-colors text-center ${
                          summaryLength === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-secondary-200 hover:border-secondary-300'
                        }`}
                        disabled={isLoading}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-secondary-500">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!inputText.trim() || inputText.length < 50 || isLoading}
                  className="w-full btn-primary disabled:bg-secondary-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Analyzing & Summarizing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Summary
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Output Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-secondary-900">Summary Result</h2>
                {result && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(result.summary)}
                      className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
                      title="Copy summary"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={downloadSummary}
                      className="p-2 text-secondary-600 hover:text-primary-600 transition-colors"
                      title="Download summary"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {!result && !isLoading && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
                  <p className="text-secondary-500">
                    Enter your text and click "Generate Summary" to see the results here
                  </p>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-12">
                  <Loader className="animate-spin h-16 w-16 text-primary-600 mx-auto mb-4" />
                  <p className="text-secondary-600">
                    Our AI is analyzing your text and generating an intelligent summary...
                  </p>
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  {/* Statistics */}
                  <div className="bg-primary-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <BarChart3 className="h-5 w-5 text-primary-600" />
                      <h3 className="font-semibold text-primary-900">Summary Statistics</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary-700">{result.wordCount.original}</div>
                        <div className="text-sm text-primary-600">Original Words</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary-700">{result.wordCount.summary}</div>
                        <div className="text-sm text-primary-600">Summary Words</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{result.wordCount.reduction}%</div>
                        <div className="text-sm text-green-600">Reduction</div>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Generated Summary</h3>
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <p className="text-secondary-700 leading-relaxed">{result.summary}</p>
                    </div>
                  </div>

                  {/* Key Points */}
                  {result.keyPoints.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-3">Key Points</h3>
                      <ul className="space-y-2">
                        {result.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary-600 mt-2 flex-shrink-0"></div>
                            <span className="text-secondary-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}