// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { AuthProvider } from './Token/AuthContext';
//import TokenExpiryAlert from './Token/TokenExpiryAlert';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Budget from './Budget/Budget';
import Expenses from './Expenses/Expenses';
import Dashboard from './Dashboard/Dashboard';
import Layout from './Layout/Layout';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Token/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/budget" element={<Layout><Budget /></Layout>} />
          <Route path="/expenses" element={<Layout><Expenses /></Layout>} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        </Routes>
        </AuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
