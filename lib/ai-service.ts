// lib/ai-service.ts - UPDATED VERSION
'use client';

interface UserData {
  name: string;
  grade: string;
  interests: string[];
  aptitude: Record<string, {score: number, response: string}>;
  essay: string;
}

interface Recommendation {
  sector: string;
  match_percentage: number;
  explanation: string;
  cbc_subjects: string[];
  skills_to_develop: string[];
  resources: string[];
  next_steps: string[];
}

interface AIResponse {
  overall_advice: string;
  recommendations: Recommendation[];
}

// Simple error message instead of fallback data
const ERROR_RESPONSE: AIResponse = {
  overall_advice: "⚠️ Unable to connect to AI service at the moment. Please check your internet connection and try again. If the problem persists, the AI service might be temporarily unavailable.",
  recommendations: [
    {
      sector: "Service Temporarily Unavailable",
      match_percentage: 0,
      explanation: "We're unable to generate personalized recommendations right now. Please try again in a few moments.",
      cbc_subjects: ["Please retry the analysis"],
      skills_to_develop: ["Check your connection", "Refresh the page", "Try again later"],
      resources: ["Contact support if issue persists"],
      next_steps: ["Refresh the page", "Check your internet", "Try again in 5 minutes"]
    }
  ]
};

// Helper to map interests to readable names
const getInterestName = (id: string): string => {
  const interestMap: Record<string, string> = {
    'tech': 'Technology & Digital Innovation',
    'agri': 'Modern Agriculture & Agribusiness',
    'eng': 'Engineering & Manufacturing',
    'health': 'Health & Biomedical Sciences',
    'creative': 'Creative Economy & Media',
    'geo': 'Geospatial Technologies & Climate Solutions'
  };
  return interestMap[id] || id;
};

// Build optimized prompt for Gemini
const buildOptimizedPrompt = (userData: UserData): string => {
  // Format aptitude responses
  const aptitudeText = Object.entries(userData.aptitude)
    .map(([key, value]) => `${key}: ${value.response} (score: ${value.score}/10)`)
    .join('\n');

  return `You are an AI Career Pathway Advisor for Kenyan CBC students under Vision 2030.
Analyze this profile and provide personalized career recommendations.

STUDENT PROFILE:
- Name: ${userData.name}
- Grade: ${userData.grade}
- Interests: ${userData.interests.map(getInterestName).join(', ')}
- Aptitude Assessment:
${aptitudeText}
- Personal Essay: "${userData.essay || 'No essay provided'}"

REQUIREMENTS:
1. Provide 2-3 career pathway recommendations
2. For each, include:
   - Sector name
   - Match percentage (0-100)
   - Detailed explanation of why it fits
   - 4 CBC subjects to focus on
   - 4 skills to develop
   - 3 Kenyan resources/institutions
   - 4 actionable next steps

FORMAT: Return ONLY valid JSON:
{
  "overall_advice": "string",
  "recommendations": [
    {
      "sector": "string",
      "match_percentage": number,
      "explanation": "string",
      "cbc_subjects": ["string", "string", "string", "string"],
      "skills_to_develop": ["string", "string", "string", "string"],
      "resources": ["string", "string", "string"],
      "next_steps": ["string", "string", "string", "string"]
    }
  ]
}

Focus on practical, realistic advice for Kenyan students.`;
};

// Helper to parse AI response with better error handling
const parseAIResponse = (text: string): AIResponse => {
  try {
    console.log('📝 Attempting to parse AI response...');
    
    // Clean the text - remove markdown code blocks
    let cleanText = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .replace(/^JSON:\s*/i, '')
      .trim();
    
    // Try to extract JSON if it's wrapped in other text
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanText = jsonMatch[0];
    }
    
    const parsed = JSON.parse(cleanText);
    
    // Validate the response structure
    if (!parsed.overall_advice || !Array.isArray(parsed.recommendations)) {
      console.error('Invalid response structure:', parsed);
      throw new Error('Invalid response structure from AI');
    }
    
    console.log('✅ Successfully parsed AI response');
    return parsed;
    
  } catch (error) {
    console.error('❌ Failed to parse AI response:', error);
    console.log('Raw text that failed:', text.substring(0, 500));
    throw new Error('Failed to parse AI response');
  }
};

export async function getAIRecommendations(userData: UserData): Promise<AIResponse> {
  console.log('🔍 Starting AI analysis for:', userData.name);
  
  // Try to get API key from environment (works in both dev and prod)
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  console.log('🔑 Environment check:', {
    hasEnvKey: !!API_KEY,
    envKeyLength: API_KEY?.length || 0,
    envKeys: Object.keys(process.env).filter(key => key.includes('GEMINI') || key.includes('API'))
  });

  if (!API_KEY) {
    console.error('❌ API key not found in environment variables');
    console.log('⚠️ Please ensure NEXT_PUBLIC_GEMINI_API_KEY is set in your environment');
    return ERROR_RESPONSE;
  }

  try {
    const prompt = buildOptimizedPrompt(userData);
    console.log('📤 Prompt built, sending to Gemini...');

    
    const MODEL_ID = 'gemini-2.5-flash-lite';
    console.log(`🎯 Using model: ${MODEL_ID}`);

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;
    console.log('🌐 API URL:', apiUrl.replace(API_KEY, '***'));

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ 
          parts: [{ text: prompt }] 
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2000,
        }
      })
    });

    console.log(`📊 Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText.substring(0, 500)
      });
      
      // Try alternative model if the first fails
      if (response.status === 404 || errorText.includes('model not found')) {
        console.log('🔄 Trying alternative model (gemini-pro)...');
        
        const altUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;
        const altResponse = await fetch(altUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2000,
            }
          })
        });
        
        if (altResponse.ok) {
          const altData = await altResponse.json();
          const text = altData.candidates?.[0]?.content?.parts?.[0]?.text || '';
          return parseAIResponse(text);
        }
      }
      
      throw new Error(`API request failed: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Received API response');
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!text) {
      console.error('No response text in API response');
      throw new Error('Empty response from AI');
    }

    console.log('📝 Raw response length:', text.length, 'characters');
    return parseAIResponse(text);
    
  } catch (error) {
    console.error('💥 AI Service Error:', error);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('🌐 Network error detected - check internet connection');
      return {
        ...ERROR_RESPONSE,
        overall_advice: "🌐 Network connection issue. Please check your internet connection and try again."
      };
    }
    
    // Check if it's an API key error
    if (error instanceof Error && error.message.includes('API key')) {
      console.error('🔑 API key error detected');
      return {
        ...ERROR_RESPONSE,
        overall_advice: "🔑 API configuration issue. Please check your API key configuration."
      };
    }
    
    return ERROR_RESPONSE;
  }
}

// Optional: Add a test function for debugging
export async function testAIConnection(): Promise<boolean> {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!API_KEY) {
    console.error('No API key found for test');
    return false;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: 'Say "OK" if working' }]
          }],
          generationConfig: {
            maxOutputTokens: 10,
          }
        })
      }
    );

    const data = await response.json();
    console.log('🧪 Test response:', data);
    return response.ok;
  } catch (error) {
    console.error('Test failed:', error);
    return false;
  }
}