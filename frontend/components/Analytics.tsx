import Script from "next/script";

const DEFAULT_SRC = "https://cloud.umami.is/script.js";

// Umami tracking script. Renders nothing until NEXT_PUBLIC_UMAMI_WEBSITE_ID is
// set, so local dev and unconfigured environments send no data.
export default function Analytics() {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) return null;

  const src = process.env.NEXT_PUBLIC_UMAMI_SRC || DEFAULT_SRC;

  return (
    <Script src={src} data-website-id={websiteId} strategy="afterInteractive" />
  );
}
