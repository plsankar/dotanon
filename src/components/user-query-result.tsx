"use client";

import AvailabilityResult from "./availability-result";
import React from "react";
import useUserQuery from "@/hooks/use-user-query";

const UserQueryResult = () => {
    const { query } = useUserQuery();

    return (
        <div>
            {query.length > 0 ? (
                <>
                    <div className="mt-5">
                        <p className="text-lg font-serif">
                            Results for: {query}
                        </p>
                    </div>
                    <AvailabilityResult />
                </>
            ) : null}
        </div>
    );
};

export default UserQueryResult;
