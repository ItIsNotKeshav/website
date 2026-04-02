import type { Metadata } from "next";
import HelpDocs from "@/views/HelpDocs";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Help & Docs",
  description:
    "Learn how to use Prmpt — step-by-step guides on prompt optimization, the system-wide overlay, and managing your personal prompt library.",
  alternates: {
    canonical: "https://tryprmpt.com/help",
  },
  openGraph: {
    title: "Help & Docs | Prmpt",
    description:
      "Step-by-step guides on prompt optimization, the system-wide overlay, and managing your personal prompt library.",
    url: "https://tryprmpt.com/help",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prmpt Help & Docs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help & Docs | Prmpt",
    description:
      "Step-by-step guides on prompt optimization, the system-wide overlay, and your prompt library.",
    images: ["/og-image.png"],
  },
};

export default HelpDocs;
