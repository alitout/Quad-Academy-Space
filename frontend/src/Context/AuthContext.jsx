import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [bearerToken, setBearerToken] = useState(localStorage.getItem('bearerToken') || null);
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user')) || null;
        } catch {
            return null;
        }
    });

    // keep localStorage in sync
    useEffect(() => {
        if (bearerToken) localStorage.setItem('bearerToken', bearerToken);
        else localStorage.removeItem('bearerToken');
    }, [bearerToken]);

    useEffect(() => {
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
        else localStorage.removeItem('refreshToken');
    }, [refreshToken]);

    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    const login = ({ user: userObj, accessToken, refreshToken: newRefreshToken }) => {

        try {
            if (accessToken) localStorage.setItem('bearerToken', accessToken);
            if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);
            if (userObj) localStorage.setItem('user', JSON.stringify(userObj));
        } catch (e) {
            console.warn('Failed to write auth data to localStorage synchronously', e);
        }

        setUser(userObj || null);
        setBearerToken(accessToken || null);
        setRefreshToken(newRefreshToken || null);
    };

    const logout = () => {
        setUser(null);
        setBearerToken(null);
        setRefreshToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('bearerToken');
        localStorage.removeItem('refreshToken');
        // optional: redirect to sign-in
        try { window.location.href = '/sign-in'; } catch (e) { /* ignore in tests */ }
    };

    const updateUser = (patch) => {
        setUser(prev => ({ ...(prev || {}), ...(patch || {}) }));
    };

    const value = {
        bearerToken,
        refreshToken,
        user,
        login,
        logout,
        updateUser,
        setBearerToken,
        setRefreshToken,
        setUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
