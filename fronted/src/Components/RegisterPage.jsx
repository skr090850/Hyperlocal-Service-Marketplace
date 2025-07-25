// SignupPage.jsx
import React, { useState }
    from 'react';
import './Components.css'; // Import the CSS file
import axios from "axios";
import { Link } from 'react-router-dom';

// Simple Icon component (can be reused or replaced with a proper icon library)
const Icon = ({ name, size = 20 }) => (
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
        className={`icon icon-${name}`}
    >
        {name === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>}
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>}
        {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>}
        {name === 'arrow-right' && <><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></>}
    </svg>
);
const GoogleLogo = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        <path d="M1 1h22v22H1z" fill="none" />
    </svg>
);


const SignupPage = () => {
    // State for form inputs
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '', // Optional for now, for OTP later
        password: '',
        confirmPassword: '',
    });

    // State for form errors
    const [errors, setErrors] = useState({});
    // State for successful submission
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
        // Clear error for the field being changed
        if (errors[name]) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null,
            }));
        }
        // Clear confirmPassword error if password is changed
        if (name === 'password' && errors.confirmPassword) {
            setErrors(prevErrors => ({
                ...prevErrors,
                confirmPassword: null,
            }));
        }
    };

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full Name is required.';
        }
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        // Phone is optional for now, so no validation unless a value is entered
        if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm Password is required.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [FullName, setFullName] = useState();
    const [phone, setPhone] = useState();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5040/api/users/register", {
            fullName: FullName, 
            email: email,
            phone: phone,
            password: password
        })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };



    const handleGoogleAuth = () => {
        window.location.href = 'http://localhost:5040/api/auth/google/callback'; // Replace with your actual backend URL
    };




    return (
        <div className="signup-page-container">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                </div>
            </header>

            <main className="signup-main-content">
                <div className="signup-form-card">
                    <h2>Create Your Account</h2>
                    <p className="form-subtitle">Join us to find the best local services.</p>

                    {isSubmitted && (
                        <div className="success-message">
                            <p>Registration successful! You can now <a href="/login">login</a>.</p>
                        </div>
                    )}

                        <form onSubmit={handleSubmit} >
                            {/* Full Name Field */}
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <div className="input-with-icon">
                                    <Icon name="user" />
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        onChange={(e) => { setFullName(e.target.value); }}
                                        placeholder="e.g., John Doe"
                                        required
                                        aria-invalid={errors.fullName ? "true" : "false"}
                                        aria-describedby={errors.fullName ? "fullNameError" : null}
                                    />
                                </div>
                                {errors.fullName && <p id="fullNameError" className="error-text">{errors.fullName}</p>}
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <div className="input-with-icon">
                                    <Icon name="mail" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={(e) => { setEmail(e.target.value); }}
                                        placeholder="e.g., john.doe@example.com"
                                        required
                                        aria-invalid={errors.email ? "true" : "false"}
                                        aria-describedby={errors.email ? "emailError" : null}
                                    />
                                </div>
                                {errors.email && <p id="emailError" className="error-text">{errors.email}</p>}
                            </div>

                            {/* Phone Number Field (Optional) */}
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number (Optional)</label>
                                <div className="input-with-icon">
                                    <Icon name="phone" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        onChange={(e) => { setPhone(e.target.value); }}
                                        placeholder="e.g., 9876543210"
                                        aria-invalid={errors.phone ? "true" : "false"}
                                        aria-describedby={errors.phone ? "phoneError" : null}
                                    />
                                </div>
                                {errors.phone && <p id="phoneError" className="error-text">{errors.phone}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-with-icon">
                                    <Icon name="lock" />
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={(e) => { setPassword(e.target.value); }}
                                        placeholder="Minimum 8 characters"
                                        required
                                        aria-invalid={errors.password ? "true" : "false"}
                                        aria-describedby={errors.password ? "passwordError" : null}
                                    />
                                </div>
                                {errors.password && <p id="passwordError" className="error-text">{errors.password}</p>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-with-icon">
                                    <Icon name="lock" />
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Re-enter your password"
                                        required
                                        aria-invalid={errors.confirmPassword ? "true" : "false"}
                                        aria-describedby={errors.confirmPassword ? "confirmPasswordError" : null}
                                    />
                                </div>
                                {errors.confirmPassword && <p id="confirmPasswordError" className="error-text">{errors.confirmPassword}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">
                                Sign Up <Icon name="arrow-right" size={16} />
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
                                <span>Register with Google</span>
                            </button>
                        </form>

                    <p className="form-footer-text">
                        Already have an account? <Link to="/login">Log In</Link>
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

export default SignupPage;
