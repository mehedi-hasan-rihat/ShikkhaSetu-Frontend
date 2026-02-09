'use client';

import { createContext, useContext, ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';

interface AuthContextType {
    user: any;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const session = authClient.useSession();

    const logout = async () => {
        await authClient.signOut();
    };

    const value = {
        user: session.data?.user || null,
        isLoading: session.isPending,
        isAuthenticated: !!session.data?.user,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}