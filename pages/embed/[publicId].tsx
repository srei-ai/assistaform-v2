// pages/embed/[publicId].tsx
import Head from "next/head";
import Script from "next/script";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { supabaseService } from "@/lib/supabaseServer";

type Props = {
  found: boolean;
  title?: string;
  schema?: unknown;
  publicId?: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { publicId } = ctx.query as { publicId: string };
  const sb = supabaseService();
  const { data, error } = await sb
    .from("forms")
    .select("title, schema, public_id")
    .eq("public_id", publicId)
    .single();

  if (error || !data) return { props: { found: false } };
  return {
    props: {
      found: true,
      title: data.title,
      schema: data.schema,
      publicId: data.public_id,
    },
  };
};

export default function EmbedPage({ found, title, schema, publicId }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!found) return <div style={{ fontFamily: "ui-sans-serif,system-ui", padding: 24 }}>Form not found.</div>;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <style>{`
          :root { color-scheme: light dark; }
          body { margin:0; font-family: ui-sans-serif, system-ui, -apple-system; }
          .card { max-width: 720px; margin: 0 auto; padding: 24px; }
          pre { white-space: pre-wrap; }
        `}</style>
      </Head>
      <div className="card">
        <h1>{title}</h1>
        {/* TODO: replace this with your real form renderer that uses "schema" */}
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </div>

      {/* lightweight analytics ping */}
      <Script id="analytics-embed" strategy="afterInteractive">{`
        fetch('/api/analytics', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            publicId: '${publicId}',
            event: 'embed_load',
            referrer: document.referrer,
            origin: location.origin,
            userAgent: navigator.userAgent
          })
        }).catch(()=>{});
      `}</Script>
    </>
  );
}
