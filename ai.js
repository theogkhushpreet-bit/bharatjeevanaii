import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ success: false, error: 'Message cannot be empty.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ success: false, error: 'Server configuration error: API key missing on server.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemPersona = "You are Bharat Jeevan AI, an India-focused student-developed AI assistant designed to provide helpful, clear, and responsible information. Be polite, clear, avoid unnecessarily complicated language, help students understand concepts, and use Indian context when relevant. Do not pretend to be an official government service.";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `${systemPersona}\n\nUser Question: ${message}` }] }
      ]
    });

    const answer = response.text || "I'm sorry, I couldn't generate a response right now.";

    return res.status(200).json({
      success: true,
      answer: answer
    });

  } catch (error) {
    console.error('Gemini API Error:', error);

    let errorMessage = 'An error occurred while processing your request.';
    if (error.status === 429 || (error.message && error.message.includes('rate limit'))) {
      errorMessage = 'Rate limit reached. Please try again in a moment.';
    } else if (error.status === 403 || (error.message && error.message.includes('API key'))) {
      errorMessage = 'Authentication error with AI provider.';
    }

    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}
