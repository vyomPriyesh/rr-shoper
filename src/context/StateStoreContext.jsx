import { createContext, useContext, useMemo } from "react";
import api from "../config/api";
import apiList from "../config/apiList";
import { useQuery } from "@tanstack/react-query";

const StateStoreContext = createContext();

export const StateStoreProvider = ({ children }) => {

    const { platforms } = apiList();

    const { data: { data: { data: platFormData = [] } = {} } = {}, isLoading: platFormLDataoading } = useQuery({
        queryKey: ["all-platforms"],
        queryFn: () => api.post(platforms.all, {}),
        select: ({ data }) => data
    })

    const indexPlatFormData = useMemo(() => {
        return [...platFormData].sort((a, b) => {
            if (a.index == null) return 1;
            if (b.index == null) return -1;

            return Number(a.index) - Number(b.index);
        });
    }, [platFormData])

    return (


        <StateStoreContext.Provider value={{ platFormData: indexPlatFormData, platFormLDataoading }} >
            {children}
        </StateStoreContext.Provider>
    )

}

export const StateStore = () => useContext(StateStoreContext)