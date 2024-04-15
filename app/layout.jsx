import {ClerkProvider} from '@clerk/nextjs'
import { Inter } from "next/font/google";
import "../styles/globals.css";
import {Providers} from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "fs-drafter",
  description: "Generate financial statement disclosure drafts",
};

export default function RootLayout({ children }) {

    return (
    <ClerkProvider>
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="p-6">
                        <main>{children}</main>
                    </div>
                </Providers>
            </body>
        </html>
    </ClerkProvider>
);
}
