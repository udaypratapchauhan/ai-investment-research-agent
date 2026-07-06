# 📈 AI Investment Research Agent

> An AI-powered full-stack web application that analyzes any publicly known company and delivers a structured investment research report — including strengths, risks, growth opportunities, and a clear **Invest ✅** or **Pass ❌** recommendation — powered by **LangChain** and **Google Gemini**.

---

## Overview

The AI Investment Research Agent solves a real problem faced by retail investors and students: getting a structured, well-reasoned analysis of a company without needing access to expensive financial research tools.

The application accepts a company name from the user, constructs an intelligent prompt using **LangChain's PromptTemplate**, sends it to **Google Gemini 2.5 Flash** for AI-powered research, and returns a fully structured JSON response that the React frontend renders as a professional investment report.

The focus of this project is on **reasoning quality** — not just a simple buy/sell signal, but a complete analysis covering business model, competitive advantages, risks, recent trends, growth opportunities, and a confidence-backed recommendation with detailed reasoning.

---

## Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered Analysis** | Gemini 2.5 Flash generates research based on training knowledge |
| 🏢 **Company Overview** | 2–3 sentence summary of the company |
| 💼 **Business Model** | Explains how the company generates revenue |
| 🏭 **Industry Identification** | Classifies the company's sector |
| 💪 **Strengths Analysis** | Lists key competitive advantages |
| ⚠️ **Risk Assessment** | Identifies major business and market risks |
| 📰 **Recent Trends** | Highlights notable recent developments |
| 🚀 **Growth Opportunities** | Outlines key future growth drivers |
| 🏆 **Investment Recommendation** | Strong Buy / Moderate Buy / Pass badge |
| 📊 **Confidence Score** | Percentage score with animated progress bar |
| 🎨 **Modern Dark UI** | Professional dark-themed interface with Framer Motion animations |
| ⏳ **AI Thinking Loader** | Step-by-step animated analysis pipeline |
| ✅ **Empty State** | Example company chips for instant exploration |
| 🚨 **Error Handling** | Validation on both frontend and backend |
| 📱 **Fully Responsive** | Works on mobile, tablet, and desktop |

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **Vite** | Fast development server and bundler |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations and transitions |
| **Axios** | HTTP client for API calls |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **dotenv** | Environment variable management |
| **CORS** | Cross-origin request handling |

### AI / LLM
| Technology | Purpose |
|---|---|
| **LangChain.js** | Prompt orchestration pipeline |
| **@google/genai** | Official Google Generative AI SDK (v2.x) |
| **Google Gemini 2.5 Flash** | Large language model for analysis |

---

## Project Structure

```
ai-investment-agent/
│
├── README.md
│
├── backend/                        # Node.js + Express API
│   ├── server.js                   # Entry point
│   ├── .env                        # Environment variables (not committed)
│   ├── .env.example                # Template for environment setup
│   ├── package.json
│   │
│   ├── routes/
│   │   └── analyze.js              # POST /api/analyze route definition
│   │
│   ├── controllers/
│   │   └── analyzeController.js    # Request handler — validates & delegates
│   │
│   ├── services/
│   │   └── researchService.js      # Invokes the LangChain chain
│   │
│   ├── langchain/
│   │   └── chain.js                # Core AI pipeline (Prompt → Gemini → JSON)
│   │
│   └── utils/
│       └── validateInput.js        # Input sanitisation helper
│
└── frontend/                       # React + Vite SPA
    ├── index.html
    ├── vite.config.js              # Dev proxy to backend
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    │
    └── src/
        ├── main.jsx                # React entry point
        ├── App.jsx                 # Root component
        ├── index.css               # Global styles
        │
        ├── pages/
        │   └── Home.jsx            # Single-page layout
        │
        ├── components/
        │   ├── SearchBar.jsx       # Company input + Analyze button
        │   ├── ThinkingLoader.jsx  # Animated step-by-step AI loader
        │   ├── ResultCard.jsx      # Full research report card
        │   ├── ScoreCard.jsx       # Animated investment score + confidence
        │   ├── RecommendationBadge.jsx  # Strong Buy / Moderate Buy / Pass
        │   ├── WorkflowSteps.jsx   # AI pipeline visualization
        │   ├── MetadataBar.jsx     # Model · Time · Stack metadata strip
        │   ├── EmptyState.jsx      # Illustrated placeholder with example chips
        │   └── ErrorMessage.jsx    # Styled error display
        │
        ├── hooks/
        │   └── useAnalyze.js       # Custom hook: loading / result / error / timing
        │
        └── services/
            └── api.js              # Axios POST call wrapper
```

