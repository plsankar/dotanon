import Providers from "@/providers";
import UserQueryForm from "@/components/user-query-form";
import UserQueryResult from "@/components/user-query-result";

export default function Home() {
    return (
        <div className="py-10 max-w-xl mx-auto px-5">
            <Providers>
                <UserQueryForm />
                <UserQueryResult />
            </Providers>
        </div>
    );
}
