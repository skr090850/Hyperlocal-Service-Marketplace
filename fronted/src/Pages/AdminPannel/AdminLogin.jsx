    // AdminLoginPage.jsx
import React, { useState } from 'react';
import './AdminPannel.css'; 
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
        {name === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>}
        {name === 'alert-triangle' && <><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></>}
    </svg>
);

const AdminLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

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

        if (!validateForm()) {
            console.log('Admin login form has errors:', errors);
            return;
        }

        setIsProcessing(true);
        console.log('Admin login attempt with:', formData);

        // --- Simulate API Call for Admin Login ---
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Example: Replace with actual API call and role check
        if (formData.email === "admin@servicehub.com" && formData.password === "adminpass") {
            console.log('Admin login successful');
            alert('Admin Login Successful! Redirecting to Admin Panel...');
            window.location.href = '/admin/dashboard';
        } else {
            setLoginError('Invalid admin credentials. Please try again.');
            console.log('Admin login failed: Invalid credentials');
        }
        setIsProcessing(false);
    };

    return (
        <div className="auth-page-container admin-login-page">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span> <span className="admin-tag">[Admin]</span></a>
                    </div>
                </div>
            </header>

            <main className="auth-main-content">
                <div className="auth-form-card admin-login-form-card">
                    <Icon name="shield" size={48} className="admin-form-icon" />
                    <h2>Admin Panel Login</h2>
                    <p className="form-subtitle">Access the platform's management console.</p>

                    {loginError && (
                        <div className="error-message global-error-message">
                            <Icon name="alert-triangle" size={18} /> {loginError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="email">Admin Email</label>
                            <div className="input-with-icon">
                                <Icon name="mail" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="admin@example.com"
                                    required
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                            </div>
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>

                        <div className="form-group">
                            <div className="label-with-link">
                                <label htmlFor="password">Password</label>
                                {/* <a href="/admin/forgot-password" className="form-link">Forgot Password?</a> */}
                            </div>
                            <div className="input-with-icon">
                                <Icon name="lock" />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter admin password"
                                    required
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                            </div>
                            {errors.password && <p className="error-text">{errors.password}</p>}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block btn-admin-login" disabled={isProcessing}>
                            {isProcessing ? 'Logging In...' : 'Login to Admin Panel'}
                            {!isProcessing && <Icon name="arrow-right" size={16} />}
                        </button>
                    </form>
                    {/* Optional: Link back to main site if needed */}
                    {/* <p className="form-footer-text">
            <a href="/">Back to Main Site</a>
          </p> */}
                </div>
            </main>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub Admin Console</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminLoginPage;
