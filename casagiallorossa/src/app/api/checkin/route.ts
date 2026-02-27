import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

function ipFromReq(req: NextRequest) {
  const xf = req.headers.get("x-forwarded-for");
  return (xf?.split(",")[0] || "").trim() || "0.0.0.0";
}

function hashIP(ip: string) {
  const salt = process.env.IP_HASH_SALT || "change-me";
  return crypto.createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const doorId = body?.doorId as string | undefined;
  if (!doorId) return NextResponse.json({ ok: false, error: "doorId_required" }, { status: 400 });

  const sb = supabaseAdmin();

  const ip = ipFromReq(req);
  const ip_hash = hashIP(ip);
  const user_agent = req.headers.get("user-agent") || "";

  // Rate limit: 1 check-in ogni 10 minuti per doorId + ip_hash
  const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { data: recent, error: e1 } = await sb
    .from("checkins")
    .select("id")
    .eq("door_id", doorId)
    .eq("ip_hash", ip_hash)
    .gte("created_at", tenMinAgo)
    .limit(1);

  if (e1) return NextResponse.json({ ok: false, error: e1.message }, { status: 500 });

  let limited = false;
  if (recent && recent.length > 0) {
    limited = true;
  } else {
    const { error: e2 } = await sb.from("checkins").insert({ door_id: doorId, ip_hash, user_agent });
    if (e2) return NextResponse.json({ ok: false, error: e2.message }, { status: 500 });
  }

  // Count last 24h
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error: e3 } = await sb
    .from("checkins")
    .select("id", { count: "exact", head: true })
    .eq("door_id", doorId)
    .gte("created_at", since);

  if (e3) return NextResponse.json({ ok: false, error: e3.message }, { status: 500 });

  return NextResponse.json({ ok: true, limited, countLast24h: count ?? 0 });
}
