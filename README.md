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
| **Frontend** | https://ai-investment-research-agent-fawn.vercel.app |
| **Backend API** | https://ai-investment-research-agent-8uoa.onrender.com |
| **GitHub Repository** | https://github.com/udaypratapchauhan/ai-investment-research-agent |

---

## 📖 Overview

The application accepts a company name, constructs a research prompt using **LangChain's PromptTemplate**, sends it to **Google Gemini 2.5 Flash**, and parses the response into a structured JSON report rendered as a professional dark-themed UI with Framer Motion animations.

---

## ✨ Features

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

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion, Axios |
| **Backend** | Node.js, Express.js, dotenv, CORS |
| **AI / LLM** | LangChain.js (`PromptTemplate`, `RunnableSequence`), `@google/genai` SDK v2, Gemini 2.5 Flash |

---

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/Screenshot%202026-07-07%20003140.png)

### AI Analysis Result
![AI Analysis Result](./screenshots/Screenshot%202026-07-07%20003151.png)

### Investment Recommendation
![Investment Recommendation](./screenshots/Screenshot%202026-07-07%20003200.png)

---

## 🏗️ Architecture

```
User → React Frontend (Axios POST /api/analyze)
     → Express Backend (validate → researchService)
     → LangChain Pipeline (PromptTemplate → RunnableLambda)
     → Google Gemini 2.5 Flash (generateContent)
     → JSON.parse → Structured Response
     → React UI (ResultCard, ScoreCard, RecommendationBadge)
```

---

## 📁 Project Structure

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

## 🚀 Installation

**Prerequisites:** Node.js v18+, a free [Google Gemini API key](https://aistudio.google.com/app/apikey)

```bash
# 1. Clone the repository
git clone https://github.com/udaypratapchauhan/ai-investment-research-agent.git

cd ai-investment-research-agent

# 2. Install backend dependencies
cd backend && npm install

# 3. Install frontend dependencies
cd ../frontend && npm install

# 4. Configure environment variables
cd ../backend
cp .env.example .env
# Open .env and paste your Gemini API key

# 5. Run the backend (Terminal 1)
npm run dev        # → http://localhost:3001

# 6. Run the frontend (Terminal 2)
cd ../frontend
npm run dev        # → http://localhost:5173
```

---

## 🔑 Environment Variables

Create `backend/.env` using the provided template:

```env
PORT=3001
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore`.

---

## 📡 API Endpoint

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

## ☁️ Deployment

### Frontend → [Vercel](https://vercel.com)

```bash
cd frontend && npm run build
# Deploy the /dist folder to Vercel
```

Set `VITE_API_URL=https://ai-investment-research-agent-8uoa.onrender.com/api` in Vercel's project environment settings.

### Backend → [Render](https://render.com) 

1. Push the `/backend` folder to your GitHub repository
2. Connect the repo on Render 
3. Add the following environment variables in the platform dashboard:
   ```
   PORT=3001
   GEMINI_API_KEY=your_production_api_key
   ```
4. Update the CORS origin in `server.js` to match your production frontend URL

---

## 🔮 Future Improvements

| Improvement | Detail |
|---|---|
| 📡 **Live Financial Data** | Integrate Yahoo Finance / Alpha Vantage for real-time stock metrics |
| 📰 **News Grounding** | Use LangChain Tavily tool to cite recent news in analysis |
| 📊 **Stock Charts** | Embed interactive charts with Recharts or Chart.js |
| 💾 **Saved Reports** | Persist analyses with MongoDB + user sessions |
| 📄 **PDF Export** | Generate downloadable reports with `jsPDF` or Puppeteer |
| 🤖 **Multi-Agent Pipeline** | Separate specialist agents for financials, news, and recommendation |

---

## 👤 Author

**Uday Pratap Chauhan**
- 🐙 GitHub: [github.com/udaypratapchauhan](https://github.com/udaypratapchauhan)
- 💼 LinkedIn: [linkedin.com/in/udaypratapchauhan001](https://www.linkedin.com/in/udaypratapchauhan001/)

---

> ⚠️ **Disclaimer:** This application is for educational purposes only. AI-generated analysis does not constitute financial advice. Always consult a qualified financial advisor before making investment decisions.
