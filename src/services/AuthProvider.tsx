import { useState, ReactNode, useEffect } from 'react';
import { AuthContext } from './AuthContext';
interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (token: string) => {
        console.log('Received token:', token); // Add this line
        try {
            localStorage.setItem('token', token);
            setToken(token);
        } catch (error) {
            console.error('Error storing token in localStorage:', error);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };