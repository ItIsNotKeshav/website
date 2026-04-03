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
    "Prmpt is an AI-powered workflow optimization tool that helps developers and everyday users get more done — smarter prompts, faster results, less friction.",

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
      "Stop fighting your AI tools. Prmpt optimizes your workflow so developers and everyone else can get smarter results, faster — without breaking their focus.",
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
      "Stop fighting your AI tools. Prmpt streamlines your workflow for developers and everyday users — smarter results, less friction, more done.",
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
        "Prmpt is an AI-powered workflow optimization tool that helps developers and everyday users work smarter — streamlining how you interact with AI across any tool or platform.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://tryprmpt.com/#website",
      url: "https://tryprmpt.com",
      name: "Prmpt",
      description:
        "AI workflow optimization for developers and everyday users. Work smarter, not harder — system-wide.",
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
        "A system-wide AI workflow optimization tool that helps developers and general users streamline how they work with AI — real-time refinement, persistent access, zero friction.",
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
