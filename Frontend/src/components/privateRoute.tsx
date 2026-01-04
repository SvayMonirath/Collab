import type React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import { checkAuthStatus } from "../api/authAPI";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children}) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            setLoading(true);
            try {
                const response = await checkAuthStatus();
                if (response?.is_authenticated) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated === null) {
        // Optionally, render a loading indicator while checking auth status
        return <div>Loading...</div>;
    }

    if (isAuthenticated === false) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}
