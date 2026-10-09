import { NextResponse } from "next/server";

/**
 * Application endpoint.
 *
 * Set APPLY_WEBHOOK_URL (e.g. a Google Apps Script, Zapier/Make hook, Slack
 * workflow or CRM endpoint) and every valid submission is POSTed there as JSON.
 *
 * Without it:
 *  - development: submissions are logged to the server console and accepted.
 *  - production: the endpoint refuses (503) so no application is silently lost.
 */

const REQUIRED = ["name", "email", "company", "stage", "building", "whyNow", "help"] as const;
const MAX = 4000;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  const clean: Record<string, string> = {};
  for (const [k, v] of Object.entries(body)) {
    if (typeof v === "string") clean[k] = v.trim().slice(0, MAX);
  }
  const missing = REQUIRED.filter((k) => !clean[k]);
  if (missing.length) {
    return NextResponse.json({ ok: false, message: `Missing: ${missing.join(", ")}` }, { status: 422 });
  }
  if (!/^\S+@\S+\.\S+$/.test(clean.email)) {
    return NextResponse.json({ ok: false, message: "Invalid email." }, { status: 422 });
  }

  const payload = { ...clean, submittedAt: new Date().toISOString(), source: "why-website" };
  const hook = process.env.APPLY_WEBHOOK_URL;

  if (hook) {
    const r = await fetch(hook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => null);
    if (!r || !r.ok) {
      return NextResponse.json({ ok: false, message: "We couldn't save that just now. Please try again in a minute." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[apply] (no APPLY_WEBHOOK_URL set, dev only)", payload);
    return NextResponse.json({ ok: true, stored: false });
  }

  return NextResponse.json({ ok: false, message: "Applications aren't connected yet." }, { status: 503 });
}
