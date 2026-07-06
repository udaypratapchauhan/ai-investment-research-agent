# 📈 AI Investment Research Agent

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4-000000?style=flat&logo=express&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-0.3-1C3C3C?style=flat)
![Gemini](https://img.shields.io/badge/Google_Gemini-2.5_Flash-4285F4?style=flat&logo=google&logoColor=white)

> A full-stack AI-powered web application that researches any company and returns a structured investment report — strengths, risks, growth opportunities, and a **Strong Buy / Moderate Buy / Pass** recommendation — powered by **LangChain** and **Google Gemini 2.5 Flash**.

---

## 🔗 Live Demo

| | URL |
|---|---|
| **Frontend** | `<Frontend URL>` |
| **Backend API** | `<Backend URL>` |
| **GitHub Repository** | `<Repository URL>` |

---

## Overview

The application accepts a company name, constructs a research prompt using **LangChain's PromptTemplate**, sends it to **Google Gemini 2.5 Flash**, and parses the response into a structured JSON report rendered as a professional dark-themed UI with Framer Motion animations.

---

## Features

| | Feature |
|---|---|
| 🤖 | AI-powered analysis via Google Gemini 2.5 Flash |
| 📊 | Animated investment score card with confidence meter |
| 🏆 | Premium badge: Strong Buy / Moderate Buy / Pass |
| 💼 | Sections for business model, strengths, risks, trends, and growth opportunities |
| ⏳ | Step-by-step AI thinking loader animation |
| 💡 | Example company chips for instant exploration |
| 📱 | Fully responsive — mobile, tablet, and desktop |
| 🚨 | Input validation and error handling on both frontend and backend |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Axios |
| **Backend** | Node.js, Express.js, dotenv, CORS |
| **AI / LLM** | LangChain.js (`PromptTemplate`, `RunnableSequence`), `@google/genai` SDK v2, Gemini 2.5 Flash |

---

## Screenshots

### Home Page
<!-- Add screenshot here -->

### AI Analysis Result
<!-- Add screenshot here -->

### Investment Recommendation
<!-- Add screenshot here -->

### Mobile View (Optional)
<!-- Add screenshot here -->

---

## Architecture

```
User → React Frontend (Axios POST /api/analyze)
     → Express Backend (validate → researchService)
     → LangChain Pipeline (PromptTemplate → RunnableLambda)
     → Google Gemini 2.5 Flash (generateContent)
     → JSON.parse → Structured Response
     → React UI (ResultCard, ScoreCard, RecommendationBadge)
```

---

## Project Structure

```
ai-investment-agent/
├── backend/
│   ├── server.js                  # Express entry point
│   ├── routes/analyze.js          # POST /api/analyze
│   ├── controllers/               # Request handler
│   ├── services/                  # Orchestrates LangChain chain
│   ├── langchain/chain.js         # PromptTemplate → Gemini → JSON.parse
│   └── utils/validateInput.js     # Input sanitisation
│
└── frontend/
    └── src/
        ├── pages/Home.jsx         # Single-page layout
        ├── components/
        │   ├── SearchBar.jsx
        │   ├── ThinkingLoader.jsx  # Animated AI step loader
        │   ├── ResultCard.jsx      # Full report renderer
        │   ├── ScoreCard.jsx       # Score + confidence animation
        │   ├── RecommendationBadge.jsx
        │   ├── WorkflowSteps.jsx
        │   ├── MetadataBar.jsx
        │   └── EmptyState.jsx
        ├── hooks/useAnalyze.js    # loading / result / error / timing
        └── services/api.js        # Axios wrapper
```

---

## Installation

**Prerequisites:** Node.js v18+, a free [Google Gemini API key](https://aistudio.google.com/app/apikey)

```bash
<<<<<<< HEAD
git clone https://github.com/udaypratapchauhan/ai-investment-research-agent.git
=======
# 1. Clone
git clone https://github.com/your-username/ai-investment-agent.git
>>>>>>> 60384d2 (Update README)
cd ai-investment-agent

# 2. Install backend
cd backend && npm install

# 3. Install frontend
cd ../frontend && npm install

# 4. Configure environment
cd ../backend
cp .env.example .env
# Open .env and paste your Gemini API key

# 5. Run backend (Terminal 1)
npm run dev        # → http://localhost:3001

# 6. Run frontend (Terminal 2)
cd ../frontend
npm run dev        # → http://localhost:5173
```

<<<<<<< HEAD
Open `.env` and add your Gemini API key:

```env
PORT=3001
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### Step 5 — Run the Backend

```bash
# Inside /backend
npm run dev
```

Server starts at **http://localhost:3001**

### Step 6 — Run the Frontend

Open a new terminal:

```bash
# Inside /frontend
npm run dev
```

App opens at **http://localhost:5173**

=======
>>>>>>> 60384d2 (Update README)
---

## Environment Variables

Create `backend/.env` using the template below:

```env
PORT=3001
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore`.

---

## API Endpoint

### `POST /api/analyze`

**Request**
```json
{ "company": "Tesla" }
```

**Response `200 OK`**
```json
{
  "company": "Tesla",
  "overview": "Tesla, Inc. is a leading electric vehicle and clean energy company...",
  "industry": "Electric Vehicles / Clean Energy",
  "businessModel": "Revenue from EV sales, energy storage (Megapack), solar, and FSD subscriptions.",
  "strengths": ["Industry-leading EV brand", "Vertically integrated supply chain", "Supercharger network moat"],
  "risks": ["Rising competition from BYD and legacy OEMs", "Elon Musk key-person risk", "Margin compression from price cuts"],
  "recentTrends": "Tesla aggressively cut prices in 2024, boosting volume but compressing gross margins.",
  "growthOpportunities": "Megapack energy storage, FSD monetisation, and expansion into emerging markets.",
  "recommendation": "Invest",
  "confidence": "72%",
  "reasoning": "Strong brand and technology leadership support a long-term thesis despite near-term margin pressure."
}
```

**Error Responses**
```json
{ "error": "Company name is required." }          // 400
{ "error": "Failed to analyze the company." }     // 500
```

---

## Deployment

### Frontend → [Vercel](https://vercel.com)
```bash
cd frontend && npm run build
# Deploy /dist to Vercel
```
Set `VITE_API_URL=https://your-backend-domain/api` in Vercel environment settings.

<<<<<<< HEAD
Set the `VITE_API_URL` environment variable in Vercel's project settings if using a custom backend domain.

### Backend — Render

The Express backend can be deployed to [Render](https://render.com):

1. Push the `/backend` folder to a GitHub repository
2. Connect the repo to Render / Railway
3. Set the following environment variables in the platform dashboard:

```
PORT=3001
GEMINI_API_KEY=your_production_api_key
```

> **Note:** Update the CORS origin in `server.js` to match your production frontend URL before deploying.
=======
### Backend → [Render](https://render.com) / [Railway](https://railway.app)
1. Push `/backend` to GitHub
2. Connect repo on Render / Railway
3. Add environment variables: `PORT` and `GEMINI_API_KEY`
4. Update CORS origin in `server.js` to match your frontend URL
>>>>>>> 60384d2 (Update README)

---

## Future Improvements

| Improvement | Detail |
|---|---|
| 📡 **Live Financial Data** | Integrate Yahoo Finance / Alpha Vantage for real-time stock metrics |
| 📰 **News Grounding** | Use LangChain Tavily tool to cite recent news in analysis |
| 📊 **Stock Charts** | Embed interactive charts with Recharts or Chart.js |
| 💾 **Saved Reports** | Persist analyses with MongoDB + user sessions |
| 📄 **PDF Export** | Generate downloadable reports with `jsPDF` or Puppeteer |
| 🤖 **Multi-Agent Pipeline** | Separate specialist agents for financials, news, and recommendation |

---

## Author

**Your Name**
- 🐙 GitHub: https://github.com/udaypratapchauhan
- 💼 LinkedIn: https://www.linkedin.com/in/udaypratapchauhan001/


---

> ⚠️ **Disclaimer:** This application is for educational purposes only. AI-generated analysis does not constitute financial advice. Always consult a qualified financial advisor before making investment decisions.
