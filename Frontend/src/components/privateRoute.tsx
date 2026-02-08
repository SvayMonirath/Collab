import type React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// URL
import { LoginUrl } from "../urlPath";

// Components
import { LoadingScreen } from "./Loaders/LoadingScreenComponent";

// API
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
        return <LoadingScreen message="Checking authentication..."/>;
    }

    if (isAuthenticated === null) {
        return <LoadingScreen message="Checking authentication..."/>;
    }

    if (isAuthenticated === false) {
        return <Navigate to={LoginUrl} replace />;
    }

    return <>{children}</>;
}
