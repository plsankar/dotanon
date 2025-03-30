import { differenceInCalendarDays, format } from "date-fns";

import { Badge } from "./ui/badge";
import { useMemo } from "react";

const InfoEventItem = ({ event }: { event: RDAPDomainData["events"][0] }) => {
    const { dateString, timeString, difference } = useMemo(() => {
        const date = new Date(event.eventDate);
        const dateString = format(date, "dd-MM-yyyy");
        const timeString = format(date, "hh:mm:ss a");

        const diff = differenceInCalendarDays(date, new Date());
        const difference =
            diff === 0
                ? "Today"
                : `${Math.abs(diff)} days ${diff > 0 ? "from now" : "ago"}`;

        return {
            dateString,
            timeString,
            difference,
        };
    }, [event.eventDate]);

    return (
        <div className="">
            <div>
                <p className="font-medium uppercase text-[10px] font-serif text-primary/50">
                    {event.eventAction.toUpperCase()}
                </p>
            </div>
            <div>
                <p className="font text-base">{dateString}</p>
                <p className="font opacity-60 text-xs">{timeString}</p>
                <Badge variant="outline" className="mt-2 text-xs font-medium">
                    {difference}
                </Badge>
            </div>
        </div>
    );
};

export default InfoEventItem;
