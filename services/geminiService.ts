import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation, RecommendationRequest } from "../types";

const AGENCY_SYSTEM_INSTRUCTION = `
You are the Lead Tour Expert for "Elegant Tours", specializing EXCLUSIVELY in the Sundarbans Mangrove Forest. 
Your agency's expertise focuses on:
1. Royal Bengal Tiger expeditions and mangrove boat stays.
2. Eco-tourism and village immersion tours in the Sundarbans region.
3. Logistics for groups visiting watchtowers like Sajnekhali, Sudhanyakhali, and Dobanki.

CRITICAL INSTRUCTION: 
When a user asks for recommendations, you MUST focus on specific locations within the Sundarbans. 
- Suggest watchtowers for wildlife sightings.
- Suggest private houseboats or eco-resorts.
- Tailor activities to the specified guest count and duration (typically 2-4 days).
- DO NOT mention specific prices or estimated costs. All pricing is provided on request.
`;

export const getTravelRecommendations = async (req: RecommendationRequest): Promise<AIRecommendation[]> => {
  // Fresh instance created right before making an API call
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Plan a Sundarbans expedition based on:
    Mood: ${req.mood}
    Budget Tier: ${req.budget} (Provide quality accordingly but do not list price)
    Duration: ${req.duration}
    Explorers: ${req.guests}
    Specific Needs: ${req.preferences}
    
    Suggest 3 distinct Sundarbans experiences (e.g., Deep Forest, Village Culture, Luxury Cruise).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: AGENCY_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            destination: { type: Type.STRING, description: "Area in Sundarbans" },
            reason: { type: Type.STRING },
            suggestedActivities: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          },
          required: ["destination", "reason", "suggestedActivities"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
};

export const generateDreamDestinationImage = async (prompt: string): Promise<string | null> => {
  try {
    // Fresh instance created right before making an API call
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A cinematic wildlife travel photograph of Sundarbans: ${prompt}. Royal Bengal Tiger, mangrove roots, mist, 8k, photorealistic.` }]
      },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch (error) {
    return null;
  }
};