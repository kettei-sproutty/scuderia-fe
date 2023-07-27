import "./globals.css";
import type { PropsWithChildren, ReactElement } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { css, cx } from "@styled-system/css";

const description = "Developer, Rust and Typescript enthusiast.";
const url = process.env.NEXT_URL;

export const metadata: Metadata = {
  keywords: [
    "Scuderia Frontend",
    "Scuderia FE",
    "scuderiafe",
    "www.scuderiafrontend.com",
  ],
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
  description,
  openGraph: {
    title: {
      default: "Scuderia Frontend",
      template: "%s | Scuderia Frontend",
    },
    description,
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

const inter = Inter({ subsets: ["latin"] });

const htmlStyles = css({
  backgroundColor: "#09090a",
  color: "#fff",
  fontSize: "16px",
  lineHeight: "1.5",
});

const bodyStyles = css({
  mx: 4,
  my: 8,
  flex: "1 1 auto",
  flexDirection: "column",
  fontSmoothing: "antialiased",
  md: {
    mx: "auto",
    mb: 0,
    flexDirection: "row",
  },
});

const mainStyles = css({
  mt: 0,
  flex: "1 1 auto",
  minWidth: 0,
  flexDir: "column",
  p: 0,
  md: {
    p: 6,
    mt: 6,
  },
});

const RootLayout = ({ children }: PropsWithChildren): ReactElement => {
  return (
    <html lang="en" className={cx(htmlStyles, inter.className)}>
      <body className={bodyStyles}>
        <main className={mainStyles}>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
