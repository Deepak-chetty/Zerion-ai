# Zerion: AI-based Meeting Action-Item Extraction

Zerion is a modern web application designed to help students and professionals extract meaningful action items from meeting transcripts using AI. It provides a seamless experience for real-time transcription and analysis.

## 🚀 Features
- **Modern UI**: Dark mode with glassmorphism and smooth animations.
- **AI Extraction**: Powered by Google Gemini (1.5 Flash) for fast and accurate task identification.
- **Structured Output**: Clear breakdown of tasks, owners, deadlines, and priorities.
- **Video Conferencing**: Real-time video meetings powered by VideoSDK.
- **History & Auth**: Secure user authentication and persistent storage for past meeting summaries.

## 🛠️ Tech Stack
- **Frontend**: React + Vite (TS), Framer Motion, GSAP
- **Backend**: Express, MongoDB (Atlas), Mongoose
- **Auth**: JWT, BcryptJS
- **AI**: Google Generative AI (@google/generative-ai)
- **Deployment**: Netlify (Frontend), (Self-hosted/Cloud Node.js backend)

## 🚦 Getting Started

### 1. Prerequisites
- Node.js (v20 or higher)
- Google Gemini API Key
- VideoSDK API Key

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in your keys in `.env.local`:
   - `VITE_GEMINI_API_KEY`: Get from Google AI Studio.
   - `VITE_VIDEOSDK_TOKEN`: Get from VideoSDK Dashboard.

### 4. Running the Project
```bash
npm run dev
```

The app will run on `http://localhost:5173`.

## 📁 Project Structure
- `src/`: React frontend application.
- `public/`: Static assets and images.

## 🎓 Context
This project was developed to demonstrate the practical application of LLMs and real-time communication in productivity tools.

## ⚖️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
