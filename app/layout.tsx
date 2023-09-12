import "./globals.css";
import type { PropsWithChildren, ReactElement } from "react";
import type { Metadata } from "next";
import { Exo } from "next/font/google";
import { cn } from "@utils/cn";
import { NavigationMenu } from "@components/navigation-menu";

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
      <body className="h-screen">
        <header className=" flex h-[5%] items-center justify-between border-b p-2">
          <span>Scuderia-FE</span>
          <NavigationMenu
            links={[
              { name: "Dashboard", href: "/" },
              { name: "Workshop", href: "/workshop" },
            ]}
          />
        </header>
        <main className={cn(exo.className, " flex flex-col overflow-hidden px-6 py-8 h-[95%]")}>
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
