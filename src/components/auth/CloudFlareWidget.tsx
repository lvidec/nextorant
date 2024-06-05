"use client";

import { CloudflareWidgetStatus } from "@/lib/types";
import { Turnstile } from "@marsidev/react-turnstile";

interface CloudFlareWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  handleStatusUpdate?: (status: CloudflareWidgetStatus) => void;
}

const SITE_KEY =
  process.env.NODE_ENV === "development"
    ? "1x00000000000000000000AA"
    : process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY!;

export default function CloudflareWidget({
  id,
  handleStatusUpdate,
  className,
}: CloudFlareWidgetProps) {
  return (
    <Turnstile
      id={id}
      siteKey={SITE_KEY}
      options={{ theme: "light" }}
      onError={() => handleStatusUpdate && handleStatusUpdate("error")}
      onExpire={() => handleStatusUpdate && handleStatusUpdate("expired")}
      onSuccess={() => handleStatusUpdate && handleStatusUpdate("solved")}
      className={className}
    />
  );
}
