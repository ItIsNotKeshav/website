import type { Metadata } from "next";
import "../index.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Prmpt — Your AI is only as smart as your prompt",
  description:
    "Optimize, refine, and manage prompts across all AI tools — without breaking your flow.",
  metadataBase: new URL("https://tryprmpt.com"),
  openGraph: {
    title: "Prmpt — Your AI is only as smart as your prompt",
    description:
      "Optimize, refine, and manage prompts across all AI tools — without breaking your flow.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
