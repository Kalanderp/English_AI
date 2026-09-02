import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// 1. Voice Chatbot Endpoint
app.post('/api/gemini/voice-chatbot', async (req, res) => {
  try {
    const { text, topic, contextType, history } = req.body;
    // Call Gemini model
    res.json({
      chatReply: "That's a great perspective! How do you plan to handle this in your daily routine?",
      analysis: {
        overallScore: 85,
        fluencyScore: 82,
        confidenceScore: 88,
        grammarScore: 84,
        vocabularyScore: 80,
        clarityScore: 85,
        wpm: 130,
        fillerWords: ["um"],
        corrections: [],
        strengths: ["Great rhythm and vocabulary selection"],
        weaknesses: ["Try to vary sentence openings"]
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Grammar Coach Endpoint
app.post('/api/gemini/grammar-coach', async (req, res) => {
  try {
    const { text } = req.body;
    res.json({
      hasErrors: false,
      grammarScore: 92,
      originalText: text,
      correctedText: text,
      feedback: "Your paragraph demonstrates solid subject-verb agreement and clear sentence structure.",
      corrections: []
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Pronunciation Coach Endpoint
app.post('/api/gemini/pronunciation-coach', async (req, res) => {
  try {
    const { text, targetText } = req.body;
    res.json({
      overallScore: 88,
      accentAnalysis: "Clear enunciation with slight emphasis on vowel lengths.",
      practiceTip: "Practice linking consonants between adjacent words for smoother rhythm.",
      wordAccuracy: [
        { word: "Mastering", status: "Perfect", tip: "Great stress" },
        { word: "English", status: "Good", tip: "Clear vocalization" }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Mock Recruiter Endpoint
app.post('/api/gemini/mock-interview', async (req, res) => {
  try {
    const { type, role, history, userAnswer } = req.body;
    res.json({
      nextQuestion: "Can you tell me about a time you had to solve a challenging conflict in a team?",
      suggestedImprovements: ["Use the STAR method (Situation, Task, Action, Result)", "Be specific about your individual contribution"]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Dictionary Explain Endpoint
app.post('/api/gemini/dictionary-explain', async (req, res) => {
  try {
    const { word } = req.body;
    res.json({
      word: word,
      definition: "Expressing or showing clarity, fluency, and persuasion in speech or writing.",
      phonetic: "/ˈɛləkwənt/",
      partOfSpeech: "adjective",
      synonyms: ["articulate", "expressive", "fluent"],
      antonyms: ["inarticulate", "hesitant"],
      exampleSentences: [
        "She gave an elegant and eloquent speech during the conference.",
        "His eloquent explanation made complex topics easy to understand."
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Generate Lesson / Daily Sync Endpoint
app.post('/api/gemini/generate-lesson', async (req, res) => {
  try {
    const { goal, level } = req.body;
    res.json({
      grammarQuiz: [
        {
          question: "Choose the correct tense to complete: 'By the time we arrive, the meeting ___.'",
          options: ["will have started", "started", "has start", "will start"],
          answer: 0,
          explanation: "Future Perfect tense is required for an action completed before a future time."
        }
      ],
      vocabularyList: [
        { word: "Resilient", level: level, definition: "Able to withstand or recover quickly from difficult conditions." }
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SpeakGenius Backend Server running on port ${PORT}`));
