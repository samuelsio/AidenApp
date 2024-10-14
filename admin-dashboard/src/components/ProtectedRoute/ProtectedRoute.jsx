import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        async function verifyToken() {
            try {
                const response = await fetch('http://localhost:3011/users/token', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    setIsAuthenticated(true); // Set the state to authenticated
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token'); // Remove invalid token
                }
            } catch (error) {
                console.error('Error validating token:', error);
                setIsAuthenticated(false);
            }
        }

        if (token) {
            verifyToken();
        } else {
            setIsAuthenticated(false);
        }
    }, [token]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
}
