import _ from "lodash";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (): Promise<RDAPDNSList> => {
    const response = await fetch("https://data.iana.org/rdap/dns.json");
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
};

function useRDAP() {
    const query = useQuery({ queryKey: ["rdap"], queryFn: fetchData });

    const rdapTlds = useMemo(() => {
        const services = query.data?.services || [];
        const tlds = _(services)
            .map((service) => {
                return service[0].map((tld) => {
                    return { tld, rdapUrl: service[1][0] };
                });
            })
            .flatten()
            .value();
        return tlds;
    }, [query.data]);

    return { ...query, rdapTlds: rdapTlds };
}

export default useRDAP;
