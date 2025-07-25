// ProviderLoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// --- Helper Icon Component (can be moved to a shared file) ---
const Icon = ({ name, size = 20, color = 'currentColor', className = '' }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`icon icon-${name} ${className}`}
    >
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>}
        {name === 'arrow-right' && <><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></>}
        {name === 'alert-triangle' && <><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>}
        {name === 'check-circle' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>}
    </svg>
);

const ProviderLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
        setLoginError('');
    };

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
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsSubmitted(false);

        if (!validateForm()) {
            console.log('Provider login form has errors:', errors);
            return;
        }

        setIsProcessing(true);
        console.log('Provider login attempt with:', formData);

        // --- Simulate API Call for Login ---
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay

        // Example: Replace with actual API call
        if (formData.email === "provider@example.com" && formData.password === "password123") {
            console.log('Provider login successful');
            setIsSubmitted(true); // Or redirect to provider dashboard
            alert('Provider Login Successful! Redirecting to your dashboard...');
            // In a real app: history.push('/provider/dashboard');
            window.location.href = '/provider/dashboard'; // Placeholder redirect
        } else {
            setLoginError('Invalid email or password. Please try again.');
            console.log('Provider login failed: Invalid credentials');
        }
        setIsProcessing(false);
    };

    // These class names assume a common CSS structure like in provider_signup_page_standalone_css
    // e.g., .auth-page-container, .minimal-header, .auth-main-content, .auth-form-card, etc.
    return (
        <div className="auth-page-container provider-login-page"> {/* Common top-level class */}
            <header className="minimal-header"> {/* Common header class */}
                <div className="container">
                    <div className="logo">
                        <Link to="/">Service<span className="logo-accent">Hub</span></Link>
                    </div>
                </div>
            </header>

            <main className="auth-main-content"> {/* Common main content class */}
                <div className="auth-form-card provider-login-form-card"> {/* Common card base + specific */}
                    <h2>Provider Login</h2>
                    <p className="form-subtitle">Access your provider dashboard.</p>

                    {isSubmitted && (
                        <div className="success-message"> {/* Common success message class */}
                            <Icon name="check-circle" size={18} /> Login successful! Redirecting...
                        </div>
                    )}

                    {loginError && (
                        <div className="error-message global-error-message"> {/* Common error message class */}
                            <Icon name="alert-triangle" size={18} /> {loginError}
                        </div>
                    )}

                    {!isSubmitted && (
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="form-group"> {/* Common form group class */}
                                <label htmlFor="email">Email Address</label>
                                <div className="input-with-icon"> {/* Common input with icon class */}
                                    <Icon name="mail" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g., provider@example.com"
                                        required
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                </div>
                                {errors.email && <p className="error-text">{errors.email}</p>} {/* Common error text class */}
                            </div>

                            <div className="form-group">
                                <div className="label-with-link"> {/* Specific to login forms with forgot password */}
                                    <label htmlFor="password">Password</label>
                                    <a href="/provider/forgot-password" className="form-link">Forgot Password?</a>
                                </div>
                                <div className="input-with-icon">
                                    <Icon name="lock" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                        aria-invalid={errors.password ? "true" : "false"}
                                    />
                                </div>
                                {errors.password && <p className="error-text">{errors.password}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">
                                <a href="/provider-dashboard" style={{ textDecoration: 'none' }} >Log in</a> <Icon name="arrow-right" size={16} className="icon-right" />
                            </button>
                            {/* <button type="submit" className="btn btn-primary btn-block" disabled={isProcessing}>
                                {isProcessing ? 'Logging In...' : 'Log In'}
                                {!isProcessing && <Icon name="arrow-right" size={16} />}
                            </button> */}
                        </form>
                    )}

                    <p className="form-footer-text"> {/* Common footer text class */}
                        Don't have a provider account? <a href="/provider/signup">Register Here</a>
                    </p>
                    <p className="form-footer-text">
                        Are you a customer? <a href="/login">Customer Login</a>
                    </p>
                </div>
            </main>

            <footer className="minimal-footer"> {/* Common footer class */}
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProviderLoginPage;
