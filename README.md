# AI Suite - Text Summarization, Path Generation & Document Q&A

A comprehensive AI-powered web application built with Next.js and TypeScript that provides three main features:

## 🚀 Features

### 1. **Text Summarizer** (`/summarize`)
- Transform lengthy documents and texts into concise, intelligent summaries
- Adjustable summary length (Short, Medium, Long)  
- Word count analysis and reduction percentage
- Key points extraction
- Download summaries as text files

### 2. **Path Generator** (`/path-generator`)
- Create personalized learning and career roadmaps based on specific goals
- Tailored recommendations for different skill levels (Beginner, Intermediate, Advanced)
- Flexible time commitment options (1-2, 3-5, 6-10, 10+ hours/week)
- Step-by-step learning phases with skills breakdown
- Downloadable learning paths

### 3. **Document Q&A** (`/document-qa`)
- Upload any type of document (PDF, Word, Excel, PowerPoint, TXT, JSON, code files, etc.)
- Ask questions about uploaded documents
- **Hybrid AI Knowledge**: Combines document content with general AI knowledge
- Source attribution for document-based answers
- Real-time chat interface

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **UI Components**: Custom components with professional design

## 🎨 Design Features

- **Professional UI**: Clean, modern interface with consistent design system
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **User-Friendly**: Intuitive navigation and clear call-to-actions
- **Animations**: Smooth transitions and loading states
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18 or higher
- npm (comes with Node.js)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If using git
   git clone <repository-url>
   cd ai-suite
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open Your Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Step-by-Step Usage Guide

### Text Summarizer
1. Visit [http://localhost:3000/summarize](http://localhost:3000/summarize)
2. Paste your text (minimum 50 characters)
3. Choose summary length:
   - **Short**: ~20% of original text
   - **Medium**: ~40% of original text
   - **Long**: ~60% of original text
4. Click "Generate Summary"
5. Review the summary statistics (word count, reduction percentage)
6. Copy the summary or download it as a text file

### Path Generator  
1. Visit [http://localhost:3000/path-generator](http://localhost:3000/path-generator)
2. Describe your learning goal (e.g., "Learn React development")
3. Select your current skill level:
   - **Beginner**: No prior experience
   - **Intermediate**: Some experience
   - **Advanced**: Extensive experience
4. Choose your time commitment per week:
   - 1-2 hours
   - 3-5 hours
   - 6-10 hours
   - 10+ hours
5. Click "Generate Path"
6. Review your personalized roadmap with step-by-step phases
7. Download your learning path as a text file

### Document Q&A
1. Visit [http://localhost:3000/document-qa](http://localhost:3000/document-qa)
2. Upload any document (PDF, Word, Excel, TXT, JSON, code files, etc.)
3. Wait for the document to be processed
4. Ask questions about the document content
5. Get intelligent answers that combine:
   - Information extracted from your document
   - General AI knowledge for context and explanation
6. Continue the conversation with follow-up questions

## 🔧 Development Guide

The application uses modern React patterns with:
- Server Components and Client Components
- TypeScript for type safety
- Tailwind CSS for styling
- Custom hooks for state management
- Responsive design principles

### Project Structure
```
src/
├── app/                 # Next.js App Router pages
│   ├── api/             # API routes
│   ├── summarize/       # Text summarizer page
│   ├── path-generator/  # Path generator page
│   ├── document-qa/     # Document Q&A page
│   └── ...              # Other pages
├── components/          # Reusable UI components
└── ...
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Key Benefits

- **AI-Powered**: Intelligent processing for all three features
- **User-Centric**: Designed for productivity and learning
- **Professional**: Clean, business-ready interface
- **Fast**: Optimized Next.js performance
- **Scalable**: Modular component architecture

## 🚀 Deployment

### Local Production Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. Access at [http://localhost:3000](http://localhost:3000)

### Cloud Deployment
See [README-DEPLOYMENT.md](README-DEPLOYMENT.md) for AWS ECR deployment instructions.

## ❓ Troubleshooting

### Common Issues and Solutions

1. **Installation fails**
   - Ensure Node.js 18+ is installed
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`, then reinstall

2. **Development server won't start**
   - Check if port 3000 is already in use
   - Try: `npm run dev -- -p 3001` to use a different port

3. **Features not working as expected**
   - Check browser console for errors
   - Ensure JavaScript is enabled
   - Try refreshing the page

4. **Slow performance**
   - Close other applications
   - Ensure at least 4GB RAM available
   - Restart the development server

## 📄 License

This project is built for demonstration purposes showcasing modern web development with AI integration.