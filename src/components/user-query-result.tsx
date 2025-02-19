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
                    <AvailabilityResult />
                </>
            ) : null}
        </div>
    );
};

export default UserQueryResult;
