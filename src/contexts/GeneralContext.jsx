import React, { createContext, useState, useEffect } from 'react';
import { fetchData } from '../services/api';

const GeneralContext = createContext();

function GeneralProvider({ children }) {
    const [getProfile, setGetProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                const [userResponse] = await Promise.all([
                    fetchData('/get-profile'),
                ]);

                setGetProfile(userResponse.data.data.user);
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
        loading
    };

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
}

export { GeneralContext, GeneralProvider };