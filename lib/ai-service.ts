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

const FALLBACK_RECOMMENDATIONS: AIResponse = {
  overall_advice: "Based on your profile, consider exploring opportunities aligned with Kenya's Vision 2030. Focus on building practical skills through the CBC curriculum.",
  recommendations: [
    {
      sector: "Technology & Digital Innovation",
      match_percentage: 85,
      explanation: "Your interests in tech and strong aptitude scores indicate a good fit for digital careers, leveraging Kenya's growing tech hub.",
      cbc_subjects: ["Mathematics", "Computer Science", "Physics", "English"],
      skills_to_develop: ["Programming", "Data Analysis", "Problem Solving", "Communication"],
      resources: ["Kenya ICT Board", "Nairobi Tech Community", "Online Courses on Coursera"],
      next_steps: ["Enroll in coding bootcamps", "Participate in tech hackathons", "Build personal projects", "Network with industry professionals"]
    },
    {
      sector: "Engineering & Manufacturing",
      match_percentage: 78,
      explanation: "Your practical interests and aptitude align with engineering, supporting Vision 2030's infrastructure goals.",
      cbc_subjects: ["Mathematics", "Physics", "Chemistry", "Design & Technology"],
      skills_to_develop: ["Technical Drawing", "Project Management", "Innovation", "Teamwork"],
      resources: ["Kenya Engineers Registration Board", "Jomo Kenyatta University", "Industrial Attachments"],
      next_steps: ["Pursue STEM clubs", "Attend engineering workshops", "Gain work experience", "Apply for scholarships"]
    }
  ]
};

// Update the buildOptimizedPrompt function
const buildOptimizedPrompt = (userData: UserData): string => {
  const interestMap: Record<string, string> = {
    'tech': 'Technology & Digital Innovation',
    'agri': 'Modern Agriculture & Agribusiness',
    'eng': 'Engineering & Manufacturing',
    'health': 'Health & Biomedical Sciences',
    'creative': 'Creative Economy & Media',
    'geo': 'Geospatial Technologies & Climate Solutions'
  };

  // Format aptitude responses
  const aptitudeText = Object.entries(userData.aptitude)
    .map(([key, value]) => `${key}: ${value.response} (score: ${value.score}/10)`)
    .join('\n');

  return `Analyze this Kenyan student profile for career pathway recommendations:

STUDENT: ${userData.name}, Grade ${userData.grade}
INTERESTS: ${userData.interests.map(id => interestMap[id] || id).join(', ')}
APTITUDE RESPONSES:
${aptitudeText}
PERSONAL ESSAY: "${userData.essay || 'No essay provided'}"

Provide 2-3 detailed pathway recommendations with:
1. Match percentage (0-100)
2. Explanation why it fits their specific profile
3. CBC subjects to focus on
4. Skills to develop
5. Kenyan resources
6. Actionable next steps

Focus on Kenya's Vision 2030 and CBC curriculum. Be practical and realistic.

Return ONLY JSON:
{
  "overall_advice": "string",
  "recommendations": [
    {
      "sector": "string",
      "match_percentage": number,
      "explanation": "string",
      "cbc_subjects": ["string","string","string","string"],
      "skills_to_develop": ["string","string","string","string"],
      "resources": ["string","string","string"],
      "next_steps": ["string","string","string","string"]
    }
  ]
}`;
};

export async function getAIRecommendations(userData: UserData): Promise<AIResponse> {
  const API_KEY = process.env.GEMINI_API_KEY
;
  
  console.log('🔍 AI Service called with detailed data:', userData);

  if (!API_KEY) {
    console.error('❌ NO API KEY FOUND - Using fallback');
    return FALLBACK_RECOMMENDATIONS;
  }

  try {
    const prompt = buildOptimizedPrompt(userData);

    console.log('🚀 Sending detailed analysis to Gemini API...');
    
    const MODEL_ID = 'gemini-2.5-flash-lite';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 2000,
            responseMimeType: 'application/json',
            responseSchema: {
              type: 'object',
              properties: {
                overall_advice: { type: 'string' },
                recommendations: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      sector: { type: 'string' },
                      match_percentage: { type: 'number' },
                      explanation: { type: 'string' },
                      cbc_subjects: { type: 'array', items: { type: 'string' } },
                      skills_to_develop: { type: 'array', items: { type: 'string' } },
                      resources: { type: 'array', items: { type: 'string' } },
                      next_steps: { type: 'array', items: { type: 'string' } }
                    },
                    required: ['sector', 'match_percentage', 'explanation', 'cbc_subjects', 'skills_to_develop', 'resources', 'next_steps']
                  }
                }
              },
              required: ['overall_advice', 'recommendations']
            }
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Full API Response:', JSON.stringify(data, null, 2));
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    if (!text) {
      console.error('No response text from AI');
      throw new Error('No response text from AI');
    }

    console.log('📝 Raw AI Response:', text);

    // Try to parse the response
    try {
      const parsed = JSON.parse(text);
      console.log('✅ Successfully parsed AI recommendations:', parsed);
      return parsed;
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError);
      console.error('Raw text that failed to parse:', text);
      
      // Try to extract JSON from markdown code blocks
      const codeBlockMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
      if (codeBlockMatch) {
        try {
          const parsed = JSON.parse(codeBlockMatch[1]);
          console.log('✅ Parsed from code block');
          return parsed;
        } catch (e) {
          console.error('Failed to parse from code block');
        }
      }
      
      throw parseError;
    }
    
  } catch (error) {
    console.error('❌ AI Service Error:', error);
    return FALLBACK_RECOMMENDATIONS;
  }
}