import type { Metadata } from "next";
import "./globals.css";

import { Inter, Sora } from "next/font/google";

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
        <html lang="en">
            <body
                className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
