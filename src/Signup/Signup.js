import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();  // Prevents the form from submitting traditionally

        // Basic validation for email and password
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        if (isSignUp && name.trim().length === 0) {
            alert("Name cannot be empty.");
            return;
        }

        const baseUrl = 'http://159.203.162.71:5001';
        const url = isSignUp ? `${baseUrl}/signup` : `${baseUrl}/login`;
        const userData = isSignUp ? { name, email, password } : { email, password };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                navigate('/home');
            } else {
                throw new Error(data.message || 'Unknown error occurred');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <div className='container'>
            <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
                <div className="form sign-in">
                    <h2>Welcome back</h2>
                    <label>
                        <span>Email Address</span>
                        <input type="lemail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="lpassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="lbutton" className="submit" onClick={handleSubmit}>Sign In</button>
                    <button type="button" className={`toggle-mode ${isSignUp ? 'hide' : ''}`} onClick={toggleMode}>
                        <span className="m--up">Sign Up</span>
                    </button>
                </div>
                <div className="sub-cont">
                    <div className="form sign-up">
                        <h2>Create Account</h2>
                        <label>
                            <span>Name</span>
                            <input type="stext" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            <span>Email Address</span>
                            <input type="semail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="spassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button type="sbutton" className="submit" onClick={handleSubmit}>Sign Up</button>
                        <button type="button" className={`toggle-mode ${isSignUp ? '' : 'hide'}`} onClick={toggleMode}>
                            <span className="m--in">Sign In</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
