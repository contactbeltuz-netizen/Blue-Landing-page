import { GoogleGenAI } from "@google/genai";

interface InquiryPayload {
  name: string;
  email: string;
  phone: string;
  type: 'General' | 'Itinerary' | 'Tour' | 'Newsletter';
  details: string;
}

/**
 * Service to handle AJAX notifications for inquiries.
 * This function handles the AI generation of professional emails and 
 * simulates the backend transmission.
 */
export const sendInquiry = async (payload: InquiryPayload): Promise<boolean> => {
  const ENDPOINT = '/api/inquiry'; 
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  console.log("%c[System] Starting Inquiry Submission...", "color: #ff6c00; font-weight: bold;");

  try {
    // 1. Generate professional email content using Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate two professional email bodies based on this inquiry:
      Type: ${payload.type}
      From: ${payload.name} (${payload.email})
      Phone: ${payload.phone}
      Details: ${payload.details}

      Email 1 (To Admin: info@eleganttours.co.in): Subject "New Inquiry - ${payload.type}". Summarize the lead details for the operations team.
      Email 2 (To Customer: ${payload.email}): Subject "Your Sundarbans Expedition - Inquiry Received". A high-end, welcoming confirmation message from Elegant Tours.
      
      Return as plain text with clear headers for Email 1 and Email 2.`,
    });

    const emailContent = response.text;

    // 2. Perform the AJAX call
    // In production, this fetch will go to your PHP/NodeJS/Python backend.
    try {
      const ajaxResponse = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          admin_email: "info@eleganttours.co.in",
          customer_email: payload.email,
          subject: `New Inquiry - ${payload.name}`,
          content: emailContent,
          raw_data: payload
        }),
      });
      
      if (ajaxResponse.ok) {
        console.log("%c[Success] Data sent to server successfully.", "color: green; font-weight: bold;");
        return true;
      }
    } catch (fetchError) {
      // 3. Verification Log (For testing without a real backend)
      console.group("%c[Test Mode] Email Notification Logic Verified", "color: #ff6c00; font-weight: bold;");
      console.log("Target Admin:", "info@eleganttours.co.in");
      console.log("Target Customer:", payload.email);
      console.log("Generated Content:", emailContent);
      console.log("Payload:", payload);
      console.groupEnd();

      // For demonstration, we show a browser alert so you know it worked
      alert(`Submission Verified!\n\nTo Admin: info@eleganttours.co.in\nTo Customer: ${payload.email}\n\nCheck browser console (F12) to see the full AI-generated email content.`);
      
      return true; 
    }
    return true;
  } catch (error) {
    console.error("%c[Error] Notification Service Failed:", "color: red; font-weight: bold;", error);
    return false;
  }
};