---

## Architecture

The following diagram shows the end-to-end data flow:

```
┌─────────────────────────────┐
│       User (Browser)        │
│  Types company → clicks     │
│       Analyze               │
└────────────┬────────────────┘
             │  POST /api/analyze
             │  { "company": "Tesla" }
             ▼
┌─────────────────────────────┐
│     React Frontend          │
│  useAnalyze hook            │
│  Axios → /api/analyze       │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│    Express.js Backend       │
│  validateInput.js           │
│  analyzeController.js       │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│    LangChain Pipeline       │
│  PromptTemplate.format()    │
│  RunnableLambda (Gemini)    │
│  RunnableLambda (JSON.parse)│
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│    Google Gemini 2.5 Flash  │
│  @google/genai SDK          │
│  generateContent()          │
└────────────┬────────────────┘
             │  Raw text (JSON string)
             ▼
┌─────────────────────────────┐
│  Structured JSON Response   │
│  { company, overview,       │
│    strengths, risks,        │
│    recommendation... }      │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│    React UI Renders         │
│  ResultCard + ScoreCard     │
│  RecommendationBadge        │
│  WorkflowSteps              │
└─────────────────────────────┘
```

---

## Installation

### Prerequisites
- Node.js v18 or higher
- A Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/ai-investment-agent.git
cd ai-investment-agent
```

### Step 2 — Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3 — Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4 — Configure Environment Variables

```bash
cd ../backend
cp .env.example .env
```

Open `.env` and add your Gemini API key:

```env
PORT=3001
GEMINI_API_KEY=your_actual_gemini_api_key_here
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

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No (default: 3001) | Port the Express server listens on |
| `GEMINI_API_KEY` | ✅ Yes | Your Google AI Studio API key. Get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey) |

> ⚠️ **Never commit your `.env` file.** It is listed in `.gitignore` by default.

---

## API Endpoint

### `POST /api/analyze`

Analyzes a company and returns a structured investment research report.

**Request**

```http
POST http://localhost:3001/api/analyze
Content-Type: application/json
```

```json
{
  "company": "Tesla"
}
```

**Success Response** `200 OK`

```json
{
  "company": "Tesla",
  "overview": "Tesla, Inc. is a leading electric vehicle and clean energy company founded in 2003...",
  "industry": "Electric Vehicles / Clean Energy",
  "businessModel": "Tesla generates revenue from EV sales, energy storage products (Megapack), solar installations, and software services including Full Self-Driving subscriptions.",
  "strengths": [
    "Industry-leading EV technology and brand recognition",
    "Vertically integrated supply chain and Gigafactory network",
    "Supercharger network as a durable competitive moat"
  ],
  "risks": [
    "Increasing competition from legacy OEMs and Chinese EV makers like BYD",
    "Heavy dependence on Elon Musk's public persona and leadership",
    "Margin compression from aggressive price cuts across product lines"
  ],
  "recentTrends": "Tesla aggressively cut prices across its lineup in 2024, boosting delivery volumes but compressing gross margins. The Cybertruck entered mass production.",
  "growthOpportunities": "Energy storage (Megapack), Full Self-Driving monetization, expansion into India and Southeast Asia, and the upcoming affordable Model 2.",
  "recommendation": "Invest",
  "confidence": "72%",
  "reasoning": "Tesla maintains strong brand equity and technological leadership in the EV market. While near-term margin pressure is real, the long-term thesis is underpinned by energy diversification and FSD optionality. Investors with a 3–5 year horizon may find the current valuation attractive relative to future growth."
}
```

**Error Response** `400 Bad Request`

```json
{
  "error": "Company name is required."
}
```

**Error Response** `500 Internal Server Error`

```json
{
  "error": "Failed to analyze the company. Please try again."
}
```

