// pages/api/forms/[id]/share.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseService } from "@/lib/supabaseServer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  const sb = supabaseService();

  if (req.method === "GET") {
    // return the current public share URL for this form
    const { data, error } = await sb
      .from("forms")
      .select("public_id")
      .eq("id", id)
      .single();

    if (error || !data) return res.status(404).json({ error: error?.message || "Not found" });

    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = new URL(`/embed/${data.public_id}`, base).toString();
    return res.status(200).json({ publicId: data.public_id, url });
  }

  if (req.method === "POST") {
    // rotate: generates a new public_id (old link stops working)
    const { data, error } = await sb.rpc("rotate_form_public_id", { form_id: id });
    if (error) return res.status(400).json({ error: error.message });

    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const url = new URL(`/embed/${data.public_id}`, base).toString();
    return res.status(200).json({ publicId: data.public_id, url });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
}

