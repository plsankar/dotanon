import { Badge } from "./ui/badge";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

const ResutlListItem = ({
    row,
    query,
}: {
    row: AvailabilityResultRow;
    query: string;
}) => {
    const domain = `${query}.${row.name}`;

    const { isPending, error, data } = useQuery({
        queryKey: [domain],
        retry: 1,
        queryFn: () =>
            fetch(`${row.rdapUrl}domain/${domain}`).then(async (res) => {
                const body = await res.json();
                return {
                    status: res.status,
                    data: body,
                };
            }),
    });

    return (
        <div className="flex gap-2 pb-5 items-center">
            <div className="w-3/5">
                <a href={`http://${domain}`} target="_blank">
                    <p className="font-serif border-b border-transparent hover:border-black/20 cursor-pointer inline-block">
                        <span className="text-2xl font-serif opacity-50">
                            {query}
                        </span>
                        .<span className="font-medium text-sm">{row.name}</span>
                    </p>
                </a>
            </div>
            <div className="w-1/5"></div>
            <div className="w-1/5 text-end">
                {isPending ? (
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                ) : (
                    <>
                        {error ? (
                            <Badge variant="destructive">ERROR</Badge>
                        ) : (
                            <Badge
                                variant={`${
                                    data.status === 404
                                        ? "secondary"
                                        : "destructive"
                                }`}
                            >
                                {data.status === 404
                                    ? "Available"
                                    : "Registered"}
                            </Badge>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ResutlListItem;
