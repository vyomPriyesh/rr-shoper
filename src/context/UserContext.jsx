import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import apiList from "../config/apiList";
import api from "../config/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const { allOptions } = apiList();

    const [user, setUser] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [refresh]);

    const logout = async () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const { data: { data: { data: options = {} } = {} } = {} } = useQuery({
        queryFn: () => api.get(allOptions.get)
    })

    const contactDetails = {
        mobile: '+91 9499839239',
        email: 'sellersupport@rrshoper.in',
    }



    return (
        <UserContext.Provider value={{ user, setUser, logout, refresh, setRefresh, contactDetails, options }}>
            {children}
        </UserContext.Provider>
    );
}

export const userState = () => useContext(UserContext);