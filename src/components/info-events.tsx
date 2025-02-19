import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import InfoEventItem from "./info-event-item";

export const InfoEvents = ({
    rdap,
    domain,
}: {
    domain: string;
    rdap: RDAPDomainData;
}) => {
    const registration = rdap.events.find(
        (e) => e.eventAction === "registration"
    );
    const expiration = rdap.events.find((e) => e.eventAction === "expiration");
    const lastChanged = rdap.events.find(
        (e) => e.eventAction === "last changed"
    );

    return (
        <Accordion type="single" collapsible className="mb-4">
            <AccordionItem value={domain} className="border-b-0">
                <Card className="shadow-sm">
                    <AccordionTrigger className="hover:no-underline py-0 p-3 [&[data-state=open]>svg]:rotate-180">
                        <CardHeader className="p-3">
                            <CardTitle>WHOIS</CardTitle>
                        </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent className="p-0 border-t">
                        <CardContent className="p-3">
                            <div className="grid grid-cols-3 border-top bg-gray-50/50 rounded-lg border-black/10 border p-4 divide-x [&>*:not(:first-child)]:pl-4">
                                {[registration, expiration, lastChanged]
                                    .filter((e) => e != null)
                                    .map((event) => (
                                        <InfoEventItem
                                            event={event}
                                            key={event.eventAction}
                                        />
                                    ))}
                            </div>
                        </CardContent>
                    </AccordionContent>
                </Card>
            </AccordionItem>
        </Accordion>
    );
};
