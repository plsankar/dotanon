import Link from "next/link";
import React from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
    return (
        <div className="py-5 mb-10 border-b flex justify-between items-center">
            <Link href="/" className="text-2xl font-serif">
                dotAnon
            </Link>
            <div>
                <ModeToggle />
            </div>
        </div>
    );
};

export default Navbar;