---

## How It Works

1. **User Input** — The user types a company name (e.g., "Apple") into the search bar and clicks **Analyze**.

2. **Frontend Request** — The `useAnalyze` custom hook calls `analyzeCompany()` from `services/api.js`, which sends a `POST /api/analyze` request via Axios with `{ company: "Apple" }` in the body.

3. **Backend Validation** — Express receives the request. `validateInput.js` checks that the company name is present, a non-empty string, and under 100 characters. If validation fails, a `400` error is returned immediately.

4. **LangChain Prompt Construction** — `researchService.js` calls `buildResearchChain()`. Inside `chain.js`, `PromptTemplate.fromTemplate()` formats the system prompt by injecting the company name into a detailed research instruction.

5. **Gemini API Call** — A `RunnableLambda` calls the `@google/genai` SDK's `generateContent()` method with the formatted prompt, targeting the `gemini-2.5-flash` model.

6. **JSON Parsing** — A second `RunnableLambda` receives the raw text response from Gemini, strips any accidental Markdown code fences (` ```json `), and calls `JSON.parse()` to convert it into a structured JavaScript object.

7. **Frontend Rendering** — The parsed JSON is returned to the frontend. `useAnalyze` stores it in React state. `ResultCard` renders all sections with staggered Framer Motion animations, `ScoreCard` shows an animated investment score, and `RecommendationBadge` displays the appropriate tier (Strong Buy / Moderate Buy / Pass).

---

## Design Decisions

| Decision | Rationale |
|---|---|
| **React + Vite** | Vite's HMR makes development fast. React's component model keeps the UI modular and reusable — each section of the report is an isolated component. |
| **Express.js** | Lightweight and minimal. A single `POST /api/analyze` endpoint is all that's needed — Express is the perfect fit without the overhead of a heavier framework. |
| **LangChain.js** | Provides a clean abstraction for building the AI pipeline. `PromptTemplate` keeps the prompt separate from business logic, and `RunnableSequence` makes the chain steps explicit and readable. |
| **Google Gemini** | Gemini 2.5 Flash offers excellent reasoning quality at low latency and cost. The new `@google/genai` SDK (v2.x) supports the latest AI Studio API key format (`AQ...`). |
| **Structured JSON response** | Returning structured JSON instead of raw prose allows the frontend to render each field independently — enabling rich UI elements like score cards, badges, and collapsible sections. |
| **Modular folder structure** | Separating `routes/`, `controllers/`, `services/`, `langchain/`, and `utils/` follows the Single Responsibility Principle and makes the codebase easy to navigate, test, and extend. |
| **No database / no auth** | Intentionally excluded to keep the assignment focused on the core AI pipeline. Adding a database or authentication layer would be straightforward with this architecture. |

---

## Trade-offs

- **LLM Knowledge vs. Live Data** — The analysis is generated from Gemini's training knowledge, not live stock market data. This means the report reflects general knowledge about a company rather than real-time financials. For a production tool, integration with APIs like Yahoo Finance or Alpha Vantage would be required.

- **AI Reasoning vs. Quantitative Analysis** — The confidence score is an AI-generated estimate, not derived from a quantitative financial model. The reasoning quality depends on how well-known the company is in Gemini's training data.

- **No Caching** — Each request calls the Gemini API regardless of whether the same company was recently analyzed. Caching frequent queries (e.g., Redis with a 24-hour TTL) would reduce latency and API costs in production.

- **Single-Page Application** — The app has no routing, history, or saved reports. This keeps the scope tight and appropriate for an assignment but limits usability in a real product.

---

## Example Output

**Query:** `Samsung`

```json
{
  "company": "Samsung",
  "overview": "Samsung Electronics Co., Ltd. is a South Korean multinational conglomerate and the world's largest manufacturer of consumer electronics, semiconductors, and smartphones.",
  "industry": "Consumer Electronics / Semiconductors",
  "businessModel": "Samsung generates revenue across three segments: Device Solutions (memory and logic semiconductors), MX & Networks (Galaxy smartphones and 5G infrastructure), and Visual Display (TVs and appliances).",
  "strengths": [
    "Global leader in DRAM and NAND flash memory with dominant market share",
    "Vertically integrated — designs and manufactures its own chips, displays, and batteries",
    "Strong brand presence across 190+ countries"
  ],
  "risks": [
    "Cyclical memory chip market leads to volatile revenue and margins",
    "Intense competition from TSMC in advanced semiconductor foundry services",
    "Geopolitical exposure due to US–China trade tensions affecting supply chains"
  ],
  "recentTrends": "Samsung is aggressively ramping its 3nm and 2nm foundry capacity to compete with TSMC and win back Apple and NVIDIA as customers.",
  "growthOpportunities": "HBM (High Bandwidth Memory) demand from AI accelerator customers, foundry market share recovery, and Galaxy AI features driving premium smartphone upgrade cycles.",
  "recommendation": "Invest",
  "confidence": "70%",
  "reasoning": "Samsung's unmatched vertical integration and leadership in memory semiconductors position it well for the AI-driven demand surge in HBM and data center chips. Near-term foundry struggles are a concern, but the long-term structural case remains compelling for patient investors."
}
```

---

## Future Improvements

| Improvement | Description |
|---|---|
| 📡 **Real-time Financial APIs** | Integrate Yahoo Finance or Alpha Vantage for live stock price, P/E ratio, and revenue data |
| 📰 **News Integration** | Use LangChain's Tavily search tool to ground analysis with recent news articles |
| 📊 **Historical Stock Charts** | Embed interactive charts using Recharts or Chart.js |
| 🆚 **Company Comparison** | Allow side-by-side analysis of two companies |
| 🔐 **User Authentication** | Add Google OAuth to enable saved reports per user |
| 💾 **Saved Reports** | Store past analyses in MongoDB or PostgreSQL |
| 📄 **PDF Export** | Generate downloadable PDF reports using `jsPDF` or `Puppeteer` |
| 📁 **Portfolio Tracking** | Allow users to track a watchlist of analyzed companies |
| 🤖 **Multi-Agent Architecture** | Separate specialist agents for financial analysis, news analysis, and final recommendation synthesis |

---

## Deployment

### Frontend — Vercel

The React + Vite frontend can be deployed to [Vercel](https://vercel.com) in minutes:

```bash
# From the /frontend directory
npm run build
# Deploy the /dist folder to Vercel
```

Set the `VITE_API_URL` environment variable in Vercel's project settings if using a custom backend domain.

### Backend — Render / Railway

The Express backend can be deployed to [Render](https://render.com) or [Railway](https://railway.app):

1. Push the `/backend` folder to a GitHub repository
2. Connect the repo to Render / Railway
3. Set the following environment variables in the platform dashboard:

```
PORT=3001
GEMINI_API_KEY=your_production_api_key
```

> **Note:** Update the CORS origin in `server.js` to match your production frontend URL before deploying.

---

## Learning Outcomes

Building this project provided hands-on experience with:

| Area | What was learned |
|---|---|
| **LangChain.js** | Building AI pipelines using `PromptTemplate`, `RunnableSequence`, and `RunnableLambda` |
| **Prompt Engineering** | Writing structured prompts that instruct an LLM to return valid JSON with specific fields |
| **Gemini API** | Using the `@google/genai` SDK (v2.x) — including migrating from the deprecated `@google/generative-ai` SDK |
| **REST API Design** | Designing a clean single-endpoint API with proper validation and error responses |
| **React State Management** | Managing async loading, error, and result states using a custom hook (`useAnalyze`) |
| **Component Architecture** | Building a modular, reusable component system with clear separation of concerns |
| **Express.js** | Setting up middleware, routing, controller, service, and utility layers |
| **Framer Motion** | Implementing staggered animations, `AnimatePresence` transitions, and spring effects |
| **AI Application Design** | Understanding the end-to-end architecture of an LLM-powered web application |

---

## Author

**Your Name**
- 🐙 GitHub: [@your-username](https://github.com/your-username)
- 💼 LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---

## License

MIT — free to use, modify, and distribute.

---

> ⚠️ **Disclaimer:** This application is built for educational and demonstration purposes only. The AI-generated analysis does not constitute financial advice. Always consult a qualified financial advisor before making investment decisions.
