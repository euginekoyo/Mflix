// context/authContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check localStorage on component mount
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
        const storedIsAdmin = localStorage.getItem('isAdmin');

        if (storedIsAuthenticated === 'true') {
            setIsAuthenticated(true);
            console.log(isAdmin)
            setIsAdmin(storedIsAdmin === 'true');
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            if (response.data.isAuthenticated) {
                setIsAuthenticated(true);
                setIsAdmin(response.data.isAdmin);
                // Store authentication state in localStorage
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('isAdmin', response.data.isAdmin ? 'true' : 'false');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setIsAuthenticated(false);
            setIsAdmin(false);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isAdmin');
        }
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            setIsAuthenticated(false);
            setIsAdmin(false);
            // Clear authentication state from localStorage
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isAdmin');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
