import "./globals.css";
import type { PropsWithChildren, ReactElement } from "react";
import type { Metadata } from "next";
import { Exo } from "next/font/google";
import { cn } from "@utils/cn";

export const dynamic = "force-dynamic";

const url = new URL("https://www.scuderia-fe.com");

const exo = Exo({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: url,
  keywords: ["Scuderia Frontend", "Scuderia FE", "scuderiafe", "www.scuderiafrontend.com"],
  title: {
    default: "Scuderia Frontend",
    template: "%s | Scuderia Frontend",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Scuderia Frontend",
  },
  manifest: "https://www.scuderiafrontend.com/manifest.json",
  description: "Scuderia FE",
  openGraph: {
    title: {
      default: "Scuderia Frontend",
      template: "%s | Scuderia Frontend",
    },
    description: "Scuderia FE",
    url,
    siteName: "Scuderia Frontend",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    title: "Scuderia Frontend",
    card: "summary_large_image",
  },
};

const RootLayout = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <html lang="en" className={"bg-background text-white"}>
      <body>
        <main className={cn(exo.className, " flex h-screen flex-col overflow-hidden px-6 py-8 ")}>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
