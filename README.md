# 🧠 SmartAnalyzer

**AI Career Pathway Predictor for Kenyan Students**

> **AI-powered career guidance for Kenyan secondary school students under the Competency-Based Curriculum (CBC).**

SmartAnalyzer helps students make informed career decisions early by combining interests, aptitude, academic context, and AI-driven insights — all tailored to Kenya’s education system and high-growth sectors.

---

## 🚀 Overview

SmartAnalyzer is a modern, AI-powered web application that delivers **personalized career recommendations** for Kenyan secondary school students.

It analyzes:

* Student interests
* Academic level
* Aptitude-based assessments
* Optional personal essays

…and maps the results to **CBC-aligned career pathways** that reflect Kenya’s current and future workforce needs.

No accounts. No backend. No data retention.

---

## ✨ Key Features

* 🤖 **AI-Powered Analysis** — Google Gemini AI for personalized career insights
* 📊 **Comprehensive Assessment** — interests, aptitude, academics, and self-expression
* 🎯 **CBC-Aligned Pathways** — recommendations mapped to Kenya’s curriculum
* 📱 **Fully Responsive** — mobile-first, works on all devices
* 🎨 **Modern UI/UX** — dark theme, glitch effects, particles, animations
* 💾 **Session-Only Storage** — no backend, no persistence
* ⚡ **Real-Time Results** — instant analysis with intelligent fallback logic

---

## 🧭 Assessment Flow

```
Welcome Screen
      ↓
Personal Details
      ↓
Interest Selection
      ↓
Aptitude Assessment
      ↓
Optional Essay
      ↓
AI Analysis
      ↓
Personalized Results
```

---

## 🛠 Technology Stack

### Frontend

* **Next.js 14** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **Framer Motion**
* **shadcn/ui**

### AI Integration

* **Google Gemini API**
* Rule-based fallback engine
* Local caching to reduce API calls

### Design System

* Custom dark theme (emerald + electric blue)
* Advanced animations (particles, glitch, scan lines)
* Responsive grid with geometric overlays

---

## 🏗 Project Architecture

```
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
```

---

## 🎯 How It Works

### 1️⃣ Personal Profile Collection

* Student name & grade level
* Session-based persistence only

### 2️⃣ Interest Mapping

Six high-growth sectors:

* 🤖 Technology & Digital
* 🌱 Modern Agriculture
* ⚙️ Engineering & Manufacturing
* 🏥 Health & Biomedical
* 🎨 Creative Economy & Media
* 🌍 Geospatial & Climate Tech

### 3️⃣ Aptitude Assessment

* Scenario-based questions
* Evaluates problem-solving, creativity, analysis, teamwork, adaptability, and communication

### 4️⃣ Optional Essay

* Self-description input
* Auto-save with live word & character tracking

### 5️⃣ AI Analysis

* Structured prompt generation
* Gemini AI with intelligent fallback rules

### 6️⃣ Results Visualization

* Match percentage indicators
* CBC subject alignment
* Skills roadmap & Kenyan learning resources
* Clear, actionable next steps

---

## 🔄 Data Flow

```
User → Frontend → Session Storage → AI Service → Gemini API
                     ↓ (fallback)
               Rule-based Engine
```

Results are returned instantly and rendered client-side.

---

## 🎨 Design Philosophy

### Typography

* **Clash Display** — headings
* **Excon** — body text
* **Chillax** — technical elements

### Color Palette

* **Primary:** #22c55e (Emerald Green)
* **Accent:** #2563eb (Electric Blue)
* **Background:** Gradient (#0f172a → #1e293b)
* **Cards:** Dark glassmorphism

### Animations

* Particle systems
* Glitch text effects
* CRT-style scan lines
* Staggered content reveals

---

## 📈 Performance Metrics

* First Contentful Paint: **< 1.5s**
* Time to Interactive: **< 3s**
* Bundle Size: **~150KB (gzipped)**
* AI Response Time: **< 5s** (with fallback)
* Mobile Compatibility: **100%**

---

## 🛡 Privacy & Security

### Data Handling

* No backend database
* Session-only storage
* Anonymous usage
* No analytics or tracking

### Security

* Client-side processing
* API keys via environment variables
* Input validation & sanitization

---

## 🎓 Educational Impact

* Aligned with **Kenya Vision 2030**
* Promotes STEM & skill-based careers
* Bridges education with real industry needs

### CBC Integration

* Subject-to-career mapping
* Competency-focused pathways
* Local learning resources

---

## 📱 Mobile Experience

* Touch-optimized UI
* Gesture-friendly navigation
* Reduced data usage

Target usage distribution:

* Mobile phones: 45%
* Tablets: 25%
* Desktop: 20%
* Laptops: 10%

---

## 🚀 Deployment

* **Vercel** (recommended)
* Netlify
* Docker-ready

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit meaningful changes
4. Open a pull request

### Guidelines

* Follow TypeScript best practices
* Maintain responsiveness
* Include error handling & fallbacks
* Test across devices

---

## 📄 License

MIT License. See `LICENSE` for details.

---

## 🙏 Acknowledgments

* Google Gemini AI
* Kenya Ministry of Education (CBC)
* SkillsFuture Singapore
* Next.js & Tailwind CSS communities

---

## 📞 Support & Contact

* GitHub Issues
* Email: (mailto:makutualvine@gmail.com)
* Twitter / X: **@Soul_reaper_KE**

---

<div align="center">

🏆 **Hackathon Project**
Built for Kenyan Students

⭐ Star the repo if it helps
🔄 Share with educators & students
💡 Contribute to accessible career guidance in Africa

</div>
