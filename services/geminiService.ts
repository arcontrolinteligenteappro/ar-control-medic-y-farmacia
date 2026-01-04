import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY || ''; 
  // Note: In a real scenario, we handle missing keys gracefully. 
  // For this demo, we assume the environment injects it or we handle the error at call time.
  return new GoogleGenAI({ apiKey });
};

export const analyzeSymptoms = async (symptoms: string, patientHistory: string): Promise<string> => {
  try {
    const ai = getClient();
    if (!process.env.API_KEY) return "Error: API Key not configured.";

    const prompt = `
      Act as a medical assistant for a doctor using the PharmaClic system.
      Analyze the following patient symptoms and history.
      Provide a brief summary of potential causes and suggest 3 relevant follow-up questions.
      
      Patient History: ${patientHistory}
      Current Symptoms: ${symptoms}
      
      Format:
      - Summary: [Text]
      - Potential Causes: [List]
      - Recommended Questions: [List]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No analysis could be generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI Assistant. Please check your network or API key.";
  }
};

export const checkDrugInteractions = async (medications: string[]): Promise<string> => {
   try {
    const ai = getClient();
    if (!process.env.API_KEY) return "Error: API Key not configured.";

    const prompt = `
      Analyze the following list of medications for potential adverse drug interactions.
      
      Medications: ${medications.join(', ')}
      
      Return a safety warning level (Low, Medium, High) and details.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No interaction data found.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error checking interactions.";
  }
}
