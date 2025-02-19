import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="py-5 mb-10 border-b flex justify-between items-center">
            <Link href="/" className="text-2xl font-serif">
                dotAnon
            </Link>
        </div>
    );
};

export default Navbar;
