import React, { useEffect, useMemo, useState } from "react";

import ResutlListItem from "./resutl-list-item";
import { parse } from "tldts";
import { toUnicode } from "punycode";
import useRDAP from "@/hooks/use-rdap";
import useUserQuery from "@/hooks/use-user-query";

const AvailabilityResult = () => {
    const { query } = useUserQuery();
    const { rdapTlds, isPending } = useRDAP();
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
        if (lastQuery != parsedQuery && !isPending) {
            setLastQuery(parsedQuery);

            let favTlds = [];

            favTlds = rdapTlds.filter(
                (tld) => favs.find((fav) => fav.endsWith(tld.tld)) != null
            );

            if (parsedQuery.tld) {
                const validParsedTld = rdapTlds.find((tld) =>
                    parsedQuery.tld!.endsWith(tld.tld)
                );
                console.log(`validParsedTld:`, validParsedTld);
                if (validParsedTld) {
                    const index = favTlds.findIndex((tld) =>
                        parsedQuery.tld!.endsWith(tld.tld)
                    );
                    if (index != -1) {
                        favTlds = favTlds.filter((tld, i) => i != index);
                    }
                    favTlds = [validParsedTld, ...favTlds];
                }
            }

            setList(
                favTlds.map((tld) => {
                    const decoded = toUnicode(tld.tld);
                    return {
                        name: decoded,
                        rdapUrl: tld.rdapUrl,
                    };
                })
            );
        }
    }, [lastQuery, parsedQuery, rdapTlds, setLastQuery, isPending]);

    return (
        <div className="container mx-auto pb-10">
            {isPending && <>Loading</>}
            <div className="divide-y">
                {list.map((row) => (
                    <ResutlListItem
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
