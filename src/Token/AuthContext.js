// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/login', { username, password });
            setAuthToken(response.data.token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await axios.get('/api/refresh-token', {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            setAuthToken(response.data.newToken);
        } catch (error) {
            console.error('Token refresh failed:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authToken, login, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
