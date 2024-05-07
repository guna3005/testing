// File: Layout.js
import React from 'react';
import './Layout';
import Navbar from '../Navbar/Navbar'; // Adjust the import path as needed
import TokenExpiryAlert from '../Token/TokenExpiryAlert';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="content">
        {children}
      </div>
      <TokenExpiryAlert />
    </div>
  );
};

export default Layout;
