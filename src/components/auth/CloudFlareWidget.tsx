"use client";

import { CloudflareWidgetStatus } from "@/lib/types";
import { Turnstile } from "@marsidev/react-turnstile";

interface CloudFlareWidgetProps {
  handleStatusUpdate: (status: CloudflareWidgetStatus) => void;
}

export default function CloudflareWidget({
  handleStatusUpdate,
}: CloudFlareWidgetProps) {
  return (
    <Turnstile
      siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!}
      options={{ theme: "light" }}
      onError={() => handleStatusUpdate("error")}
      onExpire={() => handleStatusUpdate("expired")}
      onSuccess={() => handleStatusUpdate("solved")}
      className="m-auto my-4"
    />
  );
}
