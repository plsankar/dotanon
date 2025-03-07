"use client";

import React, { ReactNode } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "./react-query-provider";
import UserQueryProvider from "./user-query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <NuqsAdapter>
                <UserQueryProvider>
                    <ReactQueryProvider>{children}</ReactQueryProvider>
                </UserQueryProvider>
            </NuqsAdapter>
        </ThemeProvider>
    );
};

export default Providers;
