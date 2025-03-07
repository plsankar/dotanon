import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "lucide-react";

const Navbar = () => {
    return (
        <div className="border-b border-dashed">
            <div className="max-w-xl mx-auto p-5 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif">
                    dotAnon
                </Link>
                <div className="space-x-4">
                    <Button size="icon" asChild variant="outline">
                        <Link
                            href="https://github.com/plsankar/dotanon"
                            target="_blank"
                        >
                            <span className="hidden">Github Repo</span>
                            <GithubIcon className="w-4 h-4" />
                        </Link>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
