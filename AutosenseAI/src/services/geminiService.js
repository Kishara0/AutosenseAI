import { GoogleGenerativeAI } from '@google/generative-ai';
import { CONFIG } from '../constants/config';

// Initialize Gemini
// Safety check: only initialize if key is present to avoid immediate crash
let genAI = null;
let model = null;

if (CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE') {
    genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
}

const MOCK_DIAGNOSIS = {
    title: "Worn Engine Belt",
    confidence: 94,
    description: "Based on the chirping noise and your vehicle information (Toyota Camry, 2018), it is highly likely that the serendippentine belt is worn or loose. This is common at this mileage.",
    urgency: "Moderate",
    costEstimate: "$75 - $200",
    recommendation: "Inspect the belt for cracks or fraying. If confirmed, replace it soon to avoid failure."
};

const geminiService = {
    /**
     * Generates a diagnosis based on vehicle info and reported symptoms.
     */
    generateDiagnosis: async (vehicle, symptoms, userDescription) => {
        // Re-initialize if key was added late (e.g. via fast refresh)
        if (!model && CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY !== 'YOUR_API_KEY_HERE') {
            genAI = new GoogleGenerativeAI(CONFIG.GEMINI_API_KEY);
            model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        }

        if (!model) {
            console.warn("Gemini API Key missing or invalid. Using MOCK response.");
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
            return MOCK_DIAGNOSIS;
        }

        try {
            const prompt = `
                Act as an expert automotive mechanic AI. 
                
                Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}, Mileage: ${vehicle.mileage}
                Reported Symptoms: ${symptoms.join(', ')}
                User Description: "${userDescription}"
                
                Analyze the situation and provide a diagnosis in valid JSON format with the following structure:
                {
                    "title": "Short Diagnosis Title",
                    "confidence": 0-100 (integer),
                    "description": "Concise explanation of the issue (max 2 sentences).",
                    "urgency": "Low|Moderate|High|Critical",
                    "costEstimate": "Estimated price range (e.g., $50-$100)",
                    "recommendation": "Actionable advice."
                }
                Do not include markdown formatting like \`\`\`json. Just the raw JSON.
            `;

            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            // Basic cleanup to ensure JSON parsing works
            const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

            return JSON.parse(cleanText);

        } catch (error) {
            console.error("Gemini Diagnosis Error:", error);

            let errorMessage = "We couldn't reach the AI mechanic. Please check your connection.";
            let errorTitle = "Diagnosis Error";

            if (error.message.includes('429') || error.message.includes('Quota')) {
                errorMessage = "The AI is currently receiving too many requests. Please try again in moments.";
                errorTitle = "Server Busy";
            } else if (error.message.includes('404')) {
                errorMessage = "The selected AI model is currently unavailable or the API key is invalid for this model.";
                errorTitle = "Model Unavailable";
            }

            return {
                ...MOCK_DIAGNOSIS,
                title: errorTitle,
                description: errorMessage,
                confidence: 0,
                isError: true // Flag to show retry in UI
            };
        }
    },

    /**
     * Continues a chat conversation.
     */
    chatWithMechanic: async (history, newMessage) => {
        if (!model) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return "I'm currently in offline mode. Please add a valid API key to chat with me for real!";
        }

        try {
            // Convert history to Gemini format if needed, or just send a fresh prompt with context
            // For simplicity in this demo, we'll send a structured prompt
            const prompt = `
                You are a helpful AI mechanic. 
                Previous context: ${JSON.stringify(history)}
                User asks: "${newMessage}"
                
                Provide a helpful, safe, and concise response.
            `;

            const result = await model.generateContent(prompt);
            return result.response.text();

        } catch (error) {
            console.error("Gemini Chat Error:", error);
            if (error.message.includes('429') || error.message.includes('Quota')) {
                return "I'm currently overloaded with requests (Rate Limit). Please ask me again in a few seconds.";
            }
            return "I'm having trouble connecting right now. Please try again later.";
        }
    }
};

export default geminiService;
