"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Calendar,
    Clock,
    ExternalLink,
    History,
    LibraryIcon,
    Loader2,
} from "lucide-react";
import { format, parse } from "date-fns";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { cn } from "@/lib/utils";

type WatbackData = {
    url: string;
    archived_snapshots: {
        closest: {
            status?: string;
            available?: boolean;
            url?: string;
            timestamp?: string;
        };
    };
};

export function WaybackButton({ domain }: { domain: string }) {
    const { isPending, error, data } = useQuery({
        queryKey: ["wayback", domain],
        retry: 1,
        queryFn: () =>
            axios<WatbackData>(
                `https://archive.org/wayback/available?url=http://${domain}`,
                {
                    validateStatus: null,
                }
            ).then(async (res) => {
                console.log(res.data);
                return {
                    status: res.status,
                    data: res.data,
                };
            }),
    });

    const snapshot = data?.data.archived_snapshots.closest || null;

    const [isOpen, setIsOpen] = useState(false);

    const formatTimestamp = (timestamp: string) => {
        const date = parse(timestamp, "yyyyMMddHHmmss", new Date());
        return {
            date: format(date, "yyyy-MM-dd"),
            time: format(date, "HH:mm:ss"),
        };
    };

    if (isPending) {
        return (
            <Button variant="outline" size="icon" disabled className="h-9 w-9">
                <Loader2 className="h-4 w-4 animate-spin" />
            </Button>
        );
    }

    if (error || !snapshot?.available) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className={cn(
                                "h-9 w-9",
                                !snapshot?.available &&
                                    "cursor-not-allowed opacity-50"
                            )}
                        >
                            <LibraryIcon className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        {snapshot?.available ? (
                            <p>Error fetching Wayback Machine snapshot</p>
                        ) : (
                            <p>No Wayback Machine snapshot available</p>
                        )}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger
                                asChild
                                disabled={!snapshot?.available}
                            >
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className={cn(
                                        "h-9 w-9",
                                        !snapshot?.available &&
                                            "cursor-not-allowed opacity-50"
                                    )}
                                >
                                    <LibraryIcon className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View Wayback Machine snapshot</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <PopoverContent className="w-80">
                    {snapshot && snapshot.timestamp && snapshot.url && (
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium">
                                    Wayback Machine Snapshot
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Last archived snapshot available
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {
                                            formatTimestamp(snapshot.timestamp)
                                                .date
                                        }
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">
                                        {
                                            formatTimestamp(snapshot.timestamp)
                                                .time
                                        }
                                    </span>
                                </div>
                            </div>

                            <Button asChild className="w-full gap-2">
                                <a
                                    href={snapshot.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Snapshot
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}
