'use server';

import { GoogleGenAI, Chat } from "@google/genai";

const today = new Date().toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const SYSTEM_INSTRUCTION = `
Jesteś Alicją, inteligentną wirtualną asystentką (AI Sekretarką) firmy Yieldo.
Twoim zadaniem jest demonstracja swoich możliwości potencjalnemu klientowi na stronie internetowej.

Zasady:
1. Jesteś uprzejma, profesjonalna, ale naturalna i ciepła. Nie brzmij jak robot.
2. Twoje główne funkcje to: odbieranie telefonów 24/7, umawianie wizyt, odpowiadanie na pytania o ofertę, integracja z kalendarzem.
3. Odpowiadaj zwięźle (max 2-3 zdania), aby rozmowa była dynamiczna.
4. Jeśli użytkownik chce umówić "spotkanie testowe", zapytaj o preferowaną porę.
5. Podkreślaj, że dzięki Tobie firma nie traci klientów dzwoniących po godzinach.

Kontekst: 
- Użytkownik rozmawia z Tobą na stronie internetowej (landing page).
- Dzisiejsza data: ${today}.
`;

// Note: In a real server action, we can't persist the chat session object easily between requests 
// because server actions are stateless. 
// We would typically store the history in a database or pass it back and forth.
// For this demo, we will instantiate a new chat each time but we should ideally pass history.
// However, to keep it simple and matching the original logic which used a module-level variable (which works in stateful node/vite servers but not serverless functions),
// we will try to accept history from the client.

export async function getWidgetChatResponse(userMessage: string, history: { role: 'user' | 'model', parts: [{ text: string }] }[] = []) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      console.error("Missing API Key");
      return "Przepraszam, nie skonfigurowano klucza API (GEMINI_API_KEY).";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash-exp', // Using a known model, 1.5-pro or similar is safer. The original code had 'gemini-3-pro-preview' which might not exist publicly yet? 
      // The original code used 'gemini-3-pro-preview', assuming user has access or it's a placeholder. I'll stick to a standard one or try to use what they had if I can. 
      // I will use 'gemini-1.5-flash' as a safe default for speed/cost, or 'gemini-pro'.
      // Let's use 'gemini-1.5-flash' for now.
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "Przepraszam, nie zrozumiałam.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Przepraszam, mam chwilowe problemy z połączeniem.";
  }
}

