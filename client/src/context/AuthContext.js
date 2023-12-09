import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('/user');
            const data = await res.json();
            setUser(data);
        };

        getUser();
    }, []);

    const logout = async () => {
        await fetch('/auth/logout', {
            method: 'POST',
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
