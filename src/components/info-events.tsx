import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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

    const registrar = rdap.entities.find((entry) =>
        entry.roles.includes("registrar")
    );

    const registrarName = registrar?.vcardArray
        .filter((e) => typeof e !== "string")
        .flat()
        .find((e) => e[0] == "fn")?.[3];
    return (
        <Card className="shadow-sm mt-5">
            <CardContent className="p-3">
                <div className="grid grid-cols-3 border-top bg-gray-50 dark:bg-black/20 rounded-lg border-black/10 dark:border-white/10 border p-4 divide-x [&>*:not(:first-child)]:pl-4">
                    {[registration, expiration, lastChanged]
                        .filter((e) => e != null)
                        .map((event) => (
                            <InfoEventItem
                                event={event}
                                key={event.eventAction}
                            />
                        ))}
                </div>
                <div className="bg-gray-50 dark:bg-black/20 rounded-lg border-black/10 dark:border-white/10 border mt-4">
                    <Accordion type="single" collapsible className="">
                        <AccordionItem value={domain} className="border-b-0">
                            <AccordionTrigger className="hover:no-underline px-4 [&[data-state=open]>svg]:rotate-180">
                                <p>WHOIS</p>
                            </AccordionTrigger>
                            <AccordionContent className="border-t px-2">
                                <Table>
                                    <TableBody>
                                        {registrar && (
                                            <TableRow>
                                                <TableCell className="font-medium">
                                                    Registrar
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {String(
                                                        registrarName || "N/A"
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    );
};
