import {ClerkProvider} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "../styles/globals.css";
import {Providers} from "@/app/providers";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "fs-drafter",
  description: "Generate financial statement disclosure drafts",
};

export const viewport = {
    initialScale: 1,
    width: 'device-width',
    maximumScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({ children }) {

    return (
    <ClerkProvider>
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="p-4 sm:p-6">
                        <main>{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    </ClerkProvider>
);
}
