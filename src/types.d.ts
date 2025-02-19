interface RDAPDomainData {
    handle: string;
    ldhName: string;
    links: { href: string; rel: string }[];
    events: { eventAction: string; eventDate: string }[];
    entities: {
        handle: string;
        roles: string[];
        vcardArray: [string, ...unknown[]][];
    }[];
    status: string[];
    notices: { title: string; description: string[] }[];
}

interface RDAPDNSList {
    services: Array<RDAPDNSListItem>;
}

type RDAPDNSListItem = [string[], string[]];

type ParsedQuery = {
    query: string;
    tld: string | null;
};

type AvailabilityResultRow = {
    name: string;
    rdapUrl: string;
};
