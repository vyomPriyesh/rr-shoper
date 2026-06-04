import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

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

    const contactDetails = {
        mobile: '+91 9499839239',
        email: 'sellersupport@rrshoper.in',
    }



    return (
        <UserContext.Provider value={{ user, setUser, logout, refresh, setRefresh, contactDetails }}>
            {children}
        </UserContext.Provider>
    );
}

export const userState = () => useContext(UserContext);