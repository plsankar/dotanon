import type { Metadata } from "next";
import "./globals.css";

import { Inter, Sora } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Providers from "@/providers";

const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontSerif = Sora({
    subsets: ["latin"],
    variable: "--font-serif",
});

export const metadata: Metadata = {
    title: "DotAnon",
    description: "Privacy-first domain discovery.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased`}
            >
                <Providers>
                    <>
                        <Navbar />
                        {children}
                        <Footer />
                    </>
                </Providers>
            </body>
        </html>
    );
}
