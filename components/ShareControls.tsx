// components/ShareControls.tsx
"use client"; // harmless in Pages Router; keeps it client-side
import { useState } from "react";

export default function ShareControls({ formId }: { formId: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUrl(method: "GET" | "POST") {
    setLoading(true); setError(null);
    try {
      const res = await fetch(`/api/forms/${formId}/share`, { method });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Request failed");
      setUrl(json.url);
      if (method === "POST" && navigator.clipboard) await navigator.clipboard.writeText(json.url);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => fetchUrl("GET")} disabled={loading}>Get share link</button>
        <button onClick={() => fetchUrl("POST")} disabled={loading}>Rotate link</button>
      </div>
      {url && (
        <div style={{ fontSize: 14 }}>
          <div>Share URL</div>
          <code style={{ wordBreak: "break-all" }}>{url}</code>
          <div style={{ marginTop: 8 }}>Embed (iframe):</div>
          <pre style={{ background: "rgba(0,0,0,.05)", padding: 8, borderRadius: 6, overflowX: "auto" }}>{`<iframe src="${url}" width="100%" height="680" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`}</pre>
        </div>
      )}
      {error && <div style={{ color: "crimson", fontSize: 14 }}>{error}</div>}
    </div>
  );
}
