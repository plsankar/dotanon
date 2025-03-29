import React, { useEffect, useMemo, useState } from "react";

import ResultListItem from "./result-list-item";
import { parse } from "tldts";
import { toUnicode } from "punycode";
import useUserQuery from "@/hooks/use-user-query";
import { dnsList } from "rdap-kit";

const AvailabilityResult = () => {
    const { query } = useUserQuery();
    const [list, setList] = useState<AvailabilityResultRow[]>([]);
    const [lastQuery, setLastQuery] = useState<ParsedQuery>({
        query: "",
        tld: null,
    });
    const parsedQuery = useMemo(() => {
        const result = parse(query);
        return {
            query: result.domainWithoutSuffix || query,
            tld: result.domain ? result.publicSuffix : null,
        };
    }, [query]);

    useEffect(() => {
        const favs = [
            "com",
            "in",
            "org",
            "net",
            "dev",
            "design",
            "me",
            "design",
            "studio",
            "space",
        ];
        if (lastQuery != parsedQuery) {
            setLastQuery(parsedQuery);

            let favTlds = [];

            favTlds = dnsList.filter(
                (tld) => favs.find((fav) => fav.endsWith(tld.tld)) != null
            );

            if (parsedQuery.tld) {
                const validParsedTld = dnsList.find((tld) =>
                    parsedQuery.tld!.endsWith(tld.tld)
                );
                if (validParsedTld) {
                    // TODO: Merge two loops
                    const index = favTlds.findIndex((tld) =>
                        parsedQuery.tld!.endsWith(tld.tld)
                    );
                    if (index != -1) {
                        favTlds = favTlds.filter((_, i) => i != index);
                    }
                    favTlds = [
                        { server: validParsedTld.server, tld: parsedQuery.tld },
                        ...favTlds,
                    ];
                }
            }

            setList(
                favTlds.map((tld) => {
                    const decoded = toUnicode(tld.tld);
                    return {
                        name: decoded,
                        rdapUrl: tld.server,
                    };
                })
            );
        }
    }, [lastQuery, parsedQuery, setLastQuery]);

    return (
        <div className="container mx-auto pb-10">
            <div className="divide-y space-y-8">
                {list.map((row) => (
                    <ResultListItem
                        query={parsedQuery.query}
                        row={row}
                        key={row.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default AvailabilityResult;
