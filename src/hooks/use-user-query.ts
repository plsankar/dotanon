import { parseAsString, useQueryState } from "nuqs";

import { useMemo } from "react";

const useUserQuery = () => {
    const [_query, setQuery] = useQueryState<string>(
        "query",
        parseAsString.withDefault("")
    );
    const query = useMemo(
        () =>
            _query
                .toLowerCase() // Convert to lowercase
                .replace(/\s+/g, "") // Remvoe spaces
                .replace(/[^a-z0-9.-]/g, "") // Remove invalid characters
                .replace(/^-+|-+$/g, "") // Remove leading/trailing hyphens
                .replace(/\.+/g, "."), // Replace multiple dots with a single dot
        [_query]
    );
    return { query, setQuery };
};

export default useUserQuery;
