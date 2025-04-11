import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const RegisterDomainButton = ({ domain }: { domain: string }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm">Register</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
                <div className="p-5">
                    <p className="text-base">Register Domain</p>
                    <p className="text-xs text-muted-foreground">
                        Please select a provider
                    </p>
                </div>
                <div className="border-t !p-0">
                    <a
                        className="flex items-center gap-3 px-5 py-3 hover:bg-foreground/5"
                        href={`https://namecheap.pxf.io/GmOP56?u=${encodeURIComponent(
                            `https://www.namecheap.com/domains/registration/results/?domain=${domain}`
                        )}`}
                        target="_blank"
                    >
                        <img
                            src="https://icons.duckduckgo.com/ip3/www.namecheap.com.ico"
                            width={40}
                            height={40}
                            className="w-4 h-4"
                        />
                        <span className="text-sm">Namecheap</span>
                    </a>
                </div>
                <div className="p-5 border-t mt-0">
                    <p className="text-xs text-muted-foreground">
                        <strong>Disclaimer:</strong> The links above are
                        affiliate links. We may earn a commission if you
                        register a domain through these links. This does not
                        affect the price you pay. We recommend these registrars
                        based on our experience, but we encourage you to
                        research each option before making a decision.
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default RegisterDomainButton;
