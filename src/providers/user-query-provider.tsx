"use client";

import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface UserQueryContextProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    mode: "whois" | "availability";
    setMode: Dispatch<SetStateAction<"whois" | "availability">>;
}

const UserQueryContext = createContext({} as UserQueryContextProps);

export const useUseQueryContext = () => useContext(UserQueryContext);

const UserQueryProvider = ({ children }: { children: ReactNode }) => {
    const [query, setQuery] = useState("");
    const [mode, setMode] = useState<"whois" | "availability">("whois");
    return (
        <UserQueryContext.Provider value={{ query, setQuery, mode, setMode }}>
            {children}
        </UserQueryContext.Provider>
    );
};

export default UserQueryProvider;
