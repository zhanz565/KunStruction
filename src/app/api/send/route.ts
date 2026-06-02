import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    // 1. STRICT CHECK: If the API key is missing, throw a massive, obvious error
    if (!process.env.RESEND_API_KEY) {
      console.error("🔴 CRITICAL ERROR: RESEND_API_KEY is missing from your .env.local file!");
      return NextResponse.json({ error: 'Missing API Key' }, { status: 500 });
    }

    // 2. Initialize Resend INSIDE the try/catch block
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    
    // Separate the formName and attachments, leaving the rest of the text data
    const { formName, attachments, ...formData } = body;

    let htmlContent = `<div style="font-family: sans-serif; max-w-2xl; margin: 0 auto; padding: 20px;">`;
    htmlContent += `<h2 style="color: #000; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px;">New ${formName}</h2>`;
    htmlContent += `<table style="width: 100%; border-collapse: collapse; margin-top: 20px;">`;

    if (Object.keys(formData).length > 0) {
      for (const [key, value] of Object.entries(formData)) {
        if (!value || (Array.isArray(value) && value.length === 0)) continue;
        const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
        const formattedValue = Array.isArray(value) ? value.join(', ') : value;
        htmlContent += `
          <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px 0; font-weight: bold; width: 30%; color: #555;">${formattedKey}</td>
            <td style="padding: 12px 0; color: #000;">${formattedValue}</td>
          </tr>
        `;
      }
    } else {
      htmlContent += `<tr><td style="padding: 12px 0; color: #555;">(Documents attached below)</td></tr>`;
    }

    htmlContent += `</table></div>`;

const { data, error } = await resend.emails.send({
      from: 'Kunstrucion Website <contact@kunstruction.ca>', // 👈 MUST USE YOUR VERIFIED DOMAIN
      to: ['Sophiachen0127@gmail.com'], 
      subject: `New Lead: ${formName}`,
      html: htmlContent,
      attachments: attachments || [], 
    });

    // If Resend rejects the email, print WHY to the terminal
    if (error) {
      console.error("🔴 RESEND REJECTED THE EMAIL:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    // If the API crashes anywhere else, print WHY
    console.error("🔴 BACKEND CRASHED:", error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}