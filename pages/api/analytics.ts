// pages/api/analytics.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseService } from "@/lib/supabaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end("Method Not Allowed");
  }

  const { publicId, event, referrer, origin, userAgent } = req.body || {};
  if (!publicId || !event) return res.status(400).json({ error: "Missing publicId or event" });

  const sb = supabaseService();
  const { error } = await sb.from("analytics_events").insert({
    public_id: publicId,
    event,
    referrer: referrer || null,
    origin: origin || null,
    user_agent: userAgent || req.headers["user-agent"] || null,
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ ok: true });
}
