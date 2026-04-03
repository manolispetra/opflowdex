import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Opflow - Premium OTC Marketplace for OP-20 Tokens",
  description: "Stack Your Tokens → Cash Out in Base. One Transfer, Real Shit. Trade OP-20 tokens for USDT/USDC with native transfers only. No smart contracts, no escrow, no claim.",
  keywords: ["OP-20", "Bitcoin L1", "OP_NET", "OTC", "USDT", "USDC", "Base", "MotoSwap", "cryptocurrency"],
  authors: [{ name: "Opflow" }],
  openGraph: {
    title: "Opflow - Premium OTC Marketplace for OP-20 Tokens",
    description: "Native Flow, No Cap. Trade OP-20 tokens with 7% fee, direct to Base.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@1,900,700,500,301,701,300,501,401,901,400,2&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-satoshi antialiased">
        {children}
      </body>
    </html>
  );
}
