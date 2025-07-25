// LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
// Simple Icon component (can be reused or replaced with a proper icon library)
const Icon = ({ name, size = 20, className = "" }) => ( // Added className prop
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-${name} ${className}`} // Applied className
    >
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>}
        {name === 'arrow-right' && <><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></>}
    </svg>
);

// Simple Google Logo SVG component
const GoogleLogo = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);


const LoginPage = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // State for form errors
    const [errors, setErrors] = useState({});
    // State for general login error (e.g., invalid credentials)
    const [loginError, setLoginError] = useState('');
    // State for successful submission
    const [isSubmitted, setIsSubmitted] = useState(false); // Or handle redirection


    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost/5040/userLogin",{email, password})
        .then(response => {console.log(response.data);})
        .catch(error => {console.error("There was an error logging in!", error);});
        
    };



    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:5040/api/auth/google/callback'; // Replace with your actual backend URL
    };

    return (
        <div className="login-page-container">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                </div>
            </header>

            <main className="login-main-content">
                <div className="login-form-card">
                    <h2>Welcome Back!</h2>
                    <p className="form-subtitle">Log in to access your account.</p>

                    {isSubmitted && ( // This is more for testing, usually you'd redirect
                        <div className="success-message">
                            <p>Login successful! Redirecting...</p>
                        </div>
                    )}

                    {loginError && (
                        <div className="error-message global-error-message">
                            <p>{loginError}</p>
                        </div>
                    )}

                    {!isSubmitted && (
                        <form onSubmit={handleSubmit} noValidate>
                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-with-icon">
                                    <Icon name="mail" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e)=>{setEmail(e.target.value);}}
                                        placeholder="e.g., john.doe@example.com"
                                        required
                                        aria-invalid={errors.email ? "true" : "false"}
                                        aria-describedby={errors.email ? "emailError" : null}
                                    />
                                </div>
                                {errors.email && <p id="emailError" className="error-text">{errors.email}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <div className="label-with-link">
                                    <label htmlFor="password">Password</label>
                                    <a href="/forgot-password" className="form-link">Forgot Password?</a>
                                </div>
                                <div className="input-with-icon">
                                    <Icon name="lock" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={(e)=>{setPassword(e.target.value);}}
                                        placeholder="Enter your password"
                                        required
                                        aria-invalid={errors.password ? "true" : "false"}
                                        aria-describedby={errors.password ? "passwordError" : null}
                                    />
                                </div>
                                {errors.password && <p id="passwordError" className="error-text">{errors.password}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">
                                <a href="/user-dashboard" style={{ textDecoration: 'none' }} >Log in</a> <Icon name="arrow-right" size={16} className="icon-right" />
                            </button>

                            {/* OR Separator */}
                            <div className="separator">
                                <span>OR</span>
                            </div>

                            {/* Google Login Button */}
                            <button
                                type="button"
                                className="btn btn-google btn-block"
                                onClick={handleGoogleAuth}
                            >
                                <GoogleLogo size={18} />
                                <span>Log In with Google</span>
                            </button>
                        </form>
                    )}

                    <p className="form-footer-text">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </div>
            </main>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                    <p>
                        <a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;