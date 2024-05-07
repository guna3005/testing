import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode'; // Correct named import for jwt-decode
import axios from 'axios';

const TokenExpiryAlert = ({ token, onRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [expiresAt, setExpiresAt] = useState(() => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000; // Convert to milliseconds
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if ((expiresAt - Date.now()) < 20000) { // 20 seconds before token expires
        setShowModal(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleRefresh = async () => {
    onRefresh();
    setShowModal(false); // Hide modal after refresh
    setExpiresAt(Date.now() + 60000); // Assuming the new token also expires in 60 seconds
  };

  return (
    <>
      {showModal && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
          <div style={{ padding: '20px', background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p>Your session is about to expire. Do you want to extend it?</p>
            <button onClick={handleRefresh}>Refresh Token</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenExpiryAlert;
