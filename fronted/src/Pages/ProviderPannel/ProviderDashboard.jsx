// ProviderDashboardPage.jsx
import React, { useState, useEffect } from 'react';
// import './EditProviderProfileForm.css'; // CSS for the EditProviderProfileForm, ensure this is linked or merged

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
        {name === 'layout-dashboard' && <><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>}
        {name === 'briefcase' && <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></>}
        {name === 'calendar-check' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="m9 16 2 2 4-4"></path></>}
        {name === 'dollar-sign' && <><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></>}
        {name === 'user-cog' && <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle><circle cx="18" cy="16" r="3"></circle><path d="M19.4 12.5A1.65 1.65 0 0 0 21 14a1.65 1.65 0 0 0-1.6 1.5V17a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1 1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V23a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82V17a1.65 1.65 0 0 0-1.51-1H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 6.6 14a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H10a1.65 1.65 0 0 0 1-1.51V7a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82z"></path></>}
        {name === 'log-out' && <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></>}
        {name === 'plus-circle' && <><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></>}
        {name === 'bell' && <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></>}
        {name === 'edit-3' && <><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></>}
        {name === 'eye' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></>}
        {name === 'tool' && <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>}
        {name === 'map-pin' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></>}
        {name === 'calendar' && <><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></>}
        {name === 'clock' && <><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></>}
        {name === 'star' && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>}
        {name === 'save' && <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></>}
        {name === 'x-circle' && <><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></>}
        {name === 'image' && <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></>}
        {name === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></>}
        {name === 'phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>}
        {name === 'file-text' && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></>}
        {name === 'check-circle' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></>}
        {name === 'x' && <line x1="18" y1="6" x2="6" y2="18"></line>}
        {name === 'x' && <line x1="6" y1="6" x2="18" y2="18"></line>}
    </svg>
);


