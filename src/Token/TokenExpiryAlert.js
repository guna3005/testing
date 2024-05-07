import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
 // Make sure the import is correct
import { useAuth } from './AuthContext';

const TokenExpiryAlert = () => {
    const { authToken, refreshToken } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (!authToken) {
                return; // No token, nothing to check
            }
            const decoded = jwtDecode(authToken); // Correct usage of jwtDecode
            const currentTime = Date.now() / 1000; // Current time in seconds
            if (decoded.exp < currentTime + 20) { // Token will expire in the next 20 seconds
                setShowAlert(true);
            } else {
                setShowAlert(false);
            }
        };

        const interval = setInterval(checkTokenExpiration, 1000);
        return () => clearInterval(interval);
    }, [authToken]);

    return (
        showAlert && (
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
                <div style={{ padding: '10px', background: 'white', border: '1px solid black' }}>
                    <p>Your session is about to expire. Do you want to extend it?</p>
                    <button onClick={() => { refreshToken(); setShowAlert(false); }}>Refresh Session</button>
                </div>
            </div>
        )
    );
};

export default TokenExpiryAlert;
