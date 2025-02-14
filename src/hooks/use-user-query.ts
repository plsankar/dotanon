import { parseAsString, useQueryState } from "nuqs";

import { useMemo } from "react";

const useUserQuery = () => {
    const [_query, setQuery] = useQueryState<string>(
        "query",
        parseAsString.withDefault("")
    );
    const query = useMemo(() => _query, [_query]);
    return { query, setQuery };
};

export default useUserQuery;
