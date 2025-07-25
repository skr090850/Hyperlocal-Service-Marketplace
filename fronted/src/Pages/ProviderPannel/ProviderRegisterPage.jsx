// ProviderSignupPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Assuming AuthCommon.css is imported globally or in App.js
// import './AuthCommon.css'; // If needed per component

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
        {name === 'user' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></>}
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>}
        {name === 'lock' && <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></>}
        {name === 'arrow-right' && <><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></>}
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'tool' && <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>}
        {name === 'award' && <><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 22 12 17 17 22 15.79 13.88"></polyline></>}
        {name === 'file-text' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>}
        {name === 'upload-cloud' && <><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></>}
    </svg>
);

// Mock service categories (in a real app, these might come from an API)
const serviceCategories = [
    "Plumbing", "Electrical", "Beautician", "Appliance Repair",
    "Carpentry", "Moving Services", "Cleaning", "Tutoring", "Fitness Training"
];

const ProviderSignupPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        businessName: '',
        serviceCategory: '',
        experienceYears: '',
        serviceDescription: '',
        // document: null, // For file upload, handling is more complex
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            // setFormData(prev => ({ ...prev, [name]: files[0] })); // Basic file handling
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 10 digits.';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long.';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required.';
        if (!formData.serviceCategory) newErrors.serviceCategory = 'Please select a service category.';
        if (!formData.experienceYears.trim()) {
            newErrors.experienceYears = 'Years of experience is required.';
        } else if (isNaN(formData.experienceYears) || Number(formData.experienceYears) < 0) {
            newErrors.experienceYears = 'Please enter a valid number for years of experience.';
        }
        if (!formData.serviceDescription.trim()) {
            newErrors.serviceDescription = 'Service description is required.';
        } else if (formData.serviceDescription.trim().length < 50) {
            newErrors.serviceDescription = 'Description should be at least 50 characters.';
        }
        // Basic check for document, actual validation is more complex
        // if (!formData.document) newErrors.document = 'Please upload a verification document.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(false);
        if (validateForm()) {
            console.log('Provider Signup Data:', formData);
            // TODO: Actual API call for provider registration
            // This would likely involve multipart/form-data if uploading files
            setIsSubmitted(true);
            alert('Provider registration submitted! Your application is under review.');
            // Reset form or redirect
        } else {
            console.log('Provider form has errors:', errors);
        }
    };

    return (
        // Assuming .auth-page-container and other common classes are defined in AuthCommon.css
        <div className="auth-page-container provider-signup-page">
            <header className="minimal-header">
                <div className="container">
                    <div className="logo">
                        <a href="/">Service<span className="logo-accent">Hub</span></a>
                    </div>
                </div>
            </header>

            <main className="auth-main-content">
                <div className="auth-form-card provider-signup-form-card">
                    <h2>Become a Service Provider</h2>
                    <p className="form-subtitle">Join our network of trusted professionals.</p>

                    {isSubmitted && (
                        <div className="success-message">
                            <p>Thank you for registering! Your application will be reviewed, and we will get back to you soon. You can <a href="/login">login</a> once approved.</p>
                        </div>
                    )}

                    {!isSubmitted && (
                        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                            {/* Personal Information */}
                            <h3 className="form-section-title">Personal Information</h3>
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <div className="input-with-icon">
                                    <Icon name="user" />
                                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g., Priya Sharma" required />
                                </div>
                                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
                            </div>
                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label htmlFor="email">Email Address</label>
                                    <div className="input-with-icon">
                                        <Icon name="mail" />
                                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., priya.sharma@example.com" required />
                                    </div>
                                    {errors.email && <p className="error-text">{errors.email}</p>}
                                </div>
                                <div className="form-group half-width">
                                    <label htmlFor="phone">Phone Number</label>
                                    <div className="input-with-icon">
                                        <Icon name="phone" />
                                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., 9876543210" required />
                                    </div>
                                    {errors.phone && <p className="error-text">{errors.phone}</p>}
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label htmlFor="password">Password</label>
                                    <div className="input-with-icon">
                                        <Icon name="lock" />
                                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Minimum 8 characters" required />
                                    </div>
                                    {errors.password && <p className="error-text">{errors.password}</p>}
                                </div>
                                <div className="form-group half-width">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <div className="input-with-icon">
                                        <Icon name="lock" />
                                        <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" required />
                                    </div>
                                    {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            {/* Business & Service Information */}
                            <h3 className="form-section-title">Business & Service Details</h3>
                            <div className="form-group">
                                <label htmlFor="businessName">Business Name / Your Name (if individual)</label>
                                <div className="input-with-icon">
                                    <Icon name="briefcase" />
                                    <input type="text" id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="e.g., Priya Electric Works or Priya Sharma" required />
                                </div>
                                {errors.businessName && <p className="error-text">{errors.businessName}</p>}
                            </div>
                            <div className="form-row">
                                <div className="form-group half-width">
                                    <label htmlFor="serviceCategory">Primary Service Category</label>
                                    <div className="input-with-icon">
                                        <Icon name="tool" />
                                        <select id="serviceCategory" name="serviceCategory" value={formData.serviceCategory} onChange={handleChange} required>
                                            <option value="" disabled>Select Category</option>
                                            {serviceCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                    {errors.serviceCategory && <p className="error-text">{errors.serviceCategory}</p>}
                                </div>
                                <div className="form-group half-width">
                                    <label htmlFor="experienceYears">Years of Experience</label>
                                    <div className="input-with-icon">
                                        <Icon name="award" />
                                        <input type="number" id="experienceYears" name="experienceYears" value={formData.experienceYears} onChange={handleChange} placeholder="e.g., 5" min="0" required />
                                    </div>
                                    {errors.experienceYears && <p className="error-text">{errors.experienceYears}</p>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="serviceDescription">Brief Description of Your Services</label>
                                <div className="input-with-icon textarea-with-icon">
                                    <Icon name="file-text" className="textarea-icon" />
                                    <textarea id="serviceDescription" name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} rows="4" placeholder="Describe the services you offer, your expertise, etc. (Min 50 characters)" required></textarea>
                                </div>
                                {errors.serviceDescription && <p className="error-text">{errors.serviceDescription}</p>}
                            </div>

                            {/* Document Upload Placeholder */}
                            <h3 className="form-section-title">Verification Document</h3>
                            <div className="form-group">
                                <label htmlFor="document">Upload ID / Business Registration (Optional for now)</label>
                                <div className="input-with-icon file-input-container">
                                    <Icon name="upload-cloud" />
                                    <input type="file" id="document" name="document" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" />
                                    {/* Display file name if selected - for better UX */}
                                    {/* {formData.document && <span className="file-name-display">{formData.document.name}</span>} */}
                                </div>
                                <p className="form-help-text">E.g., Aadhar Card, PAN Card, GST Certificate. Max 5MB. (PDF, JPG, PNG)</p>
                                {errors.document && <p className="error-text">{errors.document}</p>}
                            </div>


                            <button type="submit" className="btn btn-primary btn-block">
                                Register as Provider <Icon name="arrow-right" size={16} />
                            </button>
                        </form>
                    )}

                    <p className="form-footer-text">
                        Already have an account? <Link to="/provider-login">Log In</Link>
                    </p>
                    <p className="form-footer-text">
                        Are you a customer? <Link to="/register">Sign Up Here</Link>
                    </p>
                </div>
            </main>

            <footer className="minimal-footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} ServiceHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default ProviderSignupPage;
