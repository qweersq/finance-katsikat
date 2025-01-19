import { useContext } from 'react';
import { GeneralContext } from '../contexts/GeneralContext';

export function useGeneral() {
    const context = useContext(GeneralContext);
    if (context === undefined) {
        throw new Error('useGeneral must be used within a GeneralProvider');
    }
    return context;
} 