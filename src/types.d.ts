interface RDAPDomainData {
    handle: string;
    ldhName: string;
    links: { href: string; rel: string }[];
    events: { eventAction: string; eventDate: string }[];
    entities: {
        handle: string;
        publicIds: Array<{
            type: string;
            identifier: string;
        }>;
        roles: string[];
        vcardArray: VcardArray;
        entities: { roles: string[]; vcardArray: VcardArray }[];
    }[];
    status: string[];
    notices: { title: string; description: string[] }[];
}

type VcardArray = [string, ...[string, object, string, string][]][];

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
