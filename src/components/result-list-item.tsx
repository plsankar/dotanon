import React, { useMemo } from "react";

import { Badge } from "./ui/badge";
import { InfoEvents } from "./info-events";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { WaybackButton } from "./wayback-button";
import RegisterDomainButton from "./register-domain-button";

const ResultListItem = ({
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
            axios<RDAPDomainData>(`${row.rdapUrl}domain/${domain}`, {
                validateStatus: null,
            }).then(async (res) => {
                console.log(res.data);
                return {
                    status: res.status,
                    data: res.data,
                };
            }),
    });

    const available = useMemo(() => data?.status !== 200, [data]);

    return (
        <div>
            <div className="flex gap-2 pt-5 px-4 items-center">
                <div className="w-3/5 flex items-center gap-3">
                    <a href={`http://${domain}`} target="_blank">
                        <p className="font-serif border-b border-transparent hover:border-black/20 cursor-pointer inline-block">
                            <span className="text-2xl font-serif opacity-50">
                                {query}
                            </span>
                            .
                            <span className="font-medium text-sm">
                                {row.name}
                            </span>
                        </p>
                    </a>
                    <div className="">
                        {isPending ? (
                            <Skeleton className="w-[100px] h-[20px] rounded-full" />
                        ) : (
                            <>
                                {error ? (
                                    <Badge variant="destructive">ERROR</Badge>
                                ) : (
                                    <Badge
                                        variant={`${
                                            available
                                                ? "secondary"
                                                : "destructive"
                                        }`}
                                    >
                                        {available ? "Available" : "Registered"}
                                    </Badge>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="w-1/5 text-end">
                    <WaybackButton domain={domain} />
                </div>
                <div className="w-1/5 text-end">
                    {isPending ? (
                        <Skeleton className="w-[100px] h-[20px] rounded-full" />
                    ) : (
                        <>
                            {!error && available && (
                                <RegisterDomainButton domain={domain} />
                            )}
                        </>
                    )}
                </div>
            </div>
            {data && !available && (
                <InfoEvents rdap={data.data} domain={domain} />
            )}
        </div>
    );
};

export default ResultListItem;