// --- EditProviderProfileForm Component (Now defined within ProviderDashboardPage.jsx) ---
const EditProviderProfileForm = ({ currentProvider, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        email: '',
        phone: '',
        tagline: '',
        description: '',
        location: '',
        workingHours: [{ day: 'Monday - Friday', hours: '' }, { day: 'Saturday', hours: '' }, { day: 'Sunday', hours: '' }],
        experienceYears: 0,
        profileImageUrl: '',
        bannerImageUrl: '',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentProvider) {
            setFormData({
                businessName: currentProvider.businessName || '',
                email: currentProvider.email || '', // Email is read-only in the form
                phone: currentProvider.contact?.phone || '',
                tagline: currentProvider.tagline || '',
                description: currentProvider.description || '',
                location: currentProvider.location || '',
                workingHours: currentProvider.workingHours && currentProvider.workingHours.length > 0
                    ? currentProvider.workingHours.map(wh => ({ ...wh }))
                    : [{ day: 'Monday - Friday', hours: '' }, { day: 'Saturday', hours: '' }, { day: 'Sunday', hours: '' }],
                experienceYears: currentProvider.experienceYears || 0,
                profileImageUrl: currentProvider.profileImageUrl || '',
                bannerImageUrl: currentProvider.bannerImageUrl || '',
            });
        }
    }, [currentProvider]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleWorkingHoursChange = (index, field, value) => {
        const updatedHours = formData.workingHours.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setFormData(prev => ({ ...prev, workingHours: updatedHours }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.businessName.trim()) newErrors.businessName = 'Business Name is required.';
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\+?[0-9\s-()]{7,20}$/.test(formData.phone)) {
            newErrors.phone = 'Enter a valid phone number.';
        }
        if (!formData.description.trim() || formData.description.trim().length < 50) {
            newErrors.description = 'Description must be at least 50 characters.';
        }
        if (!formData.location.trim()) newErrors.location = 'Full address is required.';
        if (isNaN(formData.experienceYears) || Number(formData.experienceYears) < 0) {
            newErrors.experienceYears = 'Enter valid years of experience.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Saving profile data:', formData);
            const updatedProviderData = {
                ...currentProvider, // Preserve ID, email, and other non-form fields
                businessName: formData.businessName,
                contact: { ...currentProvider.contact, phone: formData.phone },
                tagline: formData.tagline,
                description: formData.description,
                location: formData.location,
                workingHours: formData.workingHours,
                experienceYears: Number(formData.experienceYears),
                profileImageUrl: formData.profileImageUrl,
                bannerImageUrl: formData.bannerImageUrl,
            };
            onSave(updatedProviderData);
        } else {
            console.log("Validation failed for Edit Profile", errors);
        }
    };

    return (
        <div className="edit-provider-profile-form"> {/* Ensure this class matches your CSS for the form */}
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-section">
                    <h4><Icon name="briefcase" /> Business Information</h4>
                    <div className="form-group">
                        <label htmlFor="epf-businessName">Business Name</label>
                        <input type="text" id="epf-businessName" name="businessName" value={formData.businessName} onChange={handleChange} />
                        {errors.businessName && <p className="error-text">{errors.businessName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="epf-tagline">Tagline / Short Bio</label>
                        <input type="text" id="epf-tagline" name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g., Your trusted local electrician" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="epf-description">Detailed Description (Min. 50 characters)</label>
                        <textarea id="epf-description" name="description" rows="5" value={formData.description} onChange={handleChange}></textarea>
                        {errors.description && <p className="error-text">{errors.description}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="epf-experienceYears">Years of Experience</label>
                        <input type="number" id="epf-experienceYears" name="experienceYears" value={formData.experienceYears} onChange={handleChange} min="0" />
                        {errors.experienceYears && <p className="error-text">{errors.experienceYears}</p>}
                    </div>
                </div>

                <div className="form-section">
                    <h4><Icon name="map-pin" /> Contact & Location</h4>
                    <div className="form-group">
                        <label htmlFor="epf-phone">Contact Phone</label>
                        <input type="tel" id="epf-phone" name="phone" value={formData.phone} onChange={handleChange} />
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="epf-email">Contact Email (Display Only)</label>
                        <input type="email" id="epf-email" name="email" value={formData.email} readOnly disabled />
                        <p className="form-help-text">Email change typically requires a verification process.</p>
                    </div>
                    <div className="form-group">
                        <label htmlFor="epf-location">Full Address</label>
                        <input type="text" id="epf-location" name="location" value={formData.location} onChange={handleChange} placeholder="Shop No, Street, Area, City, Pincode" />
                        {errors.location && <p className="error-text">{errors.location}</p>}
                    </div>
                </div>

                <div className="form-section">
                    <h4><Icon name="clock" /> Working Hours</h4>
                    {formData.workingHours.map((wh, index) => (
                        <div key={`wh-${index}`} className="working-hours-row form-row">
                            <div className="form-group day-label">
                                <label htmlFor={`epf-wh_day_${index}`}>{wh.day}</label>
                            </div>
                            <div className="form-group hours-input">
                                <input
                                    type="text"
                                    id={`epf-wh_hours_${index}`}
                                    name={`wh_hours_${index}`}
                                    value={wh.hours}
                                    onChange={(e) => handleWorkingHoursChange(index, 'hours', e.target.value)}
                                    placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="form-section">
                    <h4><Icon name="image" /> Profile Images (URLs)</h4>
                    <p className="form-help-text">For this demo, enter image URLs. Actual uploads would require file handling.</p>
                    <div className="form-group">
                        <label htmlFor="epf-profileImageUrl">Profile Picture URL</label>
                        <input type="text" id="epf-profileImageUrl" name="profileImageUrl" value={formData.profileImageUrl} onChange={handleChange} placeholder="https://example.com/profile.jpg" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="epf-bannerImageUrl">Banner Image URL</label>
                        <input type="text" id="epf-bannerImageUrl" name="bannerImageUrl" value={formData.bannerImageUrl} onChange={handleChange} placeholder="https://example.com/banner.jpg" />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        <Icon name="save" size={18} /> Save Changes
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        <Icon name="x-circle" size={18} /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};


// --- Mock Provider Data ---
const initialMockProviderUser = {
    id: 'provider123',
    businessName: 'Priya Electric Works',
    email: 'provider@example.com',
    profileImageUrl: 'https://placehold.co/100x100/28a745/white?text=PEW',
    memberSince: '2023-01-10',
    tagline: 'Your Trusted Partner for All Electrical Needs in Patna',
    serviceCategory: 'Electrical',
    specialties: ['Residential Wiring', 'Fixture Installation', 'Emergency Services'],
    rating: 4.8,
    reviewsCount: 210,
    location: 'Shop No. 15, Boring Road Chauraha, Patna, Bihar - 800001',
    contact: {
        phone: '+91 98765 43210',
    },
    workingHours: [
        { day: 'Monday - Friday', hours: '9:00 AM - 7:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 5:00 PM' },
        { day: 'Sunday', hours: 'Closed (Emergency Only)' },
    ],
    gallery: [ /* URLs for gallery images */],
    isVerified: true,
    experienceYears: 10,
    description: "Priya Electric Works has been proudly serving the Patna community for over 10 years. We are a team of certified and experienced electricians dedicated to providing top-quality electrical services for both residential and commercial clients. Our commitment is to ensure safety, reliability, and customer satisfaction on every job.",
    services: [
        { id: 's1', name: 'Standard Wiring Check', price: 500, duration: '1 hour', description: 'Comprehensive check of your home wiring.' },
        { id: 's2', name: 'Ceiling Fan Installation', price: 800, duration: '1.5 hours', description: 'Installation of new or replacement ceiling fans.' },
        { id: 's3', name: 'Switchboard Repair', price: 350, duration: '45 mins', description: 'Repair of faulty switchboards and sockets.' },
    ]
};

// --- Mock Booking Requests Data ---
const initialMockBookingRequests = [ // Renamed to avoid conflict if needed elsewhere
    {
        id: 'REQ001',
        userName: 'Amit Kumar',
        serviceName: 'Emergency Wiring Repair',
        requestedDate: '2025-05-18',
        requestedTime: 'ASAP',
        status: 'Pending', // Initial status
    },
    {
        id: 'REQ002',
        userName: 'Sunita Sharma',
        serviceName: 'New Fan Installation',
        requestedDate: '2025-05-20',
        requestedTime: '10:00 AM',
        status: 'Pending', // Initial status
    },
    {
        id: 'REQ003',
        userName: 'Rajesh Verma',
        serviceName: 'Full House Rewiring Quote',
        requestedDate: '2025-05-21',
        requestedTime: 'Flexible',
        status: 'Pending', // Initial status
    },
];

// AddServiceForm Component
const AddServiceForm = ({ onSave, onCancel, initialData }) => {
    const [serviceName, setServiceName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setServiceName(initialData.name || '');
            setPrice(initialData.price?.toString() || '');
            setDuration(initialData.duration || '');
            setDescription(initialData.description || '');
            setErrors({});
        } else {
            setServiceName('');
            setPrice('');
            setDuration('');
            setDescription('');
            setErrors({});
        }
    }, [initialData]);

    const validateServiceForm = () => {
        const newErrors = {};
        if (!serviceName.trim()) newErrors.serviceName = "Service name is required.";
        if (!price.trim()) {
            newErrors.price = "Price is required.";
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            newErrors.price = "Please enter a valid positive price.";
        }
        if (!duration.trim()) newErrors.duration = "Duration is required.";
        if (!description.trim() || description.trim().length < 20) {
            newErrors.description = "Description must be at least 20 characters.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateServiceForm()) {
            onSave({
                name: serviceName,
                price: parseFloat(price),
                duration,
                description
            });
        } else {
            console.log("Validation failed for Add/Edit Service", errors);
        }
    };

    return (
        <div className="add-service-form">
            <h4>{initialData ? 'Edit Service' : 'Add New Service'}</h4>
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="asf-serviceName">Service Name</label>
                    <input type="text" id="asf-serviceName" value={serviceName} onChange={e => setServiceName(e.target.value)} required />
                    {errors.serviceName && <p className="error-text">{errors.serviceName}</p>}
                </div>
                <div className="form-row">
                    <div className="form-group half-width">
                        <label htmlFor="asf-price">Price (₹)</label>
                        <input type="number" id="asf-price" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" />
                        {errors.price && <p className="error-text">{errors.price}</p>}
                    </div>
                    <div className="form-group half-width">
                        <label htmlFor="asf-duration">Estimated Duration</label>
                        <input type="text" id="asf-duration" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 1 hour, 45 mins" required />
                        {errors.duration && <p className="error-text">{errors.duration}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="asf-serviceDescription">Service Description (Min. 20 characters)</label>
                    <textarea id="asf-serviceDescription" name="serviceDescription" rows="3" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                    {errors.description && <p className="error-text">{errors.description}</p>}
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        <Icon name="save" size={16} /> {initialData ? 'Update Service' : 'Save Service'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        <Icon name="x-circle" size={16} /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};


const ProviderDashboardPage = () => {
    const [providerUser, setProviderUser] = useState(initialMockProviderUser);
    const [bookingRequests, setBookingRequests] = useState(initialMockBookingRequests); // Use renamed initial state
    const [activeSection, setActiveSection] = useState('overview');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showAddServiceForm, setShowAddServiceForm] = useState(false);
    const [editingService, setEditingService] = useState(null);

    const handleProfileSave = (updatedProfileData) => {
        console.log("Saving updated profile:", updatedProfileData);
        setProviderUser(prevUser => ({ ...prevUser, ...updatedProfileData }));
        setIsEditingProfile(false);
        alert("Profile updated successfully!");
    };

    const handleAddOrEditService = (serviceData) => {
        if (editingService) {
            setProviderUser(prevUser => ({
                ...prevUser,
                services: prevUser.services.map(s => s.id === editingService.id ? { ...editingService, ...serviceData } : s)
            }));
            alert("Service updated successfully!");
        } else {
            setProviderUser(prevUser => ({
                ...prevUser,
                services: [...(prevUser.services || []), { ...serviceData, id: `s${Date.now()}` }]
            }));
            alert("New service added!");
        }
        setShowAddServiceForm(false);
        setEditingService(null);
    };

    const handleEditServiceClick = (service) => {
        setEditingService(service);
        setShowAddServiceForm(true);
    };

    const handleDeleteService = (serviceId) => {
        if (window.confirm("Are you sure you want to delete this service? This action cannot be undone.")) {
            setProviderUser(prevUser => ({
                ...prevUser,
                services: prevUser.services.filter(s => s.id !== serviceId)
            }));
            alert("Service deleted.");
        }
    };

    const handleCancelServiceForm = () => {
        setShowAddServiceForm(false);
        setEditingService(null);
    };

    const handleLogout = () => {
        console.log('Provider logged out');
        alert('Logged out successfully. Redirecting to homepage...');
        window.location.href = '/';
    };

    // --- Function to handle booking request actions ---
    const handleBookingAction = (requestId, newStatus) => {
        setBookingRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === requestId ? { ...req, status: newStatus, actionTaken: true } : req
            )
        );
        // In a real app, also update the count for the overview card
        alert(`Booking request ${requestId} has been ${newStatus.toLowerCase()}.`);
        // TODO: API call to update backend
    };


    const renderSection = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div className="dashboard-section">
                        <h2>Dashboard Overview</h2>
                        <div className="overview-grid provider-overview-grid">
                            <div className="overview-card">
                                <h3>New Booking Requests</h3>
                                <p className="stat-number">{bookingRequests.filter(b => b.status === 'Pending' && !b.actionTaken).length}</p>
                                <a href="#bookings" onClick={() => setActiveSection('bookings')} className="card-link">View Requests</a>
                            </div>
                            <div className="overview-card">
                                <h3>Active Jobs Today</h3>
                                <p className="stat-number">3</p>
                                <a href="#schedule" onClick={() => setActiveSection('schedule')} className="card-link">Manage Schedule</a>
                            </div>
                            <div className="overview-card">
                                <h3>Total Earnings (Month)</h3>
                                <p className="stat-number">₹12,500</p>
                                <a href="#earnings" onClick={() => setActiveSection('earnings')} className="card-link">View Earnings</a>
                            </div>
                            <div className="overview-card">
                                <h3>Overall Rating</h3>
                                <p className="stat-number">4.8 <Icon name="star" size={28} color="var(--star-color)" className="filled-star-stat" /></p>
                                <a href="#reviews" onClick={() => setActiveSection('reviews')} className="card-link">View Reviews</a>
                            </div>
                        </div>
                        <h3><Icon name="bell" /> Recent Booking Requests</h3>
                        {bookingRequests.filter(req => req.status === 'Pending' || req.actionTaken).slice(0, 3).length > 0 ? ( // Show pending or recently actioned
                            <ul className="booking-request-list">
                                {bookingRequests.filter(req => req.status === 'Pending' || req.actionTaken).slice(0, 3).map(req => (
                                    <li key={req.id} className={`booking-request-item status-${req.status.toLowerCase()}`}>
                                        <div className="request-item-info">
                                            <strong>{req.serviceName}</strong> requested by {req.userName}
                                            <p><Icon name="calendar" size={16} /> {new Date(req.requestedDate).toLocaleDateString()} at {req.requestedTime}</p>
                                        </div>
                                        <div className="request-item-status-actions">
                                            <span className={`booking-status overview-status ${req.status.toLowerCase()}`}>{req.status}</span>
                                            {req.status === 'Pending' && !req.actionTaken && (
                                                <div className="request-item-actions">
                                                    <button
                                                        className="btn btn-success btn-small"
                                                        onClick={() => handleBookingAction(req.id, 'Accepted')}
                                                    >
                                                        <Icon name="check-circle" size={14} /> Accept
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-small"
                                                        onClick={() => handleBookingAction(req.id, 'Declined')}
                                                    >
                                                        <Icon name="x" size={14} /> Decline
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No new booking requests at the moment.</p>
                        )}
                    </div>
                );
            case 'services':
                return (
                    <div className="dashboard-section">
                        <div className="section-header-action">
                            <h2><Icon name="tool" /> My Services</h2>
                            {!showAddServiceForm && (
                                <button className="btn btn-primary" onClick={() => { setShowAddServiceForm(true); setEditingService(null); }}>
                                    <Icon name="plus-circle" size={16} /> Add New Service
                                </button>
                            )}
                        </div>
                        {showAddServiceForm ? (
                            <AddServiceForm
                                key={editingService ? editingService.id : 'new-service-form'}
                                initialData={editingService}
                                onSave={handleAddOrEditService}
                                onCancel={handleCancelServiceForm}
                            />
                        ) : (
                            <>
                                <p>Manage your service offerings, pricing, and availability here.</p>
                                {providerUser.services && providerUser.services.length > 0 ? (
                                    <ul className="service-management-list">
                                        {providerUser.services.map(service => (
                                            <li key={service.id} className="service-management-item">
                                                <div className="service-item-details">
                                                    <strong>{service.name}</strong>
                                                    <span>Price: ₹{service.price}</span>
                                                    <span>Duration: {service.duration}</span>
                                                    {service.description && <p className="service-item-description">Description: {service.description}</p>}
                                                </div>
                                                <div className="service-item-actions">
                                                    <button className="btn btn-secondary btn-small" onClick={() => handleEditServiceClick(service)}><Icon name="edit-3" size={14} /> Edit</button>
                                                    <button className="btn btn-danger btn-small" onClick={() => handleDeleteService(service.id)}>Delete</button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>You haven't added any services yet. Click "Add New Service" to get started.</p>
                                )}
                            </>
                        )}
                    </div>
                );
            case 'bookings':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="calendar-check" /> Booking Management</h2>
                        <p>View all incoming requests, accepted jobs, and completed bookings.</p>
                        {/* This section would typically list all bookings with more details and filters */}
                        <h4>All Requests:</h4>
                        {bookingRequests.length > 0 ? (
                            <ul className="booking-request-list full-booking-list">
                                {bookingRequests.map(req => (
                                    <li key={req.id} className={`booking-request-item status-${req.status.toLowerCase()}`}>
                                        <div className="request-item-info">
                                            <strong>{req.serviceName}</strong> by {req.userName}
                                            <p><Icon name="calendar" size={16} /> {new Date(req.requestedDate).toLocaleDateString()} at {req.requestedTime}</p>
                                            <p>Status: <span className={`booking-status ${req.status.toLowerCase()}`}>{req.status}</span></p>
                                        </div>
                                        {req.status === 'Pending' && !req.actionTaken && (
                                            <div className="request-item-actions">
                                                <button className="btn btn-success btn-small" onClick={() => handleBookingAction(req.id, 'Accepted')}><Icon name="check-circle" size={14} /> Accept</button>
                                                <button className="btn btn-danger btn-small" onClick={() => handleBookingAction(req.id, 'Declined')}><Icon name="x" size={14} /> Decline</button>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : <p>No bookings found.</p>}
                    </div>
                );
            case 'earnings':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="dollar-sign" /> Earnings & Payouts</h2>
                        <p>Track your earnings, view payment history, and manage payout settings.</p>
                    </div>
                );
            case 'profile':
                return (
                    <div className="dashboard-section">
                        <h2><Icon name="user-cog" /> Provider Profile & Settings</h2>
                        {isEditingProfile ? (
                            <EditProviderProfileForm
                                currentProvider={providerUser}
                                onSave={handleProfileSave}
                                onCancel={() => setIsEditingProfile(false)}
                            />
                        ) : (
                            <div className="profile-view-mode">
                                <div className="profile-details-card">
                                    <h4>Business Details</h4>
                                    <p><strong>Business Name:</strong> {providerUser.businessName}</p>
                                    <p><strong>Tagline:</strong> {providerUser.tagline || 'Not set'}</p>
                                    <p><strong>Description:</strong> {providerUser.description || 'Not set'}</p>
                                    <p><strong>Experience:</strong> {providerUser.experienceYears} years</p>
                                    <h4>Contact & Location</h4>
                                    <p><strong>Email:</strong> {providerUser.email}</p>
                                    <p><strong>Phone:</strong> {providerUser.contact?.phone || 'Not set'}</p>
                                    <p><strong>Address:</strong> {providerUser.location || 'Not set'}</p>
                                    <h4>Working Hours</h4>
                                    {providerUser.workingHours && providerUser.workingHours.length > 0 ? (
                                        providerUser.workingHours.map(wh => <p key={wh.day}><strong>{wh.day}:</strong> {wh.hours || 'Not set'}</p>)
                                    ) : <p>Not set</p>}
                                    <p><strong>Joined:</strong> {new Date(providerUser.memberSince).toLocaleDateString()}</p>
                                </div>
                                <button className="btn btn-primary edit-profile-btn" onClick={() => setIsEditingProfile(true)}>
                                    <Icon name="edit-3" size={16} /> Edit Profile
                                </button>
                            </div>
                        )}
                    </div>
                );
            default:
                return <p>Welcome to your dashboard!</p>;
        }
    };

    if (!providerUser) {
        return <div className="loading-state">Loading provider dashboard...</div>;
    }

    return (
        <div className="provider-dashboard-page">
            <aside className="dashboard-sidebar provider-sidebar">
                <div className="sidebar-header">
                    <img src={providerUser.profileImageUrl} alt={providerUser.businessName} className="user-avatar" onError={(e) => e.target.src = 'https://placehold.co/80x80/cccccc/333333?text=Logo'} />
                    <h3>{providerUser.businessName}</h3>
                    <p className="user-email-sidebar">{providerUser.email}</p>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li className={activeSection === 'overview' ? 'active' : ''}>
                            <a href="#overview" onClick={() => { setActiveSection('overview'); setIsEditingProfile(false); setShowAddServiceForm(false); setEditingService(null); }}>
                                <Icon name="layout-dashboard" /> Overview
                            </a>
                        </li>
                        <li className={activeSection === 'services' ? 'active' : ''}>
                            <a href="#services" onClick={() => { setActiveSection('services'); setIsEditingProfile(false); setEditingService(null); }}>
                                <Icon name="tool" /> My Services
                            </a>
                        </li>
                        <li className={activeSection === 'bookings' ? 'active' : ''}>
                            <a href="#bookings" onClick={() => { setActiveSection('bookings'); setIsEditingProfile(false); setShowAddServiceForm(false); setEditingService(null); }}>
                                <Icon name="calendar-check" /> Bookings
                            </a>
                        </li>
                        <li className={activeSection === 'earnings' ? 'active' : ''}>
                            <a href="#earnings" onClick={() => { setActiveSection('earnings'); setIsEditingProfile(false); setShowAddServiceForm(false); setEditingService(null); }}>
                                <Icon name="dollar-sign" /> Earnings
                            </a>
                        </li>
                        <li className={activeSection === 'profile' ? 'active' : ''}>
                            <a href="#profile" onClick={() => { setActiveSection('profile'); setShowAddServiceForm(false); setEditingService(null); }}>
                                <Icon name="user-cog" /> Profile & Settings
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">
                        <Icon name="log-out" /> Logout
                    </button>
                </div>
            </aside>

            <main className="dashboard-main-content provider-main-content">
                <header className="dashboard-header">
                    <h1>Provider Dashboard</h1>
                    <a href="#services" onClick={() => { setActiveSection('services'); setShowAddServiceForm(true); setEditingService(null); }} className="btn btn-primary new-service-btn">
                        <Icon name="plus-circle" size={18} /> Add New Service
                    </a>
                </header>
                {renderSection()}
            </main>
        </div>
    );
};

export default ProviderDashboardPage;
