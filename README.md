# Bharat Jeevan AI 🇮🇳

> **AI for every Indian — simple, accessible, useful and responsible.**

Bharat Jeevan AI is a student-developed web-based AI assistant designed around an India-focused vision. It brings secure, responsive, and clear AI assistance directly to phones and computers through a cloud-hosted web interface.

---

## 🏗️ Technical Architecture

```text
User's Phone / Laptop
       ↓
Bharat Jeevan AI Website (Vercel Frontend)
       ↓
Vercel Serverless Backend (/api/ai) [Secure Node.js]
       ↓
Google Gemini API (gemini-2.5-flash)
       ↓
AI Response Returned Securely
```

---

## 📂 Repository Structure

```text
bharat-jeevan-ai/
├── api/
│   └── ai.js           # Secure Vercel serverless function handling Gemini API
├── public/
│   ├── index.html      # Clean, mobile-responsive UI
│   ├── style.css       # India-inspired professional styling (Saffron, White, Green, Navy)
│   └── script.js       # Client-side chat interaction handler
├── package.json        # Node.js configuration & @google/genai SDK dependency
├── vercel.json         # Vercel deployment routing configuration
├── .gitignore          # Prevents sensitive files (.env) from being tracked
└── README.md           # Documentation
```

---

## 🚀 Deployment Instructions

1. **Create a GitHub Repository**
   - Create a new repository on GitHub named `bharat-jeevan-ai`.
   - Upload all files from this folder directly to your repository.

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com) and log in.
   - Click **Add New...** > **Project** and import your `bharat-jeevan-ai` GitHub repository.
   - Leave build settings as default (Vercel automatically detects Node.js and serverless routing).

3. **Configure the Secret Environment Variable**
   - In your Vercel Project Dashboard, navigate to **Settings** > **Environment Variables**.
   - Add the following variable:
     - **Key:** `GEMINI_API_KEY`
     - **Value:** `your_actual_google_ai_studio_api_key_here`
     - **Environments:** Production, Preview, Development
   - Click **Save**.

4. **Deploy**
   - Go to the **Deployments** tab and redeploy if needed. Your website will be live at `https://your-project.vercel.app`!
