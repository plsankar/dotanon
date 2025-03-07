import Navbar from "@/components/navbar";
import Providers from "@/providers";
import { Suspense } from "react";
import UserQueryForm from "@/components/user-query-form";
import UserQueryResult from "@/components/user-query-result";
import Footer from "@/components/footer";

export default function Home() {
    return (
        <div className="max-w-xl mx-auto p-5 min-h-[80svh]">
            <Suspense>
                <UserQueryForm />
                <UserQueryResult />
            </Suspense>
        </div>
    );
}
