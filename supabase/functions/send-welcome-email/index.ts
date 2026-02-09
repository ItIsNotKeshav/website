// Supabase Edge Function — Send Welcome Email via Resend
// Deploy with: supabase functions deploy send-welcome-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Prmpt <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS pre-flight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, name } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send welcome email via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "🎉 Welcome to the Prmpt Waitlist!",
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Prmpt</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F5F0;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F5F0;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); padding: 40px 40px 32px;">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                🍃 Prmpt
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2 style="margin:0 0 16px;font-size:24px;font-weight:700;color:#1A1A1A;">
                You're on the waitlist! 🎉
              </h2>
              
              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#71717A;">
                Hey${name ? ` ${name}` : ""},
              </p>

              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#71717A;">
                Thanks for signing up for <strong style="color:#1A1A1A;">Prmpt</strong> — the intelligent AI prompt assistant built for modern creators. We're thrilled to have you on board.
              </p>

              <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#71717A;">
                You're now on our exclusive early access list. Here's what happens next:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td style="padding:16px 20px;background-color:#F5F5F0;border-radius:12px;border-left:4px solid #2563EB;">
                    <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#1A1A1A;">✨ What to expect:</p>
                    <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8;color:#71717A;">
                      <li>Early access invite before public launch</li>
                      <li>Exclusive updates on features &amp; progress</li>
                      <li>A chance to shape the product with your feedback</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#71717A;">
                We're building something we truly believe in — a tool that makes AI work <em>for you</em>, not the other way around. Your support means the world to us.
              </p>

              <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#1A1A1A;font-weight:600;">
                Stay tuned,
              </p>
              <p style="margin:0;font-size:16px;line-height:1.7;color:#71717A;">
                Aarush &amp; Prabhat<br/>
                <span style="color:#2563EB;font-weight:600;">Team Prmpt</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background-color:#F5F5F0;border-top:1px solid #E5E5E0;">
              <p style="margin:0;font-size:12px;color:#71717A;text-align:center;">
                © 2026 Prmpt. All rights reserved.<br/>
                <a href="mailto:teamprmpt@gmail.com" style="color:#2563EB;text-decoration:none;">teamprmpt@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return new Response(JSON.stringify({ error: "Failed to send email", details: data }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
