import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await fetch('http://159.203.162.71:5001/logout', {
        method: 'POST',
        credentials: 'include'  // make sure credentials are included
      });
      const data = await response.json();
      if (response.ok) {
        // Clear local storage or any other client-side storage
        localStorage.clear();

        // Redirect to login page
        navigate('/');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed: ' + error.message);
    }
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/budget">Budget</Link>
        </li>
        <li>
          <Link to="/expenses">Expenses</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <button className='logoutbtn' onClick={logout}>Logout</button> {/* Changed Link to button */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
