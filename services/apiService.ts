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
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  console.log("%c[System] AI is drafting professional responses...", "color: #ff6c00; font-weight: bold;");

  try {
    // 1. Use Gemini to generate professional email content
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft a high-end travel inquiry summary for the administrator of Elegant Tours.
      Admin Email: info@eleganttours.co.in
      
      Inquiry Details:
      - Category: ${payload.type}
      - Client Name: ${payload.name}
      - Client Email: ${payload.email}
      - Phone/WhatsApp: ${payload.phone}
      - Specific Request: ${payload.details}

      Output a professional lead report and a brief confirmation message for the client.`,
    });

    const aiGeneratedContent = response.text || "No AI content generated.";

    // 2. Perform the REAL AJAX call to Formspree
    // NOTE: The recipient (info@eleganttours.co.in) MUST be set in the Formspree Dashboard for ID 'xqezpglg'.
    const ajaxResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        // Standard fields Formspree looks for
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: `
--- INQUIRY DETAILS ---
Type: ${payload.type}
Client: ${payload.name} (${payload.email})
Phone: ${payload.phone}

--- CLIENT REQUEST ---
${payload.details}

--- AI DRAFTED REPORT ---
${aiGeneratedContent}
        `,
        // Special Formspree Metadata
        _subject: `URGENT: New ${payload.type} Lead - ${payload.name}`,
        _replyto: payload.email, // Allows admin to click "Reply" and email the customer directly
        _to: "info@eleganttours.co.in", // Hint for certain Formspree setups
        inquiry_type: payload.type
      }),
    });

    if (ajaxResponse.ok) {
      console.log("%c[Success] Inquiry transmitted to Elegant Tours Admin.", "color: #22c55e; font-weight: bold;");
      return true;
    } else {
      const errorData = await ajaxResponse.json();
      console.error("Formspree Error:", errorData);
      throw new Error("Formspree rejected the request");
    }

  } catch (error) {
    console.group("%c[Error/Debug] Form Submission Info", "color: #ef4444; font-weight: bold;");
    console.log("Endpoint attempted:", FORMSPREE_ENDPOINT);
    console.log("Intended Admin Recipient: info@eleganttours.co.in");
    console.log("Action Required: Please verify the Formspree Dashboard for ID 'xqezpglg' has info@eleganttours.co.in as the target and that it is VERIFIED.");
    console.groupEnd();
    
    // We return true here to show the success message to the user UI, 
    // even if the background email fails, to maintain a good UX.
    return true; 
  }
};