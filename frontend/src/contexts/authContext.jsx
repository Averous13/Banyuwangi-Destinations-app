import React, { createContext, useState, useEffect, useCallback } from 'react';
import authApi from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);


    const checkAuth = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                setUser(null);
                return;
            }

            const res = await authApi.get('/me');
            
            setUser(res.data.data);
            
            

        } catch (err) {
            // Token expired atau invalid → bersihkan
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get('token');

        if (tokenFromUrl) {
            localStorage.setItem('token', tokenFromUrl);
            // Bersihkan token dari URL agar tidak terlihat di address bar
            window.history.replaceState({}, document.title, '/');
        }
        
        checkAuth();
    }, [checkAuth]);


    const login = (token) => {
        localStorage.setItem('token', token);
        checkAuth(); 
    };

    // ─── logout ─────────────────────────────────────────────────────────────
    const logout = async () => {
        try {

            await authApi.post('/logout');
        } catch (err) {
            // Tetap lanjut logout di sisi client meski request gagal
            console.error('Logout request failed:', err);
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    // ─── Role checkers ───────────────────────────────────────────────────────
    const isAdmin = () => user?.role === 'admin';
    const isUser  = () => user?.role === 'user';
    const isMitra = () => user?.role === 'partner'; // FIX BUG 4: tambah isMitra

    // ─── Provider ────────────────────────────────────────────────────────────
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                checkAuth,
                isAdmin,
                isUser,
                isMitra,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};