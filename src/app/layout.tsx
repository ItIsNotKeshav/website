import type { Metadata, Viewport } from "next";
import "../index.css";
import { Providers } from "./providers";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tryprmpt.com"),

  title: {
    default: "Prmpt — AI Prompt Optimization Tool",
    template: "%s | Prmpt",
  },

  description:
    "Optimize, refine, and manage prompts across all AI tools with a system-wide overlay. Real-time prompt engineering for developers and AI power users.",

  keywords: [
    "prompt optimization",
    "AI prompt manager",
    "prompt engineering",
    "ChatGPT prompt optimizer",
    "AI prompt tool",
    "prompt library",
    "AI overlay tool",
    "prompt engineering software",
  ],

  authors: [{ name: "Prmpt", url: "https://tryprmpt.com" }],
  creator: "Prmpt",
  publisher: "Prmpt",

  openGraph: {
    title: "Prmpt — AI Prompt Optimization Tool",
    description:
      "Optimize, refine, and manage prompts across all AI tools with a system-wide overlay. Real-time prompt engineering without breaking your flow.",
    url: "https://tryprmpt.com",
    siteName: "Prmpt",
    images: [
      {
        url: "/og-image.png",
        width: 1246,
        height: 630,
        alt: "Prmpt — AI Prompt Optimization Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Prmpt — AI Prompt Optimization Tool",
    description:
      "Optimize, refine, and manage prompts across all AI tools. Real-time prompt engineering without breaking your flow.",
    images: ["/og-image.png"],
    // creator: "@yourhandle",
  },

  alternates: {
    canonical: "https://tryprmpt.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tryprmpt.com/#organization",
      name: "Prmpt",
      url: "https://tryprmpt.com",
      logo: {
        "@type": "ImageObject",
        url: "https://tryprmpt.com/logos/dark-logo-svg.svg",
      },
      description:
        "Prmpt is an AI prompt optimization and management tool that lets you refine, save, and access prompts system-wide across all AI tools.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://tryprmpt.com/#website",
      url: "https://tryprmpt.com",
      name: "Prmpt",
      description:
        "Optimize, refine, and manage prompts across all AI tools with a system-wide overlay.",
      publisher: { "@id": "https://tryprmpt.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://tryprmpt.com/help?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://tryprmpt.com/#app",
      name: "Prmpt",
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Windows, macOS",
      description:
        "A system-wide AI prompt optimization tool with a persistent library, real-time refinement, and overlay access across all AI tools.",
      url: "https://tryprmpt.com",
      publisher: { "@id": "https://tryprmpt.com/#organization" },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/PreOrder",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
