'use client'

import { useState } from 'react'
import { MapPin, ArrowLeft, Loader, Target, Clock, Award, Download } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function PathGenerator() {
  const [goal, setGoal] = useState('')
  const [currentLevel, setCurrentLevel] = useState('beginner')
  const [timeCommitment, setTimeCommitment] = useState('3-5')
  const [isLoading, setIsLoading] = useState(false)
  const [learningPath, setLearningPath] = useState(null)
  const [error, setError] = useState('')

  const generatePath = async (userGoal, level, time) => {
    await new Promise(resolve => setTimeout(resolve, 3000))

    const goalLower = userGoal.toLowerCase()
    
    if (goalLower.includes('web') || goalLower.includes('javascript') || goalLower.includes('react')) {
      return {
        title: 'Full-Stack Web Development Path',
        description: 'Complete roadmap to become a proficient web developer',
        totalDuration: time === '1-2' ? '8-12 months' : time === '3-5' ? '6-9 months' : '4-6 months',
        outcomes: ['Build responsive websites', 'Create web applications', 'Deploy to production', 'Land a developer job'],
        steps: [
          {
            id: '1',
            title: 'HTML & CSS Fundamentals',
            description: 'Master the building blocks of web development',
            duration: time === '1-2' ? '6-8 weeks' : '3-4 weeks',
            difficulty: 'Beginner',
            skills: ['HTML5', 'CSS3', 'Flexbox', 'Responsive Design']
          },
          {
            id: '2',
            title: 'JavaScript Programming',
            description: 'Learn JavaScript from basics to advanced concepts',
            duration: time === '1-2' ? '8-10 weeks' : '4-6 weeks',
            difficulty: 'Intermediate',
            skills: ['ES6+', 'DOM Manipulation', 'Async/Await', 'Event Handling']
          },
          {
            id: '3',
            title: 'React Development',
            description: 'Build dynamic user interfaces with React',
            duration: time === '1-2' ? '8-10 weeks' : '5-7 weeks',
            difficulty: 'Intermediate',
            skills: ['React Hooks', 'State Management', 'Component Architecture']
          },
          {
            id: '4',
            title: 'Backend with Node.js',
            description: 'Create server-side applications',
            duration: time === '1-2' ? '8-10 weeks' : '4-6 weeks',
            difficulty: 'Advanced',
            skills: ['Node.js', 'Express.js', 'REST APIs', 'Database Design']
          }
        ]
      }
    } else if (goalLower.includes('data') || goalLower.includes('science') || goalLower.includes('analytics')) {
      return {
        title: 'Data Science & Analytics Path',
        description: 'Journey from data analysis to machine learning',
        totalDuration: time === '1-2' ? '10-14 months' : time === '3-5' ? '7-10 months' : '5-7 months',
        outcomes: ['Analyze complex datasets', 'Build ML models', 'Create visualizations', 'Get hired as data scientist'],
        steps: [
          {
            id: '1',
            title: 'Python for Data Science',
            description: 'Master Python with focus on data manipulation',
            duration: time === '1-2' ? '6-8 weeks' : '3-4 weeks',
            difficulty: 'Beginner',
            skills: ['Python Basics', 'NumPy', 'Pandas', 'Data Structures']
          },
          {
            id: '2',
            title: 'Statistics & Mathematics',
            description: 'Build foundation in statistics and probability',
            duration: time === '1-2' ? '8-10 weeks' : '4-6 weeks',
            difficulty: 'Intermediate',
            skills: ['Statistics', 'Probability', 'Hypothesis Testing', 'Linear Algebra']
          },
          {
            id: '3',
            title: 'Data Visualization',
            description: 'Create compelling visualizations and dashboards',
            duration: time === '1-2' ? '6-8 weeks' : '3-4 weeks',
            difficulty: 'Intermediate',
            skills: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Creation']
          },
          {
            id: '4',
            title: 'Machine Learning',
            description: 'Build and evaluate ML models',
            duration: time === '1-2' ? '10-12 weeks' : '6-8 weeks',
            difficulty: 'Advanced',
            skills: ['Supervised Learning', 'Feature Engineering', 'Model Evaluation']
          }
        ]
      }
    } else {
      return {
        title: `Personalized Path: ${userGoal}`,
        description: `Tailored roadmap to achieve your goal of ${userGoal}`,
        totalDuration: time === '1-2' ? '6-12 months' : '4-8 months',
        outcomes: [`Master ${userGoal}`, 'Build practical projects', 'Gain industry knowledge'],
        steps: [
          {
            id: '1',
            title: 'Foundation Building',
            description: `Establish fundamentals in ${userGoal}`,
            duration: time === '1-2' ? '4-6 weeks' : '2-3 weeks',
            difficulty: 'Beginner',
            skills: ['Basic concepts', 'Core principles', 'Tool familiarity']
          },
          {
            id: '2',
            title: 'Skill Development',
            description: 'Develop intermediate skills and experience',
            duration: time === '1-2' ? '8-10 weeks' : '4-6 weeks',
            difficulty: 'Intermediate',
            skills: ['Intermediate techniques', 'Problem solving', 'Best practices']
          },
          {
            id: '3',
            title: 'Advanced Application',
            description: 'Apply advanced concepts in real projects',
            duration: time === '1-2' ? '8-12 weeks' : '4-8 weeks',
            difficulty: 'Advanced',
            skills: ['Advanced concepts', 'Project management', 'Industry standards']
          }
        ]
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!goal.trim() || isLoading) return

    setError('')
    setIsLoading(true)

    try {
      const path = await generatePath(goal.trim(), currentLevel, timeCommitment)
      setLearningPath(path)
    } catch (err) {
      setError('Failed to generate learning path. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadPath = () => {
    if (!learningPath) return
    
    const content = `${learningPath.title}\n\n${learningPath.description}\n\nDuration: ${learningPath.totalDuration}\n\nSteps:\n${learningPath.steps.map((step, i) => `${i + 1}. ${step.title} (${step.duration})\n   ${step.description}\n   Skills: ${step.skills.join(', ')}\n`).join('\n')}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'learning-path.txt'
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
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-secondary-900">
                Path Generator
              </h1>
            </div>
            <p className="text-xl text-secondary-600">
              Create personalized learning roadmaps based on your goals
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Your Learning Goals</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    What do you want to learn? *
                  </label>
                  <textarea
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="e.g., 'web development', 'data science', 'machine learning'..."
                    className="w-full h-24 px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Current Level
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'beginner', label: 'Beginner', desc: 'New to this field' },
                      { value: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
                      { value: 'advanced', label: 'Advanced', desc: 'Want to specialize' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setCurrentLevel(option.value)}
                        className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                          currentLevel === option.value
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

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Time Commitment (hours/week)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: '1-2', label: '1-2 hrs' },
                      { value: '3-5', label: '3-5 hrs' },
                      { value: '6-10', label: '6-10 hrs' },
                      { value: '10+', label: '10+ hrs' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setTimeCommitment(option.value)}
                        className={`p-3 rounded-lg border-2 transition-colors text-center ${
                          timeCommitment === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-secondary-200 hover:border-secondary-300'
                        }`}
                        disabled={isLoading}
                      >
                        <div className="font-medium text-sm">{option.label}</div>
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
                  disabled={!goal.trim() || isLoading}
                  className="w-full btn-primary disabled:bg-secondary-300 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4 mr-2" />
                      Generating Your Path...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Generate Learning Path
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            {!learningPath && !isLoading && (
              <div className="card text-center py-12">
                <MapPin className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
                <p className="text-secondary-500">
                  Enter your learning goal to generate a personalized roadmap
                </p>
              </div>
            )}

            {isLoading && (
              <div className="card text-center py-12">
                <Loader className="animate-spin h-16 w-16 text-primary-600 mx-auto mb-4" />
                <p className="text-secondary-600">
                  Creating your personalized learning path...
                </p>
              </div>
            )}

            {learningPath && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Path Overview */}
                <div className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-secondary-900 mb-2">
                        {learningPath.title}
                      </h2>
                      <p className="text-secondary-600 mb-4">
                        {learningPath.description}
                      </p>
                    </div>
                    <button
                      onClick={downloadPath}
                      className="p-2 text-secondary-600 hover:text-primary-600 transition-colors ml-4"
                      title="Download learning path"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-primary-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="h-5 w-5 text-primary-600" />
                        <h3 className="font-semibold text-primary-900">Duration</h3>
                      </div>
                      <p className="text-primary-700">{learningPath.totalDuration}</p>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Award className="h-5 w-5 text-secondary-600" />
                        <h3 className="font-semibold text-secondary-900">Steps</h3>
                      </div>
                      <p className="text-secondary-700">{learningPath.steps.length} learning phases</p>
                    </div>
                  </div>

                  {/* Expected Outcomes */}
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-3">Expected Outcomes</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {learningPath.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Award className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-secondary-600">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Learning Steps */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-secondary-900">Learning Roadmap</h2>
                  
                  {learningPath.steps.map((step, index) => (
                    <div key={step.id} className="card hover:shadow-lg transition-shadow">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-secondary-900">
                              {step.title}
                            </h3>
                            <div className="flex items-center space-x-2 ml-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                step.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                step.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {step.difficulty}
                              </span>
                              <span className="text-sm text-secondary-500">{step.duration}</span>
                            </div>
                          </div>
                          
                          <p className="text-secondary-600 mb-4">{step.description}</p>
                          
                          <div>
                            <h4 className="font-medium text-secondary-900 mb-2">Skills you'll learn:</h4>
                            <div className="flex flex-wrap gap-2">
                              {step.skills.map((skill, skillIndex) => (
                                <span 
                                  key={skillIndex}
                                  className="bg-primary-100 text-primary-800 px-2 py-1 rounded text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}