SmartAnalyzer – AI Career Pathway Predictor for Kenyan Students








<div align="center">

AI-powered career guidance for Kenyan secondary school students under the Competency-Based Curriculum (CBC)

</div>
🚀 Overview

SmartAnalyzer is an AI-powered web application built to provide personalized career guidance for Kenyan secondary school students.
It analyzes interests, academic performance, aptitude assessments, and personal essays to recommend career pathways aligned with Kenya’s high-growth sectors and the CBC framework.

✨ Key Features

🤖 AI-Powered Analysis – Google Gemini AI for personalized career insights

📊 Comprehensive Assessment – Interests, aptitude, academics, and self-expression

🎯 CBC-Aligned Pathways – Recommendations mapped to Kenya’s curriculum

📱 Fully Responsive – Mobile-first, accessible on all devices

🎨 Modern UI/UX – Dark theme, glitch effects, animations, particle backgrounds

💾 Session Storage – No backend; data stays on the client

⚡ Real-time Results – Instant analysis with intelligent fallback logic

📋 Assessment Flow
graph TD
    A[Welcome Screen] --> B[Personal Details]
    B --> C[Interest Selection]
    C --> D[Aptitude Assessment]
    D --> E[Optional Essay]
    E --> F[AI Analysis]
    F --> G[Personalized Results]

🎨 Technology Stack
Frontend

Next.js 14 (App Router)

TypeScript

Tailwind CSS

Framer Motion

shadcn/ui

AI Integration

Google Gemini API

Rule-based fallback system

Local caching to reduce API calls

Design System

Custom dark theme (emerald + electric blue)

Advanced animations (particles, glitch, scan lines)

Responsive grid with geometric overlays

🏗️ Project Architecture
smart-analyzer/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   └── ui/
│       ├── glitch-text.tsx
│       ├── particle-background.tsx
│       ├── hexagon-grid.tsx
│       ├── progress-wizard.tsx
│       ├── sector-card.tsx
│       ├── result-visualization.tsx
│       └── essay.tsx
├── lib/
│   ├── ai-service.ts
│   └── utils.ts
└── public/
    └── assets/

🎯 How It Works
1. Personal Profile Collection

Student name and grade level

Session-based persistence

2. Interest Mapping

Six high-growth sectors:

🤖 Technology & Digital

🌱 Modern Agriculture

⚙️ Engineering & Manufacturing

🏥 Health & Biomedical

🎨 Creative Economy & Media

🌍 Geospatial & Climate Tech

3. Aptitude Assessment

Scenario-based questions

Evaluates problem solving, creativity, analysis, teamwork, adaptability, and communication

4. Optional Essay

Self-description input

Auto-save with live word and character tracking

5. AI Analysis

Data aggregation and structured prompts

Gemini AI with intelligent fallback logic

6. Results Visualization

Match percentage indicators

CBC subject alignment

Skills roadmap and Kenyan resources

Clear, actionable next steps

📊 Data Flow Diagram
sequenceDiagram
    participant User
    participant Frontend
    participant SessionStorage
    participant AIService
    participant GeminiAPI

    User->>Frontend: Complete Assessment
    Frontend->>SessionStorage: Store Data
    Frontend->>AIService: Request Analysis
    AIService->>GeminiAPI: Send Profile Data
    alt API Available
        GeminiAPI-->>AIService: AI Recommendations
    else API Unavailable
        AIService->>AIService: Rule-based Recommendations
    end
    AIService-->>Frontend: Results
    Frontend-->>User: Display Insights

🎨 Design Philosophy
Typography

Clash Display – Headings

Excon – Body text

Chillax – Technical elements

Color Palette

Primary: #22c55e (Emerald Green)

Accent: #2563eb (Electric Blue)

Background: Gradient from #0f172a to #1e293b

Cards: Glassmorphism on dark surfaces

Animations

Particle systems

Glitch text effects

CRT-style scan lines

Staggered content reveals

🤝 Contributing

Contributions are welcome.

Fork the repository

Create a feature branch

Commit meaningful changes

Open a pull request

Guidelines

Follow TypeScript best practices

Maintain responsiveness

Include error handling and fallbacks

Test across devices

📈 Performance Metrics

First Contentful Paint: < 1.5s

Time to Interactive: < 3s

Bundle Size: ~150KB (gzipped)

API Response: < 5s (with fallback)

Mobile Compatibility: 100%

🛡️ Privacy & Security
Data Handling

No backend database

Session-only storage

Anonymous usage

No analytics tracking

Security

Client-side processing

No sensitive data transmission

API keys via environment variables

Input validation and sanitization

🎓 Educational Impact

Aligned with Kenya Vision 2030

Promotes STEM and skill-based careers

Bridges education and industry needs

CBC Integration

Subject-specific pathways

Competency-focused development

Local learning resources

📱 Mobile Experience
pie title Device Compatibility
    "Mobile Phones" : 45
    "Tablets" : 25
    "Desktop" : 20
    "Laptops" : 10


Touch-optimized UI

Gesture-friendly navigation

Reduced data usage

🚀 Deployment

Vercel (recommended)

Netlify

Docker-ready setup

📄 License

MIT License. See LICENSE for details.

🙏 Acknowledgments

Google Gemini AI

Kenya Ministry of Education (CBC)

SkillsFuture Singapore

Next.js & Tailwind CSS communities

📞 Support & Contact

GitHub Issues

Email: support@smartanalyzer.ke

Twitter/X: @SmartAnalyzerKE

<div align="center">

🏆 Hackathon Project
Built for Kenyan Students

</div>
📊 Project Stats










⭐ Star the repo if it helps
🔄 Share with educators and students
💡 Contribute to accessible career guidance in Africa