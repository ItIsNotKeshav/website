import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>"'`]/g, "")
    .slice(0, 200);
}

export async function POST(request: Request) {
  // Only accept JSON
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
    // Try without name field if schema doesn't have it
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

  // Send welcome email (non-blocking)
  try {
    await supabase.functions.invoke("send-welcome-email", {
      body: { email, name },
    });
  } catch (err) {
    console.warn("Welcome email failed (non-blocking):", err);
  }

  return NextResponse.json({ success: true }, { status: 201 });
}

// Reject non-POST methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
