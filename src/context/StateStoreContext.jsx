import { createContext, useContext } from "react";
import api from "../config/api";
import apiList from "../config/apiList";
import { useQuery } from "@tanstack/react-query";

const StateStoreContext = createContext();

export const StateStoreProvider = ({ children }) => {

    const { platforms, images } = apiList();

    const { data: { data: { data: platFormData = [] } = {} } = {}, isLoading: platFormLDataoading } = useQuery({
        queryKey: ["all-platforms"],
        queryFn: () => api.post(platforms.all, {}),
        select: ({ data }) => data
    })

    return (


        <StateStoreContext.Provider value={{ platFormData, platFormLDataoading }} >
            {children}
        </StateStoreContext.Provider>
    )

}

export const StateStore = () => useContext(StateStoreContext)