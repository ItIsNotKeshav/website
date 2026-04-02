import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function sanitizeString(str: string): string {
  return str.trim().replace(/[<>"'`]/g, "").slice(0, 200);
}

function buildEmailHtml(name: string, email: string): string {
  const firstName = name ? name.split(" ")[0] : null;
  const greeting = firstName ? `Hey ${firstName},` : "Hey,";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're on the Prmpt waitlist</title>
</head>
<body style="margin:0;padding:0;background-color:#F2D9CE;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F2D9CE;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:580px;" cellpadding="0" cellspacing="0">

          <!-- Header bar -->
          <tr>
            <td style="background-color:#232629;padding:20px 32px;border:5px solid #232629;border-bottom:none;">
              <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#FFF4ED;letter-spacing:0.04em;text-transform:uppercase;">
                ◆ PRMPT
              </span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#FFF4ED;padding:40px 32px 32px;border:5px solid #232629;border-top:none;border-bottom:none;">

              <div style="display:inline-block;border:3px solid #232629;padding:4px 14px;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#232629;margin-bottom:20px;">
                ✦ WAITLIST CONFIRMED ✦
              </div>

              <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;color:#1E2A3B;line-height:1.1;text-transform:uppercase;letter-spacing:0.02em;">
                You're in.
              </h1>

              <p style="margin:0 0 12px;font-size:15px;line-height:1.7;color:#526070;">
                ${greeting}
              </p>
              <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#526070;">
                Thank you for joining the <strong style="color:#1E2A3B;">Prmpt</strong> waitlist.
                We're building a tool that turns your rough ideas into precise, powerful AI prompts — in seconds.
              </p>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#526070;">
                You're now on the list. We'll reach out the moment we're ready to let you in.
              </p>

              <div style="height:4px;background-color:#232629;margin:0 0 24px;"></div>

              <!-- What's next -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#FFF9F6;border:3px solid #232629;padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#232629;">
                      ◆ WHILE YOU WAIT
                    </p>
                    <table cellpadding="0" cellspacing="0">
                      <tr><td style="padding:4px 0;font-size:14px;color:#526070;line-height:1.6;">→&nbsp; Early access invite before public launch</td></tr>
                      <tr><td style="padding:4px 0;font-size:14px;color:#526070;line-height:1.6;">→&nbsp; Exclusive updates as we build</td></tr>
                      <tr><td style="padding:4px 0;font-size:14px;color:#526070;line-height:1.6;">→&nbsp; Your feedback will shape the product</td></tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="background-color:#232629;border:4px solid #232629;">
                    <a href="https://tryprmpt.com" style="display:inline-block;padding:13px 28px;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#FFF4ED;text-decoration:none;font-family:'Helvetica Neue',Arial,sans-serif;">
                      LEARN MORE ABOUT PRMPT →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;font-size:14px;color:#1E2A3B;font-weight:700;">Stay tuned,</p>
              <p style="margin:0;font-size:14px;color:#526070;">
                Aarush &amp; Prabhat<br>
                <span style="font-weight:700;color:#232629;">Team Prmpt</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#232629;padding:20px 32px;border:5px solid #232629;border-top:none;">
              <p style="margin:0 0 6px;font-size:11px;color:#E8D0C3;text-align:center;letter-spacing:0.06em;text-transform:uppercase;">
                © 2026 PRMPT. ALL RIGHTS RESERVED.
              </p>
              <p style="margin:0;font-size:11px;color:#526070;text-align:center;">
                <a href="mailto:tryprmpt@gmail.com" style="color:#E8D0C3;text-decoration:none;">tryprmpt@gmail.com</a>
                &nbsp;·&nbsp;
                <a href="https://tryprmpt.com" style="color:#E8D0C3;text-decoration:none;">tryprmpt.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

function buildEmailText(name: string): string {
  const firstName = name ? name.split(" ")[0] : null;
  const greeting = firstName ? `Hey ${firstName},` : "Hey,";
  return `
◆ PRMPT — WAITLIST CONFIRMED

${greeting}

Thank you for joining the Prmpt waitlist!

We're building a tool that turns your rough ideas into precise, powerful AI prompts — in seconds.
You're now on the list. We'll reach out the moment we're ready to let you in.

WHILE YOU WAIT:
→ Early access invite before public launch
→ Exclusive updates as we build
→ Your feedback will shape the product

https://tryprmpt.com

Stay tuned,
Aarush & Prabhat
Team Prmpt

—
© 2026 Prmpt · tryprmpt@gmail.com
`.trim();
}

async function sendWelcomeEmail(toEmail: string, toName: string): Promise<void> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.warn("Gmail credentials not configured — skipping welcome email.");
    return;
  }

  // Dynamic import so a load failure is caught at runtime, not module init
  const nodemailer = (await import("nodemailer")).default;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // SSL — more reliable on serverless than STARTTLS/587
    auth: {
      user: gmailUser,
      pass: gmailAppPassword.replace(/\s/g, ""), // strip any accidental spaces
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 8000,
  });

  await transporter.sendMail({
    from: `"Prmpt" <${gmailUser}>`,
    to: `"${toName || toEmail}" <${toEmail}>`,
    subject: "You're on the Prmpt waitlist ◆",
    html: buildEmailHtml(toName, toEmail),
    text: buildEmailText(toName),
  });

  transporter.close();
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 415 });
    }

    let body: { email?: unknown; name?: unknown };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const email = typeof body.email === "string" ? sanitizeString(body.email.toLowerCase()) : "";
    const name = typeof body.name === "string" ? sanitizeString(body.name) : "";

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 422 });
    }

    if (!name || name.length < 1) {
      return NextResponse.json({ error: "Name is required" }, { status: 422 });
    }

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase env vars missing");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Check for duplicate
    const { data: existing } = await supabase
      .from("waitlist")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { success: true, already_registered: true },
        { status: 200 }
      );
    }

    const row: Record<string, string> = {
      email,
      name,
      signed_up_at: new Date().toISOString(),
      source: "landing_page",
    };

    const { error: insertError } = await supabase.from("waitlist").insert(row);

    if (insertError) {
      if (insertError.message?.includes("name")) {
        const { error: err2 } = await supabase.from("waitlist").insert({
          email: row.email,
          signed_up_at: row.signed_up_at,
          source: row.source,
        });
        if (err2) {
          console.error("Waitlist insert error:", err2);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
      } else {
        console.error("Waitlist insert error:", insertError);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }
    }

    // Send welcome email — awaited so Vercel doesn't kill the function before it sends.
    // Wrapped in a 9s timeout to stay within Vercel's 10s function limit.
    try {
      await Promise.race([
        sendWelcomeEmail(email, name),
        new Promise<void>((_, reject) =>
          setTimeout(() => reject(new Error("Email timeout")), 9000)
        ),
      ]);
    } catch (err) {
      // Email failure is non-fatal — user is already on the waitlist
      console.warn("Welcome email failed:", err);
    }

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (err) {
    console.error("Unhandled error in /api/waitlist:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
