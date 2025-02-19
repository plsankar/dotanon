import Navbar from "@/components/navbar";
import Providers from "@/providers";
import { Suspense } from "react";
import UserQueryForm from "@/components/user-query-form";
import UserQueryResult from "@/components/user-query-result";

export default function Home() {
    return (
        <div className="max-w-xl mx-auto px-5">
            <Navbar />
            <Providers>
                <Suspense>
                    <UserQueryForm />
                    <UserQueryResult />
                </Suspense>
            </Providers>
        </div>
    );
}
