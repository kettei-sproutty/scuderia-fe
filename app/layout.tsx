import "./globals.css";
import type { PropsWithChildren, ReactElement } from "react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const url = new URL("https://www.scuderia-fe.com");

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
      <body className={"mx-4 my-8 flex-auto flex-col md:mx-auto md:mb-0 md:flex-row"}>
        <h1 className={"text-center font-ferroRosso text-5xl"}>Scuderia Frontend</h1>
        <main className={"mt-0 min-w-0 flex-auto flex-col p-0 md:mt-8 md:p-6"}>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
