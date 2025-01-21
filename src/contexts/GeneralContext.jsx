import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import useSidebarToggle from '../hooks/useSidebarToggle';

const GeneralContext = createContext();

function GeneralProvider({ children }) {
    const [getProfile, setGetProfile] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toggle, isOpen, close } = useSidebarToggle();

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [userResponse] = await Promise.all([
                    fetchData('/get-profile'),
                ]);

                setGetProfile(userResponse.data.data.user);
                if(userResponse.data.data.user.role === 'superadmin'){
                    setIsAuthenticated(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const value = {
        getProfile,
        loading,
        isAuthenticated,
        toggle,
        isOpen,
        close
    };

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
}

export { GeneralContext, GeneralProvider };