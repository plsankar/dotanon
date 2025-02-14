"use client";

import React, { ReactNode } from "react";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import ReactQueryProvider from "./react-query-provider";
import UserQueryProvider from "./user-query-provider";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <NuqsAdapter>
            <UserQueryProvider>
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </UserQueryProvider>
        </NuqsAdapter>
    );
};

export default Providers;
