import Providers from "@/providers";
import UserQueryForm from "@/components/user-query-form";
import UserQueryResult from "@/components/user-query-result";
import { Suspense } from "react";

export default function Home() {
    return (
        <div className="py-10 max-w-xl mx-auto px-5">
            <Providers>
                <Suspense>
                    <UserQueryForm />
                    <UserQueryResult />
                </Suspense>
            </Providers>
        </div>
    );
}
