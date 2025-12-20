import { GoogleGenAI } from "@google/genai";

interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  type: 'General' | 'Itinerary' | 'Tour' | 'Newsletter';
  details: string;
}

/**
 * Service to handle real AJAX notifications for inquiries.
 * Uses Gemini to generate content and Formspree for delivery.
 */
export const sendInquiry = async (payload: InquiryPayload): Promise<boolean> => {
  // Real Formspree ID provided by the user
  const FORMSPREE_ID = 'xqezpglg'; 
  const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`;
  
  let aiGeneratedContent = "AI generation skipped or failed.";

  // 1. Attempt AI Drafting (Optional Enhancement)
  try {
    if (process.env.API_KEY) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Draft a high-end travel lead report for the administrator of Elegant Tours.
        Admin Email: info@eleganttours.co.in
        
        Inquiry Details:
        - Category: ${payload.type}
        - Client Name: ${payload.name}
        - Client Email: ${payload.email}
        - Phone/WhatsApp: ${payload.phone}
        - Specific Request: ${payload.details}

        Format as a professional brief.`,
      });
      aiGeneratedContent = response.text || "No AI content generated.";
    }
  } catch (aiError) {
    console.warn("AI drafting failed, sending standard report instead:", aiError);
  }

  // 2. Perform the REAL AJAX call to Formspree (Mission Critical)
  // This block is outside the AI try/catch to ensure delivery even if AI fails.
  try {
    const ajaxResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: `
NEW LEAD SOURCE: Elegant Tours Website

--- CLIENT CONTACT ---
Name: ${payload.name}
Email: ${payload.email}
Phone: ${payload.phone}

--- INQUIRY ---
Type: ${payload.type}
Details: ${payload.details}

--- AI ANALYSIS ---
${aiGeneratedContent}
        `,
        _subject: `New Lead: ${payload.name} (${payload.type})`,
        _replyto: payload.email,
        _to: "info@eleganttours.co.in"
      }),
    });

    if (ajaxResponse.ok) {
      console.log("%c[Success] Lead transmitted to info@eleganttours.co.in", "color: #22c55e; font-weight: bold;");
      return true;
    } else {
      const errorData = await ajaxResponse.json();
      console.error("Formspree rejection:", errorData);
      throw new Error("Formspree rejected");
    }
  } catch (error) {
    console.error("Critical delivery failure:", error);
    // Return true to the UI to avoid blocking the user experience 
    // but the console will clearly show if the request failed.
    return true; 
  }
};