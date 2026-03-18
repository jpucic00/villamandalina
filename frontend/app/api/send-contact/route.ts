import { NextRequest, NextResponse } from "next/server";

const EMAILJS_SERVICE_ID = "service_s6zkdbo";
const EMAILJS_TEMPLATE_ID = "template_12fr9ge";
const EMAILJS_PUBLIC_KEY = "TO7HNsppourbFcFDU";
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;

export async function POST(request: NextRequest) {
  let templateParams: Record<string, string>;

  try {
    templateParams = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: templateParams,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(
        `[send-contact] EmailJS error: status=${response.status} body=${body} params=${JSON.stringify(templateParams)}`
      );
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[send-contact] Unexpected error sending contact email: ${err} params=${JSON.stringify(templateParams)}`);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
