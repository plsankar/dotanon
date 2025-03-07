import React from "react";

const Footer = () => {
    return (
        <div className="border-t border-dashed">
            <div className="max-w-xl mx-auto p-5">
                <p className="text-sm text-foreground [&>a]:underline [&>a:hover]:no-underline">
                    Built by{" "}
                    <a href="http://sankar.fyi/" target="_blank">
                        Lashmi Sankar
                    </a>
                    . The source code is available on{" "}
                    <a
                        href="https://github.com/plsankar/dotanon"
                        target="_blank"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default Footer;
